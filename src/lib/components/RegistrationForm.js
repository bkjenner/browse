import React, { useEffect, useState } from "react";
import { useTabsWrapperContext } from "./TabsWrapper";

function RegistrationForm({props}) {
    const { selectedTabIndex, currentTabDepth, tabs, tabData, addNewTab, handleTabDataUpdate, handleAddNewDepthTab, currentDepthTabs } = useTabsWrapperContext();
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

        // Update our context
         handleTabDataUpdate({ 
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
        // If we change tabs check to see if there is any data we 
        // need to load into the Tabs local state from the Context 
        // where all the data is stored
        if(tabData && tabData.name) {
            setFormData(tabData);
        }
    }, [selectedTabIndex, tabData])
    
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
                            label: "RegistrationForm",
                            content: "",
                            componentType: "RegistrationForm",
                            initialState: initialState,
                            tabs: currentDepthTabs,
                            depth: currentTabDepth,
                        }
                    )
                }}>
                    Open New Same Depth Tab
                </button>
                <button onClick={(event) => {
                    handleAddNewDepthTab(
                        {
                            label: "New nest",
                            content: "",
                            componentType: "TabsContainer",
                            tabs: tabs,
                            initialState: {},
                            child: {
                                label: "Registration Form Child",
                                content: "",
                                componentType: "RegistrationForm",
                                initialState: {}
                            },
                            parentTabId: props.tabKey,
                        }
                    )
                }}>
                    Open New Tab with Nested Depth
                </button>
            </div>
        </div>
    );
}

export default RegistrationForm;
