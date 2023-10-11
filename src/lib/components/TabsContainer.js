import React, { useState, useContext, useEffect } from "react";
import DynamicTabs from "./DynamicTabs";
import { useTabsWrapperContext } from "./TabsWrapper";

function LocalTabs({ currentDepthLevel, currentTabDepth, masterTabData, localSTI, setLocalSTI }) {
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
    }, [currentTabDepth, masterTabData, localTabs]);
  
    return (
      <DynamicTabs
        tabs={localTabs}
        selectedTab={localSTI}
        onChange={handleTabChange}
      />
    );
}  

function TabsContainer({props}) {
    const { handleTabChange, currentTabDepth, masterTabData } = useTabsWrapperContext();

    // Local state for the container to keep track of by itself
    const [localTabs, setLocalTabs] = useState([]);
    const [localSTI, setLocalSTI] = useState(0);

    const depthLevel = props.currentDepthLevel;
    // Everytime we change Tab/Depth index we should check / update local tabs state

    useEffect(() => {
        //  if selectedTabIndex at depth level changes then we re-render
        if(depthLevel == 0) {
        // tabs = masterTabData[1].tabs[masterTabData[0].selectedTabIndex];
            if(masterTabData && masterTabData[depthLevel + 1] ) {
                if(localSTI != masterTabData[depthLevel + 1].selectedTabIndex) {
                    setLocalSTI(masterTabData[depthLevel + 1].selectedTabIndex);
                }
            }
        } else {
            if(masterTabData && masterTabData[depthLevel] ) {
            // This condition is making us go back when we have a tab container
                if(localSTI != masterTabData[depthLevel].selectedTabIndex) {
                    setLocalSTI(masterTabData[depthLevel].selectedTabIndex);
                }
            }
        }
    }, [currentTabDepth, masterTabData, localTabs, localSTI])

    return (
        <LocalTabs
            masterTabData={masterTabData}
            localSTI={localSTI}
            currentDepthLevel={depthLevel}
      />
    );
}

export default TabsContainer;
