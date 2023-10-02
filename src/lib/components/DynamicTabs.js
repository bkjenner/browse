import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DynamicComponentRenderer from "./DynamicComponentRenderer";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

import { useTabsWrapperContext } from "./TabsWrapper";

function TabPanel(props) {
    const { children, value, index, onAddTab, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

function DynamicTabs({ tabs, selectedTab }) {
    const { handleTabChange, handleTabClose } = useTabsWrapperContext();

    return (
        <div>
            <Tabs
                value={selectedTab}
                onChange={(event, value) => {
                    handleTabChange(event, value, tabs);
                }}
                aria-label="Dynamic Tabs"
                centered
            >
                {tabs.map((tab, index) => (
                    <Tab 
                        label={
                            <span>
                                {tab.label}
                                <IconButton
                                    component="div"
                                    onClick={(event) => {handleTabClose(event, index)}}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </span>
                        }
                        key={index}
                    />
                ))}
            </Tabs>
            {tabs.map((tab, index) => (
                <TabPanel key={index} value={selectedTab} index={index}>
                    {tab.componentType ? 
                        <DynamicComponentRenderer {...tab} tabKey={index} /> 
                        :
                        <>
                            <p>
                                tab.content
                            </p>
                        </>
                    }
                </TabPanel>
            ))}
        </div>
    );
}

export default DynamicTabs;
