import React, { useState, useContext, useEffect } from "react";
import DynamicTabs from "./DynamicTabs";
import { useTabsWrapperContext } from "./TabsWrapper";


/**
 * This component renders the tabs at the depth level that is passed in.
 * A separate component is used so each depth level has a local state.
 * 
 * @param {int} currentDepthLevel   The depth level the tabs are to be rendered on
 * @param {int} localSTI            The index for which tab is to be shown
 * @param {Object} masterTabData    Contains all the data on Tabs
 * @returns {JSX.Element}           Returns the JSX for the Tabs to be rendered 
 */
function LocalTabs({ currentDepthLevel, masterTabData, localSTI, tabContainerId }) {
    const [localTabs, setLocalTabs] = useState([]);
    const { handleTabChange, mTabData, forceTabRerender, resetRerender } = useTabsWrapperContext();
  
    let tabs;
    useEffect(() => {

      if (currentDepthLevel === 0) {
        tabs = mTabData.tabsIndex.parent.tabs;
      } else {
        if(mTabData.tabsIndex[tabContainerId]) {
          tabs = mTabData.tabsIndex[tabContainerId].tabs;
        }
      }
      if (!_.isEqual(localTabs, tabs) && tabs) {
        setLocalTabs([...tabs]);
      }

      resetRerender();
    }, [masterTabData, localTabs, mTabData, forceTabRerender]);
  
    return (
      <DynamicTabs
        tabs={localTabs}
        selectedTab={localSTI}
        onChange={handleTabChange}
      />
    );
}

/**
 * This component is a container that acts a wrapper for each depth level of tabs.
 * 
 * @param {Object} props Contains data on the tab to render. CurrentDepthLevel is a key to tell what depth level to render the container on
 * @returns {JSX.Element} Returns the LocalTabs component that renders the tabs on the page
 */
function TabsContainer({props}) {
    // Local state for the container to keep track of by itself
    const [localSTI, setLocalSTI] = useState(0);
    const depthLevel = props.currentDepthLevel + 1;
    
    const { currentTabDepth, masterTabData, mTabData } = useTabsWrapperContext();
    
    useEffect(() => {
        if(depthLevel == 0) {
            if(mTabData && mTabData.tabsIndex.parent ) {
                if(localSTI != mTabData.tabsIndex.parent.selectedTabIndex) {
                    setLocalSTI(mTabData.tabsIndex.parent.selectedTabIndex);
                }
            }
        } else {
            if(mTabData.tabsIndex && mTabData.tabsIndex[props.tabId]) {
                if(localSTI != mTabData.tabsIndex[props.tabId].selectedTabIndex) {
                    setLocalSTI(mTabData.tabsIndex[props.tabId].selectedTabIndex);
                }
            }
        }

        if(mTabData.tabsIndex[props.tabId] && mTabData.tabsIndex[props.tabId].selectedTabIndex != localSTI) {
          setLocalSTI(mTabData.tabsIndex[props.tabId].selectedTabIndex);
        }
    }, [currentTabDepth, masterTabData, localSTI, mTabData])

    return (
        <LocalTabs
            mTabData={mTabData}
            masterTabData={masterTabData}
            localSTI={localSTI}
            currentDepthLevel={depthLevel}
            tabContainerId={props.tabId}
        />
    );
}

export default TabsContainer;