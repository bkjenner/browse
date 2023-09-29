import React, { useState, useContext } from "react";
import DynamicTabs from "./DynamicTabs";
import { useTabsWrapperContext } from "./TabsWrapper";

function TabsContainer() {
    const { tabs, selectedTabIndex, handleTabChange, addNewTab, addRegistrationTab } = useTabsWrapperContext();
    return (
        <div>
            <DynamicTabs
                tabs={tabs}
                selectedTab={selectedTabIndex}
                onChange={handleTabChange}
            />
        </div>
    );
}

export default TabsContainer;
