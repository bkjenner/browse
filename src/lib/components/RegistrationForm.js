import React, { useEffect, useState } from "react";
import { useTabsWrapperContext } from "./TabsWrapper";
import { useContentProviderContext } from "../contexts/ContentContext/ContentProvider";

function RegistrationForm({props}) {
    const { selectedTabIndex, currentTabDepth, tabId, addNewTab, handleAddNewDepthTab, currentDepthTabs} = useTabsWrapperContext();
    const { contentDataUpdate, currentContentData } = useContentProviderContext();
    // Initial State
    // Used whenever we create a new form
    const initialState = {
        name: "",
        email: "",
        password: "",
    }

    // Local state
    // This tracks the data on the form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
         contentDataUpdate({ 
            ...formData, 
            [name]: value, 
            tabId: props.tabKey,
            currentTabDepth: currentTabDepth,
            tabs: currentDepthTabs,
         })

         // Update local state
         setFormData({
            ...formData,
            name: value,
         })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform form validation and submission here
        // For this example, we'll just log the form data
        console.log(formData);
    };

    useEffect(() => {
        // If we change tabs check to see if there is any data we need to load
        if(currentContentData && currentContentData.name) {
            setFormData(currentContentData);
        }
    }, [selectedTabIndex, currentContentData])

    const cdl = currentTabDepth;
    
    return (
        <div>
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text"
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
            <div>
                <button onClick={() => {
                    addNewTab(
                        {
                            label: "Table Grid",
                            content: "",
                            componentType: "TableGrid",
                            initialState: initialState,
                            tabs: currentDepthTabs,
                            tabId: tabId,
                            currentDepthLevel: cdl,
                        }
                    )
                }}>
                    Open New Same Depth Tab
                </button>
                <button onClick={(event) => {
                    handleAddNewDepthTab(
                        {
                            label: tabId,
                            content: "",
                            componentType: "TabsContainer",
                            initialState: {},
                            child: {
                                label: `${tabId + 1}`,
                                content: "",
                                componentType: "TableGrid",
                                initialState: {},
                                tabId: tabId + 1,
                            },
                            tabId: tabId,
                            currentDepthLevel: cdl,
                        }
                    )
                }}>
                    Open New Tab with Nested Depth
                </button>
            </div>
            <br/>
            <button onClick={() => {
                addNewTab(
                    {
                        label: "Vertical Split",
                        content: "",
                        componentType: "SplitterContainer",
                        initialState: initialState,
                        children: [{
                            label: "V Split 1",
                            content: "Splitter 1",
                            componentType: "RegistrationForm",
                            tabId: tabId
                        },
                        {
                            label: "V Split 2",
                            content: "Splitter 2",
                            componentType: "TableGrid",
                            tabId: tabId + 1,
                        }
                        ],
                        tabs: currentDepthTabs,
                        depth: currentTabDepth,
                        tabId: tabId,
                        currentDepthLevel: cdl,
                        layout: 'vertical',
                    }
                )
            }}>
                Open Vertical Splitter
            </button>
            <br/>
            <button onClick={() => {
                addNewTab(
                    {
                        label: "Horizontal Stacked Split",
                        content: "",
                        componentType: "SplitterContainer",
                        children: [{
                            label: "H Split 1",
                            content: "Splitter 1",
                            componentType: "RegistrationForm",
                            tabId: tabId
                        },
                        {
                            label: "H Split 2",
                            content: "Splitter 2",
                            componentType: "TableGrid",
                            tabId: tabId + 1,
                        }
                        ],
                        initialState: initialState,
                        tabs: currentDepthTabs,
                        depth: currentTabDepth,
                        tabId: tabId,
                        currentDepthLevel: cdl,
                    }
                )
            }}>
                Open Horizontal stacked split
            </button>
        </div>
    );
}

export default RegistrationForm;
