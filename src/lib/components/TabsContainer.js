import React, { useState, useContext, useEffect } from "react";
import DynamicTabs from "./DynamicTabs";
import { useTabsWrapperContext } from "./TabsWrapper";

function TabsContainer() {
    const { cdsti, firstNestedTabs, handleTabChange, currentTabDepth, tabsDepthMap, selectedTabIndex } = useTabsWrapperContext();

    // Local state for the container to keep track of by itself
    const [localTabs, setLocalTabs] = useState([]);

    // Everytime we change Depth index we should check / update local tabs state with what is in map
    useEffect(() => {
        let tabs = firstNestedTabs[selectedTabIndex];
        if((!_.isEqual(localTabs, tabs))) {
            setLocalTabs([...tabs]);
        }
    }, [selectedTabIndex, cdsti[currentTabDepth]])

    return (
        <DynamicTabs
            tabs={localTabs}
            selectedTab={cdsti[currentTabDepth]}
            onChange={handleTabChange}
        />
    );
}

export default TabsContainer;
