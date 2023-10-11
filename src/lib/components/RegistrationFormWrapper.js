import React, { createContext, useContext, useEffect, useState } from "react";
import RegistrationForm from "./RegistrationForm";
import { useTabsWrapperContext } from "./TabsWrapper";

const RegistrationFormWrapperContext = createContext();

export const RegistrationFormWrapper = ({ props, children }) => {

    const { addNewTab } = useTabsWrapperContext();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, formId: props.formId });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform form validation and submission here
        // For this example, we'll just log the form data
        console.log(formData);
    };

    const handleOpenNewTab = () => {
        // Call the addNewTab  context function to open a new tab
        addNewTab(
            {
                label: 'New Tab',
                componentType: 'TabsContainer',
                content: 'This is a new tab added by Registration Form',
            }
    )};
    
    return (
        <RegistrationForm />
    );
};

export const useRegistrationFormWrapperContext = () => {
    return useContext(RegistrationFormWrapperContext);
};
