import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTabsWrapperContext } from "./TabsWrapper";
import { useContentProviderContext } from "../contexts/ContentContext/ContentProvider";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar';
import { InputMask } from 'primereact/inputmask';
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import { Toast } from 'primereact/toast';

/**
 * This edit form will dynamically render input fields based on objects found inside props.fields
 * @param {Object} props 
 * @returns 
 */
function EditForm(props) {
    const [formData, setFormData] = useState({});
    const [activityTypeOptions, setActivityTypeOptions] = useState([]);
    const [activityProjectOptions, setActivityProjectOptions] = useState([]);
    const [activityProject, setActivityProject] = useState();
    const [activityType, setActivityType] = useState();
    const [activityStatus, setActivityStatus] = useState();
    const [activityTotal, setActivityTotal] = useState();
    const [completionDate, setCompletionDate] = useState();
    const [contactOptions, setContactOptions] = useState([]);
    const [performedFor, setPerformedFor] = useState();
    const [performedBy, setPerformedBy] = useState();
    const [statusOptions, setStatusOptions] = useState([]);
    const [priorityOptions, setPriorityOptions] = useState([]);
    const [description, setDescription] = useState("");
    const [comments, setComments] = useState("");
    const [startDate, setStartDate] = useState();
    const [priority, setPriority] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const recordFetchRule = props.fetchRule ? props.fetchRule : 'activityBrowseFetchRecordData';
    const toast = useRef(null);

    /**
     * This function will pull the activity records information
     */
    const fetchRecordData = () => {
        axios.post(`/action/${recordFetchRule}`, {id: props.selectedRowId})
        .then((response) => {
            if(response && response.data && !response.data.error) {
                let data = response.data[0];
                let completeDate = new Date(moment(data.completiondate).utc().format('YYYY-MM-DDTHH:mm:ss'));
                let beginDate = new Date(moment(data.startdate).utc().format('YYYY-MM-DDTHH:mm:ss'));
                setCompletionDate(completeDate);
                setStartDate(beginDate);
                setActivityProject(data.actprojectid);
                setActivityType(data.acttypeid);
                setActivityStatus(data.actstatusid);
                setActivityTotal(data.totalactual);
                setPerformedFor(data.rowidperformedfor);
                setPerformedBy(data.rowidperformedby);
                setDescription(data.description);
                setComments(data.comments);
                setPriority(data.actpriorityid);

                let formCopy = {...formData};
                formCopy = {
                    ...data
                }
                setFormData(formCopy);
            } else {
                console.log('error fetching record data');
            }
        })
    }

    /**
     * This functions will update the master store for the form which is in turn used for the actual update.
     * @param {string} fieldName name of the field being updated
     * @param {*} data any data to be stored with the fieldName key
     */
    const handleEditFieldUpdate = (fieldName, data) => {
        let formCopy = {...formData};
        formCopy[fieldName] = data;
        setFormData(formCopy);
    }

    /**
     * This function fetchs the options for the dropdown inputs on the edit form
     */
    const fetchActivityOptions = () => {
        axios.get('/action/getActivityTypes')
        .then(response => {
            if(response && response.data) {
                _.map(response.data, data => {
                    data.label = data.description;
                    data.value = data.id;
                })
                setActivityTypeOptions(response.data);
            } else {
                console.log('error loading types')
            }
        })

        axios.get('/action/getActivityProjects')
        .then(response => {
            if(response && response.data) {
                _.map(response.data, data => {
                    data.label = data.description;
                    data.value = data.id;
                })
                setActivityProjectOptions(response.data);
            } else {
                console.log('error loading projects')
            }
        })

        axios.get('/action/getCRMContacts')
        .then(response => {
            if(response && response.data) {
                setContactOptions(response.data);
            } else {
                console.log('error loading contacts')
            }
        })

        axios.get('/action/getActivityStatus')
        .then(response => {
            if(response && response.data) {
                setStatusOptions(response.data);
            } else {
                console.log('error loading status')
            }
        })

        axios.get('/action/getActivityPriorities')
        .then(response => {
            if(response && response.data) {
                setPriorityOptions(response.data);
            } else {
                console.log('error loading priorities')
            }
        })
    }

    // Mutation function
    const updateActivity = async (activityData) => {
        try {
            const response = await axios.post('/action/activitySave', {
                id: props.selectedRowId,
                ...formData
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch(error) {
            throw new Error('Failed to save edit');
        }
    }

    const { mutate, isLoading, error } = useMutation({
        mutationFn: updateActivity,
        onError: (error, varriables, context) => {
            console.log('logging error...');
        },
        onSuccess: (data, variables, context) => {
            setIsSubmit(false);
            showSuccess();
        },
    });

    const handleSubmit = () => {
        setIsSubmit(true);
        const formCopy = { ...formData };

        // call the mutate with the post data to trigger mutation
        mutate(formCopy)
    }

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Activity has been saved', life: 3000});
    };

    // Fetch record informtion on mount
    useEffect(()  => {
        fetchRecordData();
        if(activityTypeOptions.length == 0 && activityProjectOptions.length == 0) {
            fetchActivityOptions();
        }
    }, [])
    
    return (
        <>
            <Panel className='edit-panel'>
                <h1>Edit Activity</h1>
                <div className='flex activity-project activity-browse-input-group'>
                    <div className='activity-browse-input-col'>
                        <div className="flex flex-column gap-2">
                            <label>
                                <b>
                                    Activity Project:
                                </b>    
                            </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <Dropdown 
                                placeholder="What Project?" 
                                options={activityProjectOptions}
                                onChange={(e) => {
                                    handleEditFieldUpdate('activityProject', e.value)
                                    setActivityProject(e.value);
                                }}
                                value={activityProject}
                            />
                        </div>
                    </div>
                    <div className='activity-browse-input-col'>
                        <div className="flex flex-column gap-2">
                            <label>
                                <b>
                                    Activity Type:
                                </b>    
                            </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <Dropdown 
                                placeholder="Type of activity done?" 
                                options={activityTypeOptions}
                                onChange={(e) => {
                                    handleEditFieldUpdate('activityType', e.value)
                                    setActivityType(e.value)
                                }}
                                value={activityType}
                            />
                        </div>
                    </div>
                </div>
                <div className='activity-project activity-browse-input-group flex'>
                    <div className='activity-browse-input-col'>
                        <div className="flex flex-column gap-2">
                            <label>
                                <b>
                                    Performed By:
                                </b>    
                            </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <Dropdown 
                                placeholder="Who completed this activity?" 
                                options={contactOptions}  
                                onChange={(e) => {
                                    handleEditFieldUpdate('performedBy', e.value);
                                    setPerformedBy(e.value);
                                }}
                                value={performedBy}
                            />
                        </div>
                    </div>
                    <div className='activity-browse-input-col'>
                        <div className="flex flex-column gap-2">
                            <label>
                                <b>
                                    Performed For:
                                </b>
                            </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <Dropdown 
                                placeholder="Who is this activity for?" 
                                options={contactOptions}  
                                onChange={(e) => {
                                    handleEditFieldUpdate('performedFor', e.value)
                                    setPerformedFor(e.value);
                                }}
                                value={performedFor}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className='activity-browse-input-col-3'>
                        <div className="flex flex-column gap-2">
                            <label>
                                <b>
                                    Status:
                                </b>
                            </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <Dropdown 
                                placeholder="What is the status of the activity?"
                                options={statusOptions}  
                                onChange={(e) => {
                                    handleEditFieldUpdate('status', e.value)
                                    setActivityStatus(e.value);
                                }}
                                value={activityStatus}  
                            />
                        </div>
                    </div>
                    <div className='activity-browse-input-col-3'>
                        <div className="flex flex-column gap-2">
                            <label>
                                <b>
                                    Start Date:
                                </b>    
                            </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <Calendar
                                placeholder='When was this activity started?'
                                onChange={(e) => {
                                    handleEditFieldUpdate('startdate', moment(e.value).utc().format('YYYY-MM-DD HH:mm:ss'))
                                    setStartDate(e.value);
                                }}
                                value={startDate}
                                showIcon
                            />
                        </div>
                    </div>
                    <div className='activity-browse-input-col-3'>
                        <div className="flex flex-column gap-2">
                            <label>
                                <b>
                                    Completion Date:
                                </b>    
                            </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <Calendar
                                placeholder='When was this activity completed?'
                                onChange={(e) => {
                                    handleEditFieldUpdate('completiondate', e.value)
                                    setCompletionDate(e.value);
                                }}
                                value={completionDate}
                                showIcon
                            />
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <div className='activity-browse-input-col'>
                        <div className="flex flex-column gap-2">
                            <label>
                                <b>
                                    Activity Priority:
                                </b>
                            </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <Dropdown
                                options={priorityOptions}
                                placeholder='Urgency of the activity?'
                                onChange={(e) => {
                                    handleEditFieldUpdate('actpriorityid', e.value)
                                    setPriority(e.value);
                                }}
                                value={priority}
                            />
                        </div>
                    </div>
                    <div className='activity-browse-input-col'>
                        <div className="flex flex-column gap-2">
                            <label>
                                <b>
                                    Total Actual:
                                </b>
                            </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <InputNumber
                                placeholder='How long did this activity take?'
                                onChange={(e) => {
                                    handleEditFieldUpdate('totalactual', e.value)
                                    setActivityTotal(e.value);
                                }}
                                value={activityTotal}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex activity-project activity-browse-input-group'>
                    <div className='activity-browse-input-col'>
                        <div className="flex flex-column gap-2">
                            <label>
                                <b>
                                    Activity Description:
                                </b>    
                            </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <InputTextarea
                                placeholder="Any extra information?" 
                                onChange={(e) => {
                                    handleEditFieldUpdate('description', e.value)
                                    setDescription(e.value);
                                }}
                                value={description}
                            />
                        </div>
                    </div>
                    <div className='activity-browse-input-col'>
                        <div className="flex flex-column gap-2">
                            <label>
                                <b>
                                    Additional Comments:
                                </b>    
                            </label>
                        </div>
                        <div className="p-inputgroup flex-1">
                            <InputTextarea
                                placeholder="Additional comments"
                                onChange={(e) => {
                                    handleEditFieldUpdate('comments', e.target.value)
                                    setComments(e.target.value);
                                }}
                                value={comments}
                            />
                        </div>
                    </div>
                </div>
                <div className="edit-button-save-container">
                    <Button 
                        className="edit-button-save" 
                        label="Save"
                        onClick={handleSubmit}
                        disabled={isSubmit}
                    />
                </div>
                <Toast ref={toast} />
            </Panel>
        </>
    );
}

export default EditForm;
