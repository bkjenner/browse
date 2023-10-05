import React, { useState, useContext, useEffect } from "react";
import DynamicTabs from "./DynamicTabs";
import { useTabsWrapperContext } from "./TabsWrapper";

function TabsContainer() {
    const { cdsti, firstNestedTabs, handleTabChange, currentTabDepth, tabsDepthMap, selectedTabIndex } = useTabsWrapperContext();

    // Local state for the container to keep track of by itself
    const [localTabs, setLocalTabs] = useState([]);
    const [localSTI, setLocalSTI] = useState(0);

    // Everytime we change Tab/Depth index we should check / update local tabs state
    useEffect(() => {
        let tabs = firstNestedTabs[selectedTabIndex];
        if((!_.isEqual(localTabs, tabs))) {
            setLocalTabs([...tabs]);
        }

        if(localSTI != cdsti[currentTabDepth] && tabs.length >= cdsti[currentTabDepth]) {
            setLocalSTI(cdsti[currentTabDepth]);
        }
    }, [selectedTabIndex, cdsti[currentTabDepth]])

    return (
        <DynamicTabs
            tabs={localTabs}
            selectedTab={localSTI}
            onChange={handleTabChange}
        />
    );
}

export default TabsContainer;
