import React, { createContext, useContext, useState } from "react";
import DynamicTabs from "./DynamicTabs";
import _, { find }  from "lodash";
import { ContentProvider, useContentProviderContext } from "../contexts/ContentContext/ContentProvider";

const TabsWrapperContext = createContext();
TabsWrapperContext.displayName = "tabContexts";

/**
 * This is a wrapper component that is called to initialize a tabs component utilizing Material UI.
 * The component utilizes React Context to store the data between tabs
 * @return {JSX.Element} A React component rendering the tabs
 */
export const TabsContainerWrapper = () => {
    const initialComponentInfo = {
        label: "Initial Tab",
        content: "This is initial Tab",
        componentType: "RegistrationForm",
        formId: 1,
        tabId: 0,
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

    const [tabId, setTabId] = useState(1);

    const [mTabData, setMTabData ] = useState({
        tabsIndex: {
            parent: { tabs: [
                {
                    label: "Initial Tab",
                    content: "This is initial Tab",
                    componentType: "RegistrationForm",
                    formId: 1,
                    tabId: 0,
                    selectedTabIndex: 0,
                    parentId: 'parent'
                }
                ]},
            0: { tabs: [],
                label: "Initial Tab",
                content: "This is initial Tab",
                componentType: "RegistrationForm",
                formId: 1,
                tabId: 0,
                selectedTabIndex: 0,
                parentId: 'parent'
                }
            },
        tabHierarchy: {
            0: [0]
        },
    });

    const { contentDataDelete } = useContentProviderContext();
    
    const addNewTab = (props) => {
        // const currentDepth = findDepthLevel();
        let currentDepth = props.currentDepthLevel;
        let mTabCopy = {...mTabData};
        if(currentDepth == 0) {
            mTabCopy.tabsIndex[props.tabId] = { 
                tabs: [], 
                selectedTabIndex: 0, 
                parentId: 'parent',
                componentType: props.componentType,
                label: props.label,
                tabId: props.tabId,
            };

            mTabCopy.tabHierarchy[0].push(tabId);
            mTabCopy.tabsIndex.parent.tabs.push(props)

            setParentDepthTabs(mTabCopy.tabsIndex.parent.tabs);
            setCurrentDepthTabs(mTabCopy.tabsIndex.parent.tabs);

            setSelectedTabIndex(mTabCopy.tabsIndex.parent.tabs.length - 1);
        } else {
            let parentTabId = 0;
            // loop through mTabCopy.tabsIndex.TabID.tabs
            _.map(mTabCopy.tabsIndex, (tabData, tabKey) => {
                if(_.isEqual(tabData.tabs, currentDepthTabs)) {
                    // then we have TabID which is the parent
                    parentTabId = tabKey;
                }
            }) 

            mTabCopy.tabsIndex[props.tabId] = {
                tabs: [],
                selectedTabIndex: 0,
                parentId: parentTabId,
                componentType: props.componentType,
                label: props.label,
                tabId: props.tabId,
            }

            //Add to the hierarchy
            mTabCopy.tabHierarchy[currentDepth].push(tabId);

            // Update the parent object
            mTabCopy.tabsIndex[parentTabId].selectedTabIndex = mTabCopy.tabsIndex[parentTabId].tabs.length; 
            mTabCopy.tabsIndex[parentTabId].tabs.push(props);
            setCurrentDepthTabs( mTabCopy.tabsIndex[parentTabId].tabs);
        }

        setTabId(tabId + 1);
        setMTabData(mTabCopy);

        // Update the tabs data to be the initial state of whatever you pass in
        setTabData(props.initialState);
    };

    const handleTabChange = (newTabId, cdTabs) => {
        let depth = 0;
        let parentTabId;
        let contentId;
        let mTabCopy = { ...mTabData };
        _.map(mTabCopy.tabsIndex, (data, key) => {
            if(_.isEqual(data.tabs, cdTabs)) {
                if(!isNaN(key)) {
                    parentTabId = Number(key);
                } else {
                    parentTabId = key;
                }
            }
        })

        if(isNaN(parentTabId)) {
            mTabCopy.tabsIndex.parent.selectedTabIndex = newTabId;
            setSelectedTabIndex(newTabId);
            setCurrentDepthTabs(mTabCopy.tabsIndex.parent.tabs);
        } else {
            mTabCopy.tabsIndex[parentTabId].selectedTabIndex = newTabId;
            setCurrentDepthTabs(mTabCopy.tabsIndex[parentTabId].tabs);
        }
        let desiredTabId = cdTabs[newTabId].tabId;

        // Update data
        if(mTabCopy.tabsIndex[desiredTabId].componentType == 'TabsContainer') {
            // 1. Case if Tab is a container
            let x = true;
            let tempSTI = mTabCopy.tabsIndex[desiredTabId].selectedTabIndex;
            let tempTabId = mTabCopy.tabsIndex[desiredTabId].tabs[tempSTI].tabId;
            let tempTabObj = mTabCopy.tabsIndex[tempTabId];
            while(x) {
                if(tempTabObj.componentType == 'TabsContainer') {
                    // Index object
                    tempTabObj = mTabCopy.tabsIndex[tempTabId];
                    // SelectedTabIndex
                    tempSTI = mTabCopy.tabsIndex[tempTabId].selectedTabIndex;
                    
                    if(mTabCopy.tabsIndex[tempTabId].componentType != 'TabsContainer') {
                        x = false;
                        contentId = tempTabId;
                        setCurrentDepthTabs(mTabCopy.tabsIndex[mTabCopy.tabsIndex[tempTabId].parentId].tabs)
                    } else {
                        // If its another container than recursively find the content id
                        tempTabId = tempTabObj.tabs[tempSTI].tabId;
                    }
                } else {
                    x = false;
                    contentId = tempTabId;
                    setCurrentDepthTabs(mTabCopy.tabsIndex[tempTabObj.parentId].tabs)
                }
            }
        } else {
            // 2. Case if Tab is a component
            contentId = desiredTabId;
            setCurrentDepthTabs(mTabCopy.tabsIndex[mTabCopy.tabsIndex[desiredTabId].parentId].tabs)
        }


        // Find the depth level and update the counter
        _.map(mTabCopy.tabHierarchy, (data, depth) => {
            if(data.includes(contentId)) {
                setCurrentTabDepth(Number(depth));
            }
        })

        setMTabData(mTabCopy);
    };

    /**
     * This function will handle updating the Context with any data changes from the tab.
     * @param {Object} formData Contains all the fields on the tab that are being updated to the Context  
     */
    const handleTabDataUpdate = (formData) => {
        // 007 
        // Update to handle new structure
        let masterCopy = {...masterTabData };
        const currentDepth = findDepthLevel();
        
        if(currentDepth == 0) {
            masterCopy[0].tabs[masterCopy[0].selectedTabIndex].formData = formData;
            
            setParentDepthTabs(masterCopy[0].tabs);
            setCurrentDepthTabs(masterCopy[0].tabs);
        } else {
            const parentTabIndex = masterCopy[currentDepth - 1].selectedTabIndex;
            const currentTabIndex = masterCopy[currentDepth].selectedTabIndex;

            masterCopy[currentDepth].tabs[parentTabIndex][currentTabIndex].formData = formData;
            setCurrentDepthTabs(masterCopy[currentDepth].tabs[parentTabIndex]);
        }
        
        // Update the context with the new data
        setMasterTabData(masterCopy);
    };

    const handleTabClose = (event, tabIndex, cdTabs) => {
        // Stop event from propagating to the target element's parent
        event.stopPropagation()

        let mTabCopy = {...mTabData};
        // May need to find parentID from the master tab data


        let tabToDeletObj = mTabCopy.tabsIndex[cdTabs[tabIndex].tabId];
        let parentTabId = tabToDeletObj.parentId;
        let tabIdToDelete = tabToDeletObj.tabId;

        // 1. Remove from Parent tabs
        if(parentTabId) {
            mTabCopy.tabsIndex[parentTabId].tabs.splice(tabIndex, 1);
        }
        // 2. Remove from tabs Index
        delete mTabCopy.tabsIndex[tabToDeletObj.tabId];
        // 3. Remove from TabHierarchy
        _.map(mTabCopy.tabHierarchy, (data, depth) => {
            if(data.includes(Number(tabToDeletObj.tabId))) {
                _.remove(data, function (n) {
                    return Number(n) == Number(tabToDeletObj.tabId);
                })
            }
        })

        // Update the contexts
        setMTabData(mTabCopy);
        contentDataDelete(tabIdToDelete);
        
        // Update Tab in view
        let tIndex = 0;
        let parentTabs = mTabCopy.tabsIndex[parentTabId].tabs;
        if(parentTabs[tabIndex]) {
            tIndex = tabIndex;
        } else if (parentTabs[tabIndex - 1]) {
            tIndex = tabIndex - 1;
        } else if (parentTabs[tabIndex + 1]) {
            tIndex = tabIndex + 1;
        }
        handleTabChange(tIndex, mTabCopy.tabsIndex[parentTabId].tabs);

    };

    /**
     * This function will handle adding a new Tab that will support sub tabs inside.
     * This function will require you to pass in the an Object with the prop: 'componentType' = 'TabsContainer'
     * @param {Object} props The object containing the tab data. ComponentType key must be 'TabsContainer' and can contain child key to choose what to render inside the initial tab
     */
    const handleAddNewDepthTab = (props) => {
        let masterCopy = { ...masterTabData };
        // let currentDepth = findDepthLevel();
        let currentDepth = props.currentDepthLevel;
        let mTabCopy = { ...mTabData }; 

        // Control to use if you only want to create tabs with a nesting level of 1
        if(props.parentOnly) {
            currentDepth = 0;
        }

        if(currentDepth == 0) {
            let newParentTabIndex = parentDepthTabs.length;

            // Update parent
            mTabCopy.tabsIndex.parent.tabs.push(
                {
                    componentType: props.componentType,
                    content: props.content,
                    formId: props.formId,
                    label: props.label,
                    parentId: 'parent',
                    selectedTabIndex: 0,
                    tabId: props.tabId,
                }
            );
            mTabCopy.tabsIndex.parent.selectedTabIndex = newParentTabIndex;
            // Update hierarchy
            mTabCopy.tabHierarchy[currentDepth].push(props.tabId);
            if(mTabCopy.tabHierarchy[currentDepth + 1]) {
                mTabCopy.tabHierarchy[currentDepth + 1].push(props.child.tabId)
            } else {
                mTabCopy.tabHierarchy[currentDepth + 1] = [props.child.tabId]
            }

            // Add to index
            mTabCopy.tabsIndex[props.tabId] = { 
                tabs: [props.child], 
                selectedTabIndex: 0, 
                parentId: 'parent',
                componentType: props.componentType,
                label: props.label,
            };

            // Add the child to the index

            mTabCopy.tabsIndex[props.child.tabId] = {
                tabs: [], 
                selectedTabIndex: 0, 
                parentId: props.tabId,
                componentType: props.child.componentType,
                label: props.child.label,
            }

            setParentDepthTabs(mTabCopy.tabsIndex.parent.tabs);
            setMTabData(mTabCopy);
            // Show the new child component
            setCurrentDepthTabs([props.child])
            setTabData(props.child.initialState);

            setSelectedTabIndex(newParentTabIndex);
            setCurrentTabDepth(1);
        } else {
            let parentTabId = 0;
            // loop through mTabCopy.tabsIndex.TabID.tabs
            _.map(mTabCopy.tabsIndex, (tabData, tabKey) => {
                if(_.isEqual(tabData.tabs, currentDepthTabs)) {
                    // then we have TabID which is the parent
                    parentTabId = tabKey;
                }
            }) 

            let newTabIndex = mTabCopy.tabsIndex[parentTabId].tabs.length;
            // Update parent
            mTabCopy.tabsIndex[parentTabId].tabs.push(props);
            mTabCopy.tabsIndex[parentTabId].selectedTabIndex = newTabIndex;
            // Update hierarchy
            mTabCopy.tabHierarchy[currentDepth].push(props.tabId);

            let newDepth = Number(currentDepth) + 1;
            if(mTabCopy.tabHierarchy[newDepth]) {
                mTabCopy.tabHierarchy[newDepth].push(props.child.tabId)
            } else {
                mTabCopy.tabHierarchy[newDepth] = [props.child.tabId]
            }

            // Add to index
            mTabCopy.tabsIndex[props.tabId] = { 
                tabs: [props.child], 
                selectedTabIndex: 0, 
                parentId: props.parentTabId,
                componentType: props.componentType,
                tabId: props.tabId,
                label: props.label,
            };

            // Add the child to the index

            mTabCopy.tabsIndex[props.child.tabId] = {
                tabs: [], 
                tabId: props.child.tabId,
                selectedTabIndex: 0, 
                parentId: props.tabId,
                componentType: props.child.componentType,
                label: props.child.label,
            }

            setMTabData(mTabCopy);
            // Show the new child component
            setCurrentDepthTabs([props.child])
            setTabData(props.child.initialState);
;
            setCurrentTabDepth(newDepth);
        }
        
        // Update the store data
        setMasterTabData(masterCopy);
        
        // Set up the new nest row we pass to the tab container for rendering
        setCurrentDepthTabs([props.child]);

        // Update the initial state of the Tab in view
        setTabData(props.initialState);

        // Increment the tab counter by 2 since we added 2 tabs
        setTabId(tabId + 2);
    }

    return (
        <TabsWrapperContext.Provider
            value={{ tabId, mTabData, masterTabData, tabData, selectedTabIndex, currentTabDepth, currentDepthTabs, addNewTab, handleTabChange, handleTabDataUpdate, handleTabClose, handleAddNewDepthTab }}
        >
            <DynamicTabs
                tabs={parentDepthTabs}
                selectedTab={selectedTabIndex}
                onChange={handleTabChange}
            />
            {/* <button onClick={() => {
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
                        depth: 0,
                        tabId: tabId,
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
                            // tabs: parentDepthTabs,
                            tabs: currentDepthTabs,
                            initialState: {},
                            child: {
                                label: "Nested Child",
                                content: "This is a nested tab child",
                                componentType: "",
                                initialState: {},
                                tabId: tabId + 1,
                            },
                            currentDepthLevel: currentTabDepth + 1,
                            // parentOnly: true,
                            tabId: tabId,
                        }
                    )
                }}>
                    Open New Tab with Nested Depth
                </button> */}
        </TabsWrapperContext.Provider>
    );
};

export const useTabsWrapperContext = () => {
    return useContext(TabsWrapperContext);
};