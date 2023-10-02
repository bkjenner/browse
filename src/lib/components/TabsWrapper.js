import React, { createContext, useContext, useState } from "react";
import TabsContainer from "./TabsContainer";
import DynamicTabs from "./DynamicTabs";

const TabsWrapperContext = createContext();
TabsWrapperContext.displayName = "tabContexts";

export const TabsContainerWrapper = ({ children }) => {
    const [tabs, setTabs] = useState([
        {
            label: "Registration Form",
            content: "",
            componentType: "RegistrationForm",
            formId: 1,
        },
    ]);

    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [tabDataMap, setTabDataMap] = useState([]);
    const [tabData, setTabData] = useState({});

    const addNewTab = (props) => {
        const newTabIndex = tabs.length;

        // Add the new Tab
        setTabs([...tabs, props]);
        // Update the Tab view Index
        setSelectedTabIndex(newTabIndex);

        // Push the new data of the tab into the data map
        setTabDataMap([
            ...tabDataMap,
            {...props.initialState}
        ]);
        // Update the initial state of the tab
        setTabData(props.initialState);
    };

    const handleTabChange = (event, newValue) => {
        // Update Tab View Index
        setSelectedTabIndex(newValue);
        // Update the tab with the stored data
        if (tabDataMap[newValue]) {
            setTabData(tabDataMap[newValue]);
        }
    };

    const handleTabDataUpdate = (formData) => {
        // This function handles the update of all the data inside the tab
        // and also updates the TabDataMap so we can access the data when switching between tabs
        tabDataMap[formData.tabId] = _.merge(tabDataMap[formData.tabId], { ...formData })
        setTabDataMap(tabDataMap);
        setTabData(formData);
    };

    const handleTabClose = (event, tabId) => {
        // Stop event from propagating to the target element's parent
        event.stopPropagation();

        // Remove the tab from tabs state
        // Create shallow copy
        tabs.splice(tabId,1);
        setTabs([...tabs]);

        // Delete the stored data of the form
        // Create shallow copy
        tabDataMap.splice(tabId, 1);
        setTabDataMap([...tabDataMap]);

        // Update the form data 
        if (tabDataMap[tabId - 1]) {
            setTabData(tabDataMap[tabId - 1]);
            setSelectedTabIndex(tabId - 1);
        } else if (tabDataMap[tabId + 1]) {
            setTabData(tabDataMap[tabId + 1]);
            setSelectedTabIndex(tabId + 1);
        } else {
            setTabData({});
            setSelectedTabIndex(0);
        }
    };

    return (
        <TabsWrapperContext.Provider
            value={{ tabs, tabDataMap, tabData, selectedTabIndex, addNewTab, handleTabChange, handleTabDataUpdate, handleTabClose }}
        >
            <DynamicTabs
                tabs={tabs}
                selectedTab={selectedTabIndex}
                onChange={handleTabChange}
            />
        </TabsWrapperContext.Provider>
    );
};

export const useTabsWrapperContext = () => {
    return useContext(TabsWrapperContext);
};