import React from "react";
import TabsContainer from "./TabsContainer";
import { TabsWrapper } from "./TabsWrapper";
import DynamicTabs from "./DynamicTabs";
import TableGridForTab from './DataGridWrapperForTabs';

const ComponentMap = {
    TabsContainer: TabsContainer,
    TabsWrapper: TabsWrapper,
    DynamicTabs: DynamicTabs,
    TableGridForTab: TableGridForTab,
};

export default ComponentMap;
