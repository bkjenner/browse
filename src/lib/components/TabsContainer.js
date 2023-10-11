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
function LocalTabs({ currentDepthLevel, masterTabData, localSTI }) {
    const [localTabs, setLocalTabs] = useState([]);
    const { handleTabChange } = useTabsWrapperContext();
  
    useEffect(() => {
      let tabs;
      if (currentDepthLevel === 0) {
        tabs = masterTabData[1].tabs[masterTabData[0].selectedTabIndex];
      } else {
        tabs = masterTabData[currentDepthLevel].tabs[masterTabData[currentDepthLevel - 1].selectedTabIndex];
      }
  
      if (!_.isEqual(localTabs, tabs)) {
        setLocalTabs([...tabs]);
      }
    }, [masterTabData, localTabs]);
  
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
    const depthLevel = props.currentDepthLevel;
    
    const { currentTabDepth, masterTabData } = useTabsWrapperContext();
    
    useEffect(() => {
        if(depthLevel == 0) {
            if(masterTabData && masterTabData[depthLevel + 1] ) {
                if(localSTI != masterTabData[depthLevel + 1].selectedTabIndex) {
                    setLocalSTI(masterTabData[depthLevel + 1].selectedTabIndex);
                }
            }
        } else {
            if(masterTabData && masterTabData[depthLevel] ) {
                if(localSTI != masterTabData[depthLevel].selectedTabIndex) {
                    setLocalSTI(masterTabData[depthLevel].selectedTabIndex);
                }
            }
        }
    }, [currentTabDepth, masterTabData, localSTI])

    return (
        <LocalTabs
            masterTabData={masterTabData}
            localSTI={localSTI}
            currentDepthLevel={depthLevel}
      />
    );
}

export default TabsContainer;