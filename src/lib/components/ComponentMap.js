import React from "react";
import TabsContainer from "./TabsContainer";
import { TabsWrapper } from "./TabsWrapper";
import DynamicTabs from "./DynamicTabs";
import TableGridForTab from "./DataGridWrapperForTabs";
import ActivityBrowse from "./ActivityBrowse";
import EditForm from './EditForm';

const ComponentMap = {
    TabsContainer: TabsContainer,
    TabsWrapper: TabsWrapper,
    // DynamicTabs: DynamicTabs,
    TableGridForTab: TableGridForTab,
    ActivityBrowse: ActivityBrowse,
    EditForm: EditForm,
};

export default ComponentMap;
