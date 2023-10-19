import React, { useEffect, useState } from "react";
import { Menubar } from 'primereact/menubar';
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

/**
 * This edit form will dynamically render input fields based on objects found inside props.fields
 * @param {Object} props 
 * @returns 
 */
function EditForm(props) {
    // Assuming we have data passed in as props
    const { tabId, currentDepthTabs, addNewTab, currentTabDepth } = useTabsWrapperContext();
    const { currentContentData } = useContentProviderContext();
    const initialState = {};
    const cdl = currentTabDepth;

    const [formData, setFormData] = useState({});
    const handleEditFieldUpdate = (fieldName, data) => {
        let formCopy = {...formData};
        formCopy[fieldName] = data;
        setFormData(formCopy);
    }

    /**
     * Helper function to create JSX elements of the input types based on the inputType key being passed in
     * @param {*} props 
     * @returns {JSX.Element} The JSX to render
     */
    const constructInputGroup = (props) => {
        if(props.inputType == 'text') {
            return(
                <>
                    <div className="flex flex-column gap-2">
                        <label>
                            <b>
                                {props.title}    
                            </b>    
                        </label>
                    </div>
                    <div className="p-inputgroup flex-1">
                        {props.icon ? 
                            <span className="p-inputgroup-addon">
                                {props.icon}
                            </span>
                            : 
                            <></>
                        }
                        <InputText placeholder="Text String" onChange={(e) => {
                            handleEditFieldUpdate(props.name, e.target.value)
                        }}/>
                    </div>
                    <br/>
                </>
            )
        } else if (props.inputType == 'number') {
            return(
                <>
                    <div className="flex flex-column gap-2">
                        <label>
                            <b>
                                {props.title}    
                            </b>    
                        </label>
                    </div>
                    <div className="p-inputgroup flex-1">
                        {props.icon ? 
                            <span className="p-inputgroup-addon">
                                {props.icon}
                            </span>
                            : 
                            <></>
                        }
                        <InputNumber placeholder="Numbers" onChange={(e) => {
                            handleEditFieldUpdate(props.name, e.value)
                        }}/>
                    </div>
                    <br/>
                </>
            )
        } else if (props.inputType == 'select') {
            let options = [];
            if(props.options) {
                options = props.options;
            } else if (props.loadFromDb) {
                // Action dispatch to load options from DB
                // Local state for this field ?
            }

            return(
                <>
                    <div className="flex flex-column gap-2">
                        <label>
                            <b>
                                {props.title}    
                            </b>    
                        </label>
                    </div>
                    <div className="p-inputgroup flex-1">
                        {props.icon ? 
                            <span className="p-inputgroup-addon">
                                {props.icon}
                            </span>
                            : 
                            <></>
                        }
                        <Dropdown 
                            placeholder="dropdown" 
                            options={options}  
                            onChange={(e) => {
                                handleEditFieldUpdate(props.name, e.value)
                            }}  
                        />
                    </div>
                    <br/>
                </>
            )
        } else if (props.inputType == 'date') {
            return(
                <>
                    <div className="flex flex-column gap-2">
                        <label>
                            <b>
                                {props.title}    
                            </b>    
                        </label>
                    </div>
                    <div className="p-inputgroup flex-1">
                        {props.icon ? 
                            <span className="p-inputgroup-addon">
                                {props.icon}
                            </span>
                            : 
                            <></>
                        }
                        <Calendar 
                            placeholder="Date" 
                            onChange={(e) => {
                                handleEditFieldUpdate(props.name, e.value)
                            }}
                        />
                    </div>
                    <br/>
                </>
            )
        }
    }

    const renderInputs = (props) => {
        return _.map(props, (data, key) => {
            return constructInputGroup(data);
        })
    }

    return (
        <>
            <Panel className='edit-panel'>
                <h1>Edit {props.recordName}</h1>
                {renderInputs(props.fields)}
                <div className="edit-button-save-container">
                    <Button className="edit-button-save" label="Save"/>
                </div>
            </Panel>
        </>
    );
}

export default EditForm;
