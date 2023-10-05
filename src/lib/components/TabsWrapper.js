import React, { createContext, useContext, useState } from "react";
import DynamicTabs from "./DynamicTabs";
import _  from "lodash";

const TabsWrapperContext = createContext();
TabsWrapperContext.displayName = "tabContexts";

export const TabsContainerWrapper = ({ children }) => {
    // Object containing all the tabs + data for persisting data
    const [tabsDepthMap, setTabsDepthMap] = useState([[]]);
    const [currentTabDepth, setCurrentTabDepth] = useState(0);

    // Local state to track parent tabs
    const [parentDepthTabs, setParentDepthTabs] = useState([{
        label: "Registration Form",
        content: "",
        componentType: "RegistrationForm",
        formId: 1,
    },])

    // Current Tabs in the current depth for rendering
    const [currentDepthTabs, setCurrentDepthTabs] = useState([
        {
            label: "Registration Form",
            content: "",
            componentType: "RegistrationForm",
            formId: 1,
        },
    ]);

    // Parent Tab Index for showing
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    // Current Depth Selected Tab Index
    const [cdsti, setCdsti] = useState([0])

    // firstNestedSelectedTabIndex
    //This variable will contain What tab index we want on the selectedTab
    const [firstNestedSelectedTabIndex, setFirstNestSelectedTabIndex] = useState([0]); // Initially no nested tabs so always show 0 indexed tab

    // Data from the selected tab in view
    const [tabData, setTabData] = useState({});
    const [firstNestedTabs, setFirstNestedTabs] = useState([[]]) // Initially we have no nested tabs
    
    const addNewTab = (props) => {
        let newTabIndex;
        let ctd = 0;
        if(_.isEqual(currentDepthTabs, parentDepthTabs)) {
            setCurrentTabDepth(0)
            ctd = 0;
        } else {
            setCurrentTabDepth(1)
            ctd = 1;
        }

        if(ctd == 0 ) {
            // Current Depths level is 0
            let tempData = [...parentDepthTabs, props]
            setParentDepthTabs(tempData);
            setCurrentDepthTabs(tempData);
            // Update the Tab view Index
            newTabIndex = tempData.length -1;
            setSelectedTabIndex(newTabIndex);

            setFirstNestedTabs([...firstNestedTabs, []]) // Added a new parent level tab so we have no nested tabs
            let fnstiCopy = [...firstNestedSelectedTabIndex];
            fnstiCopy.push(0);
            setFirstNestSelectedTabIndex(fnstiCopy);
        } else {
            newTabIndex = currentDepthTabs.length;
            // One level of Depth in
            // We'll need a copy first
            let cdTabs = [...currentDepthTabs, props];
            setCurrentDepthTabs(cdTabs);
            // let tabsDepthMapCopy = [...tabsDepthMap];
            // Adding the component to the nested tabs storage
            // Need to know which tab we are on in the nested level of 1
            let nestedTabsCopy = [...firstNestedTabs];
            nestedTabsCopy[selectedTabIndex] = [...cdTabs]
            setFirstNestedTabs(nestedTabsCopy);
            let tempCDSTI = [...cdsti];
            tempCDSTI[ctd] = newTabIndex;
            setCdsti(tempCDSTI);

            let fnstiCopy = [...firstNestedSelectedTabIndex];
            // Whatever parent we are on we know we need to change the selected view
            fnstiCopy[selectedTabIndex] = newTabIndex;
            setFirstNestSelectedTabIndex(fnstiCopy);
        }

        // Update the initial state of the tab
        setTabData(props.initialState);
    };

    const handleTabChange = (event, newTabId, cdTabs) => {
        let copyData;
        
        // Only consider depth level of 0 and 1
        if(_.isEqual(cdTabs,parentDepthTabs)) {
            // At parent level so we know that newTabId is going to be the value we want
            if(cdTabs[newTabId].componentType == 'TabsContainer') {
                firstNestedTabs[newTabId] // contains all the information on tabs we have on this level
                // Just open the tab container
                setSelectedTabIndex(newTabId);

                // Current Depth Tabs will also change
                // We need to populate the tab with data coming from cdsti
                
                // Update to the firstNestedSelectedTabIndex of the newTabId we want
                let cdstiCopy = [...cdsti];
                cdstiCopy[1] = firstNestedSelectedTabIndex[newTabId];
                setCdsti(cdstiCopy);

                setTabData(firstNestedTabs[newTabId][firstNestedSelectedTabIndex[newTabId]].formData);
                setCurrentDepthTabs(firstNestedTabs[newTabId]);
                setCurrentTabDepth(1)
            } else {
                setCurrentDepthTabs([...parentDepthTabs]);
                setSelectedTabIndex(newTabId);
                let tempCDSTI = [...cdsti];
                tempCDSTI[0] = newTabId;
                setCdsti(tempCDSTI);
                // Update tab data
                let tabCopy = parentDepthTabs[newTabId].formData
                setTabData(tabCopy);
                setCurrentTabDepth(0);
            }
        } else {
            // One depth in
            if(cdTabs[newTabId].componentType == 'TabsContainer') {
                // 007 This still needs to be worked on
                firstNestedTabs[selectedTabIndex] // contains all the information on tabs we have on this level
                copyData = firstNestedTabs[selectedTabIndex][newTabId].formData ? 
                    firstNestedTabs[selectedTabIndex][newTabId].formData 
                    : 
                    {};
                // Update cdsti
                setCurrentTabDepth(2);
            } else {
                // Any component one Depth level in
                setCurrentTabDepth(1);
                let cdstiCopy = [...cdsti];
                cdstiCopy[1] = newTabId;
                setCdsti(cdstiCopy);
                let firstNestedSelectedTabIndexCopy = [...firstNestedSelectedTabIndex];
                firstNestedSelectedTabIndexCopy[selectedTabIndex] = newTabId;
                setFirstNestSelectedTabIndex(firstNestedSelectedTabIndexCopy);
                setTabData(firstNestedTabs[selectedTabIndex][newTabId].formData);
            }
            let fntCopy = [...firstNestedTabs][selectedTabIndex];
            setCurrentDepthTabs(fntCopy);
        }
    };

    const handleTabDataUpdate = (formData) => {
        // This function handles the update of all the data inside the tab
        // _.map(tabsDepthMap, (data, index) => {
        //     if(_.isEqual(formData.tabs, data)) {
        //         // Index is current depth here
        //         setCurrentTabDepth(index);

                
        //         // pull the form data from the Object
        //         let formCopy = {...tabsDepthMap[index][formData.tabId]};
        //         const updatedForm = _.merge(formCopy, { formData });
        //         // Update the tab that is in view with the data from the form
        //         setTabData(updatedForm);

        //         // Update TabDataMap so we can access the data when switching between tabs
        //         let tempMapData = [...tabsDepthMap]
        //         tempMapData[index][formData.tabId].formData = formData;
        //         setTabsDepthMap(tempMapData);

        //         if(index == 0) {
        //             let parentCopy = [...parentDepthTabs];
        //             parentCopy[formData.tabId].formData = formData;
        //             setParentDepthTabs(parentCopy);
        //         } else {
        //             let tempCDTabs = [...currentDepthTabs];
        //             tempCDTabs[formData.tabId].formData = formData;
        //             setCurrentDepthTabs(tempCDTabs);
        //         }
        //     }
        // })

        // This function handles the update of all the data inside the tab
        // Do case of parent depth first
        if(_.isEqual(formData.tabs, parentDepthTabs)) {
            // Then update the data in parentDepthTabs
            let parentCopy = [...parentDepthTabs];
            parentCopy[selectedTabIndex].formData = formData;

            setParentDepthTabs(parentCopy);
            setCurrentDepthTabs(parentCopy);
            // setTabData(formData)
        } else {
            // Find out which tab we are on parent
            // Find the tab we are updating

            let fntCopy = [...firstNestedTabs];
            fntCopy[selectedTabIndex][cdsti[1]].formData = formData;

            setFirstNestedTabs(fntCopy);
            setCurrentDepthTabs(fntCopy);
            // setTabData(formData)
        }
    };

    const handleTabClose = (event, tabId) => {
        // Stop event from propagating to the target element's parent
        event.stopPropagation();

        // Remove the tab from tabs state
        // Create shallow copy
        tabs.splice(tabId,1);
        setCurrentDepthTabs([...tabs]);

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

    const handleAddNewDepthTab = (props) => {
        // This function will be called when we are creating a new tab with a higher depth level
        
        // Push the child component into the nested state to track
        
        // Push the new data of the tab into the data map
        let tempMap;
        let fntCopy = [...firstNestedTabs]
        if((currentTabDepth) == 0) {
            let newParentTabIndex = parentDepthTabs.length;
            // Add the new Tab to the current row
            setParentDepthTabs([...parentDepthTabs, {...props}]);
            // Select the new parent tab to be in view
            setSelectedTabIndex(newParentTabIndex);
            tempMap = [
                [...parentDepthTabs, {...props}], // row of tab data for the parent
                [props.child] // This is the row of tab data for the new row
            ] 
            
            // We know that the new tab will contain the children
            fntCopy.push([props.child])
            setFirstNestedTabs(fntCopy);
            let fnstiCopy = [...firstNestedSelectedTabIndex];
            fnstiCopy.push(0)
            setFirstNestSelectedTabIndex(fnstiCopy)
        } else {
            // 007 This needs to change to handle a new row depending on depth level
            tempMap = [
                [...parentDepthTabs], // row of tab data for the parent
                // Use push function
                [...currentDepthTabs,{...props}] // This is the row of tab data for the new row
                // Use the length to create new entry containing the props.child
            ] 
        }

        // Set up the new nest row we pass to the tab container for rendering
        setCurrentDepthTabs([props.child]);
        // Update the Tab view Index for the new row
        let tempCDSTI = [...cdsti, 0];
        setCdsti(tempCDSTI);
        setTabsDepthMap(tempMap);
        // Update the initial state of the Tab in view
        setTabData(props.initialState);

        // 007
        // Increment the current tab depth
        // setCurrentTabDepth(currentTabDepth + 1);
    }

    return (
        <TabsWrapperContext.Provider
            value={{ tabData, selectedTabIndex, currentTabDepth, tabsDepthMap, currentDepthTabs, cdsti, firstNestedTabs, firstNestedSelectedTabIndex, addNewTab, handleTabChange, handleTabDataUpdate, handleTabClose, handleAddNewDepthTab }}
        >
            <DynamicTabs
                tabs={parentDepthTabs}
                selectedTab={selectedTabIndex}
                onChange={handleTabChange}
            />
        </TabsWrapperContext.Provider>
    );
};

export const useTabsWrapperContext = () => {
    return useContext(TabsWrapperContext);
};