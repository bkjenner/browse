import React, { useState } from "react";
import { useTabsWrapperContext } from "./TabsWrapper";

function RegistrationForm({props}) {
    const { tabData, addNewTab, handleTabDataUpdate } = useTabsWrapperContext();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // setFormData({ ...formData, [name]: value, 
        //     // formId: props.formId
        //  });
         handleTabDataUpdate({ 
            ...formData, [name]: value, 
            tabId: props.tabKey
         })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform form validation and submission here
        // For this example, we'll just log the form data
        console.log(formData);
    };
    
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
                        value={tabData.name}
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
                            initialState: formData
                        }
                    )
                }}>
                    Open New Tab
                </button>
            </div>
        </div>
    );
}

export default RegistrationForm;
