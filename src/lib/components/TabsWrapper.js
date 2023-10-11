import React, { createContext, useContext, useState } from "react";
import DynamicTabs from "./DynamicTabs";
import _, { find }  from "lodash";

const TabsWrapperContext = createContext();
TabsWrapperContext.displayName = "tabContexts";

/**
 * This is a wrapper component that is called to initialize a tabs component utilizing Material UI.
 * The component utilizes React Context to store the data between tabs
 * @return {JSX.Element} A React component rendering the tabs
 */
export const TabsContainerWrapper = () => {
    const initialComponentInfo = {
        label: "Registration Form",
        content: "",
        componentType: "RegistrationForm",
        formId: 1,
    };
    // First Tab on parent level and a child showing that it has no tabs inside
    const [masterTabData, setMasterTabData] = useState({
        0: { tabs: [initialComponentInfo],
            selectedTabIndex: 0,
            tabLevelIndexMemo: [0],
        },
        1: { tabs: [[]],
            tabLevelIndexMemo: [],
        }
    })
    // Local state to track the tabs to render at the top / parent level
    const [parentDepthTabs, setParentDepthTabs] = useState([initialComponentInfo]);

    // Local Current Tabs in the current depth for rendering
    const [currentDepthTabs, setCurrentDepthTabs] = useState([initialComponentInfo]);

    // Local Depth level counter
    const [currentTabDepth, setCurrentTabDepth] = useState(0);
    
    // Local Parent Tab Index for showing
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    // Local Data that populates on the tab in view
    const [tabData, setTabData] = useState({});

    
    const findDepthLevel = (currentLevelTabs) => {
        let depthLevel = 0;
        if(currentLevelTabs) {
            _.map(masterTabData, (data, key) => {
                if(parseInt(key) == 0) {
                    if(_.isEqual(data.tabs, currentLevelTabs)) {
                        depthLevel = parseInt(key);
                        setCurrentTabDepth(parseInt(key));
                    }
                } else {
                    if(_.isEqual(data.tabs[masterTabData[parseInt(key) - 1].selectedTabIndex], currentLevelTabs)) {
                        depthLevel = parseInt(key);
                        setCurrentTabDepth(parseInt(key));
                    }
                }
            })
        } else {
            _.map(masterTabData, (data, key) => {
                if(parseInt(key) == 0) {
                    if(_.isEqual(data.tabs, currentDepthTabs)) {
                        depthLevel = parseInt(key);
                        setCurrentTabDepth(parseInt(key));
                    }
                } else {
                    if(_.isEqual(data.tabs[masterTabData[parseInt(key) - 1].selectedTabIndex], currentDepthTabs)) {
                        depthLevel = parseInt(key);
                        setCurrentTabDepth(parseInt(key));
                    }
                }
            })
        }
        return depthLevel;
    }
    
    const addNewTab = (props) => {
        let masterCopy = {...masterTabData};
        let newTabIndex;
        const currentDepth = findDepthLevel();

        if(currentDepth == 0 ) {
            let newTabData = [...currentDepthTabs, props]
            masterCopy[currentDepth].tabs = newTabData;
            // Update the memo to keep track of what child / tab is in view
            masterCopy[currentDepth].tabLevelIndexMemo.push(0);
            
            // Update the Tab view Index
            newTabIndex = newTabData.length - 1;
            masterCopy[currentDepth].selectedTabIndex = newTabIndex;
            
            // Add empty array in tabs one nest level in to denote that there is no child tab information under this tab
            if(masterCopy[1]) {
                masterCopy[1].tabs.push([]);
            } else {
                masterCopy[1] = {
                    tabs: [[]],
                    tabLevelIndexMemo: []
                }
            }

            // Update ParentTabs / currentTabs for render + tracking
            setParentDepthTabs(newTabData);
            setCurrentDepthTabs(newTabData);
            setSelectedTabIndex(newTabIndex);

            // Update the master tab data store
            setMasterTabData(masterCopy);
        } else {
            // n level depth in
            newTabIndex = currentDepthTabs.length;
            // Update the tab row
            let newTabData = [...currentDepthTabs, props];
            masterCopy[currentDepth].tabs[masterCopy[currentDepth - 1 ].selectedTabIndex] = [...newTabData];
            masterCopy[currentDepth].selectedTabIndex = newTabIndex;

            // Update the memo to track what child / tab to view for the new tab
            masterCopy[currentDepth].tabLevelIndexMemo.push(0);
            
            // Update the memo so we know what child tab is in view for the parent tab 
            masterCopy[currentDepth - 1].tabLevelIndexMemo[masterCopy[currentDepth - 1].selectedTabIndex] = newTabIndex;

            // Update the master tab data store
            setCurrentDepthTabs(newTabData);
            setMasterTabData(masterCopy);
        }

        // Update the tabs data to be the initial state of whatever you pass in
        setTabData(props.initialState);
    };

    const handleTabChange = (event, newTabId, cdTabs) => {
        let newTabData = {};
        let masterCopy = {...masterTabData};
        let currentDepth = findDepthLevel( cdTabs );
        const currentTabIndex = masterCopy[currentDepth].selectedTabIndex;

        masterCopy[currentDepth].selectedTabIndex = newTabId;
        
        if(currentDepth == 0) {
            setSelectedTabIndex(newTabId);
            // If the Tab contains sub tabs then we need to fetch the data on the sub tab
            if(masterCopy[currentDepth].tabs[currentTabIndex].componentType == 'TabsContainer') {
                let tabMemoIndex = masterCopy[0].tabLevelIndexMemo[newTabId];
                masterCopy[1].selectedTabIndex = tabMemoIndex;                
                newTabData = masterCopy[1].tabs[newTabId][tabMemoIndex].formData                

                // We are switching to a tabs container so we need to render tabs one depth level in
                setCurrentDepthTabs(masterCopy[1].tabs[currentTabIndex]);
            } else {
                newTabData = masterCopy[currentDepth].tabs[currentTabIndex].formData;
                setCurrentDepthTabs(masterCopy[currentDepth].tabs);
            }

            // Update the current tab in view with the data from the Context
            setTabData(newTabData);
        } else {
            const parentTabIndex = masterCopy[currentDepth - 1].selectedTabIndex;

            // Update the tab memo to keep track of which tab inside a tab container is looking at
            masterCopy[currentDepth - 1].tabLevelIndexMemo[parentTabIndex] = newTabId;

            if(masterCopy[currentDepth].tabs[parentTabIndex][currentTabIndex].componentType == 'TabsContainer') {                
                masterCopy[currentDepth].selectedTabIndex = newTabId;
                
                // Update the selectedTabIndex for 1 depth level in we are showing by using the memo
                masterCopy[currentDepth + 1].selectedTabIndex = masterCopy[currentDepth].tabLevelIndexMemo[currentTabIndex];            
                
                // Update the tabs
                setCurrentDepthTabs(masterCopy[currentDepth + 1].tabs[currentTabIndex]);
            } else {
                // Update the tabs
                setCurrentDepthTabs(masterCopy[currentDepth].tabs[parentTabIndex]);
            }

            // Update the tab in view with data from the Context
            setTabData(masterCopy[currentDepth].tabs[parentTabIndex][currentTabIndex].formData);
        }

        setMasterTabData(masterCopy);
    };

    /**
     * This function will handle updating the Context with any data changes from the tab.
     * @param {Object} formData Contains all the fields on the tab that are being updated to the Context  
     */
    const handleTabDataUpdate = (formData) => {
        let masterCopy = {...masterTabData };
        const currentDepth = findDepthLevel();
        
        if(currentDepth == 0) {
            masterCopy[0].tabs[masterCopy[0].selectedTabIndex].formData = formData;
            
            setParentDepthTabs(masterCopy[0].tabs);
            setCurrentDepthTabs(masterCopy[0].tabs);
        } else {
            const parentTabIndex = masterCopy[currentDepth - 1].selectedTabIndex;
            const currentTabIndex = masterCopy[currentDept].selectedTabIndex;

            masterCopy[currentDepth].tabs[parentTabIndex][currentTabIndex].formData = formData;
            setCurrentDepthTabs(masterCopy[currentDepth].tabs[parentTabIndex]);
        }
        
        // Update the context with the new data
        setMasterTabData(masterCopy);
    };

    const handleTabClose = (event, tabId, cdTabs) => {
        // Stop event from propagating to the target element's parent
        event.stopPropagation()
        let currentDepth = findDepthLevel( cdTabs );
        let masterCopy = {...masterTabData };

        if(currentDepth == 0) {
            // Update the tabs
            let parentCopy = parentDepthTabs.toSpliced(tabId, 1);
            setParentDepthTabs(parentCopy);
            setCurrentDepthTabs(parentCopy);

            // Remove any children inside the parent being deleted
            let newDepthCopy = masterCopy[1].tabs.toSpliced(tabId,1);
            masterCopy[1].tabs = newDepthCopy;
            masterCopy[0].tabs = parentCopy;

            // Reset depth level back to top
            setCurrentTabDepth(0);

            // Remove index from tab level memo
            masterCopy[0].tabLevelIndexMemo.splice(tabId, 1);

            // Fetch data of tab in view
            if(parentCopy[tabId]) {
                setSelectedTabIndex(tabId)
                masterCopy[0].selectedTabIndex = tabId;
                if(parentCopy[tabId].componentType == 'TabsContainer') {
                    setTabData(masterCopy[1].tabs[tabId][masterCopy[0].tabLevelIndexMemo[ tabId ] ].formData);
                    
                    // Since the tab contains subtabs then we are at the next depth level
                    setCurrentTabDepth(1);
                } else {
                    setTabData(parentCopy[tabId].formData);
                }
            } else if(parentCopy[tabId - 1]) {
                setSelectedTabIndex(tabId - 1)
                masterCopy[0].selectedTabIndex = tabId - 1;
                if(parentCopy[tabId - 1].componentType == 'TabsContainer') {
                    setTabData(masterCopy[1].tabs[tabId - 1][masterCopy[0].tabLevelIndexMemo[ tabId - 1 ] ].formData);
                    
                    // Since the tab contains subtabs then we are at the next depth level
                    setCurrentTabDepth(1);
                } else {
                    setTabData(parentCopy[tabId - 1].formData);
                }
            } else if (parentCopy[tabId + 1]) {
                setSelectedTabIndex(tabId + 1)
                masterCopy[0].selectedTabIndex = tabId + 1;
                if(parentCopy[tabId + 1].componentType == 'TabsContainer') {
                    setTabData(masterCopy[1].tabs[tabId + 1 ][masterCopy[0].tabLevelIndexMemo[ tabId + 1 ] ].formData);
                    
                    // Since the tab contains subtabs then we are at the next depth level
                    setCurrentTabDepth(1);
                } else {
                    setTabData(parentCopy[tabId + 1].formData);
                }
            } else {
                masterCopy[0].selectedTabIndex = 0;
                setTabData({});
                setSelectedTabIndex(0);
            }
        } else {
            // Only consider 1 depth level
            // Update the tabs on the current depth
            let currentTabsCopy = currentDepthTabs.toSpliced(tabId, 1);
            let currentTabIndex = masterCopy[currentDepth].selectedTabIndex;
            let parentTabIndex = masterCopy[currentDepth - 1].selectedTabIndex;
            setCurrentDepthTabs(currentTabsCopy);
            
            // If we have no more tabs in the current level then remove the parent
            if(currentTabsCopy.length == 0) {
                if(currentDepth == 0) {
                    // Case at depth level 1
                    let parentCopy = parentDepthTabs.toSpliced(masterCopy[0].selectedTabIndex, 1);
                    masterCopy[0].tabs = parentCopy;
                    masterCopy[currentDepth].tabs.splice(parentTabIndex, 1 );
                } else {
                    // 007
                    // Further work needs to be implemented to capture nesting levels > 2
                    setTabData({})
                    setCurrentDepthTabs([])
                }
            } else {
                masterCopy[currentDepth].tabs[parentTabIndex] = currentTabsCopy;
            }

            // 007
            // Further work needs to be implemented to capture nesting levels > 2 (Case where we are rendering a tab container)
            // Load the data from the Context
            if(currentTabsCopy[currentTabIndex]) {
                setTabData(currentTabsCopy[currentTabIndex].formData);
                masterCopy[currentDepth].selectedTabIndex = currentTabIndex;
            } else if(currentTabsCopy[currentTabIndex - 1]) {
                setTabData(currentTabsCopy[currentTabIndex - 1].formData);
                masterCopy[currentDepth].selectedTabIndex = currentTabIndex - 1;            
            } else if (currentTabsCopy[currentTabIndex + 1]) {
                setTabData(currentTabsCopy[currentTabIndex + 1].formData);
                masterCopy[currentDepth].selectedTabIndex = currentTabIndex + 1;
            } else {
                setTabData({});
                setSelectedTabIndex(null);
            }
        }
        // Update the Context with the new data
        setMasterTabData(masterCopy);
    };

    /**
     * This function will handle adding a new Tab that will support sub tabs inside.
     * This function will require you to pass in the an Object with the prop: 'componentType' = 'TabsContainer'
     * You may also pass in the prop: 'child' = {Object} that will control what is rendered inside the new tab that appears initially
     * @param {Object} props 
     */
    const handleAddNewDepthTab = (props) => {
        let masterCopy = { ...masterTabData };
        let currentDepth = findDepthLevel();

        // Control to use if you only want to create tabs with a nesting level of 1
        if(props.parentOnly) {
            currentDepth = 0;
        }

        if(currentDepth == 0) {
            let newParentTabIndex = parentDepthTabs.length;
            masterCopy[currentDepth].tabs = [...parentDepthTabs, {...props}];
            masterCopy[currentDepth].selectedTabIndex = newParentTabIndex;
            // Add to memo so we can keep track of what child the tab is looking at
            masterCopy[currentDepth].tabLevelIndexMemo.push(0);

            setSelectedTabIndex(newParentTabIndex);
            setParentDepthTabs([...parentDepthTabs, {...props}]);
            
            if(masterCopy[currentDepth + 1]) {
                // If we already have data at nesting level of 1 then add to it
                masterCopy[currentDepth + 1].selectedTabIndex = 0;
                
                masterCopy[currentDepth + 1].tabs = [ ...masterCopy[currentDepth + 1].tabs, [props.child] ];
                
                // Since we are adding a new tab (the child) we need to update the memo as well
                masterCopy[currentDepth + 1].tabLevelIndexMemo = [...masterCopy[currentDepth + 1].tabLevelIndexMemo, 0];
            } else {
                masterCopy[currentDepth + 1] = {
                    tabs: [[],[props.child]],   // [[], [props.child]] Assumes we started on a page without any child tabs -> we need an empty array to show it holds no child tabs
                    tabLevelIndexMemo: [0],
                    selectedTabIndex: 0,
                };
            }
            // Update the tab depth
            setCurrentTabDepth(1);

            // Show the new child component
            setCurrentDepthTabs([props.child])
            setTabData(props.child.initialState);
        } else {
            // Adding new n level Depth
            let parentTabIndex = masterCopy[currentDepth - 1].selectedTabIndex;
            masterCopy[currentDepth].selectedTabIndex = masterCopy[currentDepth].tabs[parentTabIndex].length;
            masterCopy[currentDepth].tabs[parentTabIndex].push(props);
            
            
            if(masterCopy[currentDepth + 1]) {
                // If we already have data at nesting level of 1 then add to it
                masterCopy[currentDepth + 1].tabs = [ ...masterCopy[currentDepth + 1].tabs, [props.child] ];
                masterCopy[currentDepth + 1].tabLevelIndexMemo = [...masterCopy[currentDepth + 1].tabLevelIndexMemo, 0];
                masterCopy[currentDepth + 1].selectedTabIndex = 0;
            } else {
                // 007
                // Further work needs to be done to implement nesting levels > 2
                // Memo may need rework at n > 0
                masterCopy[currentDepth + 1] = {
                    tabs: [ ],
                    tabLevelIndexMemo: [0],
                    selectedTabIndex: 0,
                };

                let currentTabs = masterCopy[currentDepth].tabs[parentTabIndex];

                // This only accounts for depth n = 1
                // At depth n = 2 then tabs will need another nesting array to hold each element

                // Since we do not have a nested level of n then we know we need empty arrays for as many tabs as we have in the current level
                for(let i = 0; i < currentTabs.length - 1; i++) {
                    masterCopy[currentDepth + 1].tabs.push([]);
                }

                masterCopy[currentDepth + 1].tabs.push([props.child]);
            }
            setCurrentTabDepth(currentDepth + 1);
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
            <button onClick={() => {
                addNewTab(
                    {
                        label: "RegistrationForm",
                        content: "",
                        componentType: "RegistrationForm",
                        initialState: {
                            name: "",
                            email: "",
                            password: "",
                        },
                        tabs: parentDepthTabs,
                        depth: 0,
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
                            tabs: parentDepthTabs,
                            initialState: {},
                            child: {
                                label: "Nested Child",
                                content: "This is a nested tab child",
                                componentType: "",
                                initialState: {}
                            },
                            currentDepthLevel: 0,
                            parentOnly: true,
                        }
                    )
                }}>
                    Open New Tab with Nested Depth
                </button>
        </TabsWrapperContext.Provider>
    );
};

export const useTabsWrapperContext = () => {
    return useContext(TabsWrapperContext);
};