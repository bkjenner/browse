import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { AutoComplete } from "primereact/autocomplete";
import DataGrid from "./DataGrid.js";
import { useTabsWrapperContext } from "./TabsWrapper.js";
import { useContentProviderContext } from "../contexts/ContentContext/ContentProvider.js";
import { getActivities, getActivityTypes, getActivityProjects, getActivitiesByType, getActivitiesByProject } from "lib/hooks/activity";

import moment from "moment";

export default function ActivityBrowse(props) {
    const { selectedTabIndex, currentTabDepth, tabId, addNewTab, handleAddNewDepthTab, currentDepthTabs } = useTabsWrapperContext();
    const { contentDataUpdate, currentContentData } = useContentProviderContext();

    const [rowData, setRowData] = useState(null);
    const [columnHeaderMap, setColumnHeaderMap] = useState(null);
    const [loading, setLoading] = useState(true);
    const [columnFromRowData, setColumnData] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState([]);
    const [pageSize, setPageSize] = useState(100);
    const [layoutMetaUpdate, setLayoutMetaUpdate] = useState({}); // tie to useEffect to trigger re-render table layout

    useEffect(() => {
        if (
            !(currentContentData && currentContentData.rowDataForTab && _.isEqual(rowData, currentContentData.rowDataForTab)) &&
            props.tabKey == currentContentData.tabId
        ) {
            contentDataUpdate({
                ...currentContentData,
                rowDataForTab: rowData,
                tabId: props.tabKey,
                currentTabDepth: currentTabDepth,
                tabs: currentDepthTabs,
            });
        }
    }, [rowData]);

    const fetchData = () => {
        axios.get(`/action/activityBrowse?p_metadata=true&p_pagesize=${pageSize}`).then((response) => {
            let res = response.data && response.data.activities ? response.data.activities : response.data;
            let columnHeaderMapping = response.data && response.data.metadata ? response.data.metadata : [];

            setColumnHeaderMap(columnHeaderMapping);
            setRowData(res);
            setLoading(false);
            contentDataUpdate({
                ...currentContentData,
                rowDataForTab: res,
                columnHeaderMapping: columnHeaderMapping,
                tabId: props.tabKey,
                currentTabDepth: currentTabDepth,
                tabs: currentDepthTabs,
            });
        });
    };

    const { data: activities } = getActivities();
    const { data: types } = getActivityTypes();
    const { data: projects } = getActivityProjects();

    const [selectedActivityType, setSelectedActivityType] = useState(null);
    const [selectedActivityProject, setSelectedActivityProject] = useState(null);
    const [filteredTypes, setFilteredTypes] = useState(null);
    const [filteredProjects, setFilteredProjects] = useState(null);

    const typeSearch = (event) => {
        if (!event.query.trim().length) {
            setFilteredTypes(types);
        } else {
            setFilteredTypes(
                _.filter(types, (type) => {
                    return type.description.toLowerCase().startsWith(event.query.toLowerCase());
                }),
            );
        }
    };

    const projectSearch = (event) => {
        if (!event.query.trim().length) {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(
                _.filter(projects, (project) => {
                    return project.description.toLowerCase().startsWith(event.query.toLowerCase());
                }),
            );
        }
    };

    const { data: activitiesByType, isLoading: typesLoading } = getActivitiesByType(selectedActivityType?.id);
    const { data: activitiesByProject, isLoading: projectsLoading } = getActivitiesByProject(selectedActivityProject?.id);

    useEffect(() => {
        if (currentContentData && currentContentData.rowDataForTab && currentContentData.rowDataForTab.length > 0) {
            setColumnHeaderMap(currentContentData.columnHeaderMapping ? currentContentData.columnHeaderMapping : []);
            setRowData(currentContentData.rowDataForTab);
            setLoading(false);
        } else {
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (activities) {
            setRowData(activities);
        }
    }, activities);

    useEffect(() => {
        if (activitiesByType) {
            setRowData(activitiesByType);
        } else {
            setRowData(activities);
        }
    }, [activitiesByType, activities]);

    useEffect(() => {
        if (activitiesByProject) {
            setRowData(activitiesByProject);
        } else {
            setRowData(activities);
        }
    }, [activitiesByProject, activities]);

    const dataTableSaveLayout = (state) => {
        if (
            !(currentContentData && currentContentData.layoutMeta && _.isEqual(state, currentContentData.layoutMeta)) &&
            props.tabKey == currentContentData.tabId
        ) {
            contentDataUpdate({
                ...currentContentData,
                layoutMeta: state,
                currentTabDepth: currentTabDepth,
                tabs: currentDepthTabs,
            });
        }
    };

    const dataTableLoadLayout = () => {
        if (currentContentData && currentContentData.layoutMeta) {
            return currentContentData.layoutMeta;
        } else {
            return {};
        }
    };

    const cdl = currentTabDepth;

    return (
        <div className="grid flex-grow-1 flex-direction-col">
            <div className="col-12">
                <h1>Activity Browse</h1>
            </div>
            <div className="grid flex">
                <div className="col-6">
                    <span className="p-float-label">
                        <AutoComplete
                            inputId="activity-type"
                            field="description"
                            value={selectedActivityType}
                            suggestions={filteredTypes}
                            completeMethod={typeSearch}
                            onChange={(e) => setSelectedActivityType(e.value)}
                            forceSelection
                            dropdown
                        />
                        <label htmlFor="activity-type">Activity Type</label>
                    </span>
                </div>
                <div className="col-6">
                    <span className="p-float-label">
                        <AutoComplete
                            inputId="activity-project"
                            field="description"
                            value={selectedActivityProject}
                            suggestions={filteredProjects}
                            completeMethod={projectSearch}
                            onChange={(e) => setSelectedActivityProject(e.value)}
                            forceSelection
                            dropdown
                        />
                        <label htmlFor="activity-project">Activity Project</label>
                    </span>
                </div>
            </div>
            <div className="col-12">
                <DataGrid
                    rowDataValue={rowData}
                    updateRowData={setRowData}
                    columnHeaderMap={columnHeaderMap}
                    loading={loading}
                    emptyMessage="No Activities Found."
                    dataKey="id"
                    layoutMeta={layoutMetaUpdate}
                    dataTableSaveLayout={dataTableSaveLayout}
                    dataTableLoadLayout={dataTableLoadLayout}
                    stateStorage="custom"
                    tableOtherProps={{
                        showGridlines: true,
                        scrollable: true,
                        reorderableColumns: true,
                        reorderableRows: true,
                        resizableColumns: true,
                        columnResizeMode: "expand",
                        tableStyle: { minWidth: "50rem" },
                        removableSort: true,
                        sortMode: "multiple",
                        rows: 100,
                        rowsPerPageOptions: [5, 10, 25, 50, 100, 500],
                        paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
                        currentPageReportTemplate: "{first} to {last} of {totalRecords}",
                    }}
                    showSaveLayoutButton={true}
                    saveLayoutRule="primeReactTableSaveLayout"
                    showLoadLayoutDropDown={true}
                    loadLayoutRule="primeReactTableFetchLayout"
                />
            </div>
        </div>
    );
}
