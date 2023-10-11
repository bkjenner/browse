import React, { createContext, useContext, useState } from "react";
import DynamicTabs from "./DynamicTabs";
import _  from "lodash";

const TabsWrapperContext = createContext();
TabsWrapperContext.displayName = "tabContexts";

export const TabsContainerWrapper = ({ children }) => {
    // Object containing all the tabs + data for persisting data
    const [tabsDepthMap, setTabsDepthMap] = useState([[]]);

    // First Tab on parent level and a child showing that it has no tabs inside
    const [masterTabData, setMasterTabData] = useState({
        0: { tabs: [ 
            {
                label: "Registration Form",
                content: "",
                componentType: "TableGrid",
                formId: 1,
            }
        ],
            selectedTabIndex: 0,
            tabLevelIndexMemo: [0],
        },
        1: { tabs: [[]],
            tabLevelIndexMemo: [],
        }
    })
    const [currentTabDepth, setCurrentTabDepth] = useState(0);

    // Local state to track parent tabs
    const [parentDepthTabs, setParentDepthTabs] = useState([{
        label: "Registration Form",
        content: "",
        componentType: "TableGrid",
        formId: 1,
    },])

    // Current Tabs in the current depth for rendering
    const [currentDepthTabs, setCurrentDepthTabs] = useState([
        {
            label: "Registration Form",
            content: "",
            componentType: "TableGrid",
            formId: 1,
        },
    ]);

    // Parent Tab Index for showing
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    // Data from the selected tab in view
    const [tabData, setTabData] = useState({});
    
    const addNewTab = (props) => {
        let newTabIndex;
        let ctd = 0;
        _.map(masterTabData, (data, key) => {
            if(parseInt(key) == 0) {
                if(_.isEqual(data.tabs, currentDepthTabs)) {
                    ctd = parseInt(key);
                    setCurrentTabDepth(parseInt(key));
                }
            } else {
                if(_.isEqual(data.tabs[masterTabData[parseInt(key) - 1].selectedTabIndex], currentDepthTabs)) {
                    ctd = parseInt(key);
                    setCurrentTabDepth(parseInt(key));
                }
            }
        })

        let masterCopy = {...masterTabData};
        if(ctd == 0 ) {
            // Current tab Depth level is 0
            let tempData = [...currentDepthTabs, props]
            masterCopy[ctd].tabs = tempData;
            masterCopy[ctd].tabLevelIndexMemo.push(0);
            
            // Update currentDepthTabs for render + tracking
            setParentDepthTabs(tempData);
            setCurrentDepthTabs(tempData);
            // Update the Tab view Index
            newTabIndex = tempData.length - 1;
            masterCopy[ctd].selectedTabIndex = newTabIndex;
            setSelectedTabIndex(newTabIndex);

            // We need to add empty tabs to the tabs key one nest in
            if(masterCopy[1]) {
                masterCopy[1].tabs.push([]);
            } else {
                masterCopy[1] = {
                    tabs: [[]],
                    tabLevelIndexMemo: []
                }
            }
            setMasterTabData(masterCopy);
        } else {
            // n level depth in
            newTabIndex = currentDepthTabs.length;
            let cdTabs = [...currentDepthTabs, props];
            masterCopy[ctd].tabs[masterCopy[ctd -1].selectedTabIndex] = [...cdTabs];
            masterCopy[ctd].selectedTabIndex = newTabIndex; 
            masterCopy[ctd].tabLevelIndexMemo.push(0);
            masterCopy[ctd - 1].tabLevelIndexMemo[masterCopy[ctd -1].selectedTabIndex] = newTabIndex;

            setMasterTabData(masterCopy);
            setCurrentDepthTabs(cdTabs);
        }

        // Update the initial state of the tab
        setTabData(props.initialState);
    };

    const handleTabChange = (event, newTabId, cdTabs) => {
        let ctd = 0;
        _.map(masterTabData, (data, key) => {
            if(parseInt(key) == 0) {
                if(_.isEqual(data.tabs, cdTabs)) {
                    ctd = parseInt(key);
                    setCurrentTabDepth(parseInt(key));
                }
            } else {
                if(_.isEqual(data.tabs[masterTabData[parseInt(key) - 1].selectedTabIndex], cdTabs)) {
                    ctd = parseInt(key);
                    setCurrentTabDepth(parseInt(key));
                }
            }
        })

        let masterCopy = {...masterTabData};
        masterCopy[ctd].selectedTabIndex = newTabId;
        
        if(ctd == 0) {
            setSelectedTabIndex(newTabId);
            // We need to check if the component is a Tab Container
            if(masterCopy[ctd].tabs[masterCopy[ctd].selectedTabIndex].componentType == 'TabsContainer') {
                let tabMemoIndex = masterCopy[0].tabLevelIndexMemo[newTabId];
                setTabData(masterCopy[1].tabs[newTabId][tabMemoIndex].formData);
                
                masterCopy[1].selectedTabIndex = tabMemoIndex;
            } else {
                setTabData(masterCopy[ctd].tabs[masterCopy[ctd].selectedTabIndex].formData);
            }
        } else {
            setTabData(masterCopy[ctd].tabs[masterCopy[ctd - 1].selectedTabIndex][masterCopy[ctd].selectedTabIndex].formData);
            // We should be setting the nested tab view index here
        }

        if(ctd == 0) {
            if(masterCopy[ctd].tabs[masterCopy[ctd].selectedTabIndex].componentType == 'TabsContainer') {
                // We are switching to a tabs container so we need to go one depth level in
                setCurrentDepthTabs(masterCopy[1].tabs[masterCopy[ctd].selectedTabIndex]);

                // Update the tabs selectedTabIndex
                masterCopy[1].selectedTabIndex = masterCopy[0].tabLevelIndexMemo[masterCopy[0].selectedTabIndex];
            } else {
                setCurrentDepthTabs(masterCopy[ctd].tabs);
            }
        } else {

            // If we are not at the parent depth then we need to update the tab memo to keep track of what tab is where
            masterCopy[ctd - 1].tabLevelIndexMemo[masterCopy[ctd -1].selectedTabIndex] = newTabId;

            if(masterCopy[ctd].tabs[masterCopy[ctd - 1].selectedTabIndex][masterCopy[ctd].selectedTabIndex].componentType == 'TabsContainer') {
                // We are switching to a tabs container so we need to go one depth level in
                setCurrentDepthTabs(masterCopy[ctd + 1].tabs[masterCopy[ctd].selectedTabIndex]);


                // Update the selectedTabIndex for current depth level
                masterCopy[ctd].selectedTabIndex = newTabId;

                // Update the selectedTabIndex for the+ 1 depth level we are showing
                masterCopy[ctd + 1].selectedTabIndex = masterCopy[ctd].tabLevelIndexMemo[masterCopy[ctd].selectedTabIndex];
                
            
            } else {
                // Set the current tabs container to contain the tabs found under the tab we have selected
                setCurrentDepthTabs(masterCopy[ctd].tabs[masterCopy[ctd - 1].selectedTabIndex]);
            }
        }

        setMasterTabData(masterCopy);
    };

    const handleTabDataUpdate = (formData) => {
        let ctd = 0;
        _.map(masterTabData, (data, key) => {
            if(parseInt(key) == 0) {
                if(_.isEqual(data.tabs, currentDepthTabs)) {
                    ctd = parseInt(key);
                    setCurrentTabDepth(parseInt(key));
                }
            } else {
                if(_.isEqual(data.tabs[masterTabData[parseInt(key) - 1].selectedTabIndex], currentDepthTabs)) {
                    ctd = parseInt(key);
                    setCurrentTabDepth(parseInt(key));
                }
            }
        })

        let masterCopy = {...masterTabData };

        if(ctd == 0) {
            // Parent depth level
            masterCopy[0].tabs[masterCopy[0].selectedTabIndex].formData = formData;
            setCurrentDepthTabs(masterCopy[0].tabs)
        } else {
            // Else find the tab we are on based on the selected tab index
            masterCopy[ctd].tabs[masterCopy[ctd - 1].selectedTabIndex][masterCopy[ctd].selectedTabIndex].formData = formData;
            setCurrentDepthTabs(masterCopy[ctd].tabs[masterCopy[ctd - 1].selectedTabIndex]);
        }

        setMasterTabData(masterCopy);
    };

    const handleTabClose = (event, tabId, cdTabs) => {
        // Stop event from propagating to the target element's parent
        event.stopPropagation();

        // Figure out what depth level we are on
        if(_.isEqual(cdTabs, parentDepthTabs)) {
            // We are on the parent level
            let parentCopy = parentDepthTabs.toSpliced(tabId, 1);
            setParentDepthTabs(parentCopy);
            // Remove the tab from current
            setCurrentDepthTabs(parentCopy);
            
            // Remove nested tab data
            let fntCopy = firstNestedTabs.toSpliced(tabId, 1);
            setFirstNestedTabs(fntCopy);
            
            // Remove the view tab index data
            let fnstiCopy = firstNestedSelectedTabIndex.toSpliced(tabId,1);
            setFirstNestSelectedTabIndex(fnstiCopy);

            // Reset depth level back to top
            setCurrentTabDepth(0);

            // Load the data
            if(parentCopy[tabId]) {
                // Case we are deleting 0 index
                setSelectedTabIndex(tabId)
                if(parentCopy[tabId].componentType == 'TabsContainer') {
                    setTabData(fntCopy[tabId][fnstiCopy[tabId]].formData);
                    setCurrentTabDepth(1);
                } else {
                    setTabData(parentCopy[tabId].formData);
                }
            } else if(parentCopy[tabId - 1]) {
                setSelectedTabIndex(tabId - 1)
                if(parentCopy[tabId - 1].componentType == 'TabsContainer') {
                    setTabData(fntCopy[selectedTabIndex - 1][fnstiCopy[selectedTabIndex - 1]].formData);
                    let cdstiCopy = [...cdsti];
                    cdstiCopy[1] = fnstiCopy[selectedTabIndex -1];
                    setCdsti(cdstiCopy);
                    setCurrentTabDepth(1);
                } else {
                    setTabData(parentCopy[tabId - 1].formData);
                }
            } else if (parentCopy[tabId + 1]) {
                setSelectedTabIndex(tabId + 1)
                if(parentCopy[tabId + 1].componentType == 'TabsContainer') {
                    setCurrentTabDepth(1);
                    setTabData(fntCopy[selectedTabIndex][fnstiCopy[selectedTabIndex - 1]].formData);
                } else {
                    setTabData(parentCopy[tabId + 1].formData);
                }
            } else {
                setTabData({});
                setSelectedTabIndex(0);
            }
        } else {
            // We are on depth level 1
            let currentCopy = currentDepthTabs.toSpliced(tabId, 1);
            setCurrentDepthTabs(currentCopy);

            let nestCopy = firstNestedTabs;
            nestCopy[selectedTabIndex].splice(tabId, 1);
            setFirstNestedTabs(nestCopy);

            let currentTab = firstNestedSelectedTabIndex[selectedTabIndex];
            // If we have no more tabs in the current level then close out the parent
            if(currentCopy.length == 0) {
                setTabData({})
                setCurrentDepthTabs([])
            }

            if(currentCopy[currentTab]) {
                setTabData(currentCopy[currentTab].formData);
                let cdstiCopy = [...cdsti];
                cdstiCopy[1] = currentTab;
                setCdsti(cdstiCopy)
                let fnstiCopy = [...firstNestedSelectedTabIndex];
                fnstiCopy[selectedTabIndex] = currentTab;
                setFirstNestSelectedTabIndex(fnstiCopy)
            } else if(currentCopy[currentTab - 1]) {
                setTabData(currentCopy[currentTab - 1].formData);
                let cdstiCopy = [...cdsti];
                cdstiCopy[1] = currentTab - 1;
                setCdsti(cdstiCopy)
                

                let fnstiCopy = [...firstNestedSelectedTabIndex];
                fnstiCopy[selectedTabIndex] = currentTab - 1;
                setFirstNestSelectedTabIndex(fnstiCopy)
            } else if (currentCopy[currentTab + 1]) {
                setTabData(currentCopy[currentTab + 1].formData);

                let cdstiCopy = [...cdsti];
                cdstiCopy[1] = currentTab + 1;
                setCdsti(cdstiCopy)
                let fnstiCopy = [...firstNestedSelectedTabIndex];
                fnstiCopy[selectedTabIndex] = currentTab + 1;
                setFirstNestSelectedTabIndex(fnstiCopy)
            } else {
                // TO DO
                // Change behavior when no more tabs are in nest to prevent error in console from showing.
                let parentCopy = parentDepthTabs.toSpliced(selectedTabIndex, 1);
                setParentDepthTabs(parentCopy);
                // Remove nested tab data
                let fntCopy = firstNestedTabs.toSpliced(selectedTabIndex, 1);
                setFirstNestedTabs(fntCopy);

                // setCurrentDepthTabs(parentCopy);
                setSelectedTabIndex(null);
            }
        }
    };

    const handleAddNewDepthTab = (props) => {
        // This function will be called when we are creating a new tab with a higher depth level
        let ctd = 0;
        _.map(masterTabData, (data, key) => {
            if(parseInt(key) == 0) {
                if(_.isEqual(data.tabs, currentDepthTabs)) {
                    ctd = parseInt(key);
                    setCurrentTabDepth(parseInt(key));
                }
            } else {
                if(_.isEqual(data.tabs[masterTabData[parseInt(key) - 1].selectedTabIndex], currentDepthTabs)) {
                    ctd = parseInt(key);
                    setCurrentTabDepth(parseInt(key));
                }
            }
        })

        let masterCopy = { ...masterTabData };
        if(ctd == 0) {
            let newParentTabIndex = parentDepthTabs.length;
            // Add the new Tab to the current row
            setParentDepthTabs([...parentDepthTabs, {...props}]);
            masterCopy[ctd].tabs = [...parentDepthTabs, {...props}];
            // Select the new parent tab to be in view
            setSelectedTabIndex(newParentTabIndex);
            masterCopy[ctd].selectedTabIndex = newParentTabIndex;

            // Keep track of what child the page is supposed to be looking at
            masterCopy[ctd].tabLevelIndexMemo.push(0);

            // If there already exists a key then
            if(masterCopy[ctd + 1]) {
                masterCopy[ctd + 1].tabs = [ ...masterCopy[ctd + 1].tabs, [props.child] ];
                masterCopy[ctd + 1].tabLevelIndexMemo = [...masterCopy[ctd + 1].tabLevelIndexMemo, 0]; // 0 because the new tab we are creating is looking at the 0 index under it
                masterCopy[ctd + 1].selectedTabIndex = 0;
            } else {
                // If there is no depth yet
                masterCopy[ctd + 1] = {
                    tabs: [[],[props.child]],
                    tabLevelIndexMemo: [0],
                    selectedTabIndex: 0,
                };
            }

            // Show the new child component
            setCurrentDepthTabs([props.child])

            setCurrentTabDepth(1);
        } else {
            // Handling of adding a new depth level not on parent row
            // We need to add a tabsContainer to the current tabs row
            masterCopy[ctd].selectedTabIndex = masterCopy[ctd].tabs[masterCopy[ctd - 1].selectedTabIndex].length;
            masterCopy[ctd].tabs[masterCopy[ctd - 1].selectedTabIndex].push(props);
            // If there already exists a key then
            if(masterCopy[ctd + 1]) {
                masterCopy[ctd + 1].tabs = [ ...masterCopy[ctd + 1].tabs, [props.child] ];
                masterCopy[ctd + 1].tabLevelIndexMemo = [...masterCopy[ctd + 1].tabLevelIndexMemo, 0];
                masterCopy[ctd + 1].selectedTabIndex = 0;
            } else {
                // If there is no depth yet
                // We'll need to somehow check for the very base level of depth and then propagate down further

                // We need to do this while somehow preserving the data that may already be there

                // look for the number of tabs in the current level and push that many empty
                // Then push the prop child we want

                // 008 uncomment this to work
                // masterCopy[ctd + 1] = {
                //     tabs: [[],[props.child]],
                //     tabLevelIndexMemo: [0], //This needs work
                //     selectedTabIndex: 0,
                // };

                // Skeleton
                
                masterCopy[ctd + 1] = {
                    tabs: [ ],
                    tabLevelIndexMemo: [0],
                    selectedTabIndex: 0,
                };

                let nestedTabIndex = masterCopy[ctd - 1].selectedTabIndex;
                let cdTabs = masterCopy[ctd].tabs[nestedTabIndex];

                // This needs to be at our nested Tab Index
                for(let i = 0; i < cdTabs.length - 1; i++) {
                    masterCopy[ctd + 1].tabs.push([]);
                }

                masterCopy[ctd + 1].tabs.push([props.child]);
            }
            setCurrentTabDepth(ctd + 1);
        }
        
        // Update the store data
        setMasterTabData(masterCopy);
        // Set up the new nest row we pass to the tab container for rendering
        setCurrentDepthTabs([props.child]);
        // Update the initial state of the Tab in view
        setTabData(props.initialState);
    }

    return (
        <TabsWrapperContext.Provider
            value={{ masterTabData, tabData, selectedTabIndex, currentTabDepth, currentDepthTabs, addNewTab, handleTabChange, handleTabDataUpdate, handleTabClose, handleAddNewDepthTab }}
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