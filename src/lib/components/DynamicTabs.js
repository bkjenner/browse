import React, { useState } from "react";
import DynamicComponentRenderer from "./DynamicComponentRenderer";
import { useTabsWrapperContext } from "./TabsWrapper";
import { TabView, TabPanel } from 'primereact/tabview';
import { useContentProviderContext } from "../contexts/ContentContext/ContentProvider";

function DynamicTabs({ tabs, selectedTab, tabId}) {
    const { handleTabChange, handleTabClose } = useTabsWrapperContext();
    const { currentContentData } = useContentProviderContext();

    let parentTabId = tabId;
    return (
        <TabView
            activeIndex={selectedTab}
            onTabChange={(event) => {
                handleTabChange(event.index, tabs, parentTabId, currentContentData);
            }}
            // onTabClose={(event) => {
            //     handleTabClose(event.index, tabs, parentTabId, currentContentData);
            // }}
            aria-label="Dynamic Tabs"
        >
            {tabs.map((tab, index) => {
                return (
                    <TabPanel 
                        header={tab.label} 
                        key={tab.tabId} 
                        closable
                    >
                        {tab.componentType ? 
                            <DynamicComponentRenderer 
                                {...tab}
                                tabKey={tab.tabId}
                            /> 
                            :
                            <>
                                <p>
                                    {tab.content}
                                </p>
                            </>
                        }
                    </TabPanel>
                )
            })}
        </TabView>
    );
}

export default DynamicTabs;
