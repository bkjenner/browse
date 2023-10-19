import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { useTabsWrapperContext } from "./TabsWrapper";
import { useContentProviderContext } from "lib/contexts/ContentContext/ContentProvider";
import moment from "moment";

export default function DataGrid(props) {
    const { selectedTabIndex, currentTabDepth, tabId, addNewTab, handleAddNewDepthTab, currentDepthTabs } = useTabsWrapperContext();
    const { contentDataUpdate, currentContentData } = useContentProviderContext();
    const initialState = {
        noUseInitialStateHolder: "incase overwite existing data when switching tabs",
    };

    const dataTableRef = useRef(null);
    const [rowData, setRowData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [columnFromRowData, setColumnData] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState([]);
    const [layoutOptions, setLayoutOptions] = useState(null);
    const [selectedLayout, setSelectedLayout] = useState(null);
    const [exportColumns, setExportColumns] = useState([]);

    let layoutMeta = {};
    let columnHeaderMap;

    const [layoutMetaUpdate, setLayoutMetaUpdate] = useState({});

    useEffect(() => {
        if (dataTableRef.current) {
            dataTableRef.current.restoreState();
        }
    }, [layoutMetaUpdate]);

    const fetchAllLayout = () => {
        axios.get(`/action/primeReactTableFetchLayout`).then((response) => {
            if (response.data && response.data.length > 0) {
                setLayoutOptions(response.data);
            }
        });
    };

    useEffect(() => {
        fetchAllLayout();
    }, []);

    useEffect(() => {
        if (currentContentData && currentContentData.rowDataForTab && currentContentData.rowDataForTab.length > 0) {
            let res = currentContentData.rowDataForTab;
            columnHeaderMap = currentContentData.columnHeaderMapping ? currentContentData.columnHeaderMapping : [];

            setRowData(res);
            setLoading(false);
            let columnObjectArray = [];
            if (typeof res === "object" && res != null) {
                columnObjectArray = getColumnsThroughLoopArrayJSON(res, columnHeaderMap);
                setColumnData(columnObjectArray);
                setVisibleColumns(columnObjectArray); // initially display all columns
            }
        } else {
            fetchRowData();
        }
    }, []);

    const fetchRowData = () => {
        let recordsNum = 10 + parseInt(moment().local().format("ss"));
        axios.get(`/action/activityBrowse?p_metadata=true&p_pagesize=${recordsNum}`).then((response) => {
            let res = response.data && response.data.activities ? response.data.activities : response.data;
            columnHeaderMap = response.data && response.data.metadata ? response.data.metadata : [];
            setRowData(res);
            setLoading(false);
            contentDataUpdate({
                ...currentContentData,
                rowDataForTab: res,
                columnHeaderMapping: columnHeaderMap,
                tabId: props.tabKey,
                currentTabDepth: currentTabDepth,
                tabs: currentDepthTabs,
            });
            let columnObjectArray = [];
            if (typeof res === "object" && res != null) {
                columnObjectArray = getColumnsThroughLoopArrayJSON(res, columnHeaderMap);

                setColumnData(columnObjectArray);
                setVisibleColumns(columnObjectArray); // initially display all columns
            }
        });
    };

    const clearState = () => {
        setLayoutMetaUpdate({
            first: 0,
            rows: 10,
            multiSortMeta: [],
            columnOrder: [],
        });
    };

    const paginatorLeft = (
        <Button
            type="button"
            icon="pi pi-refresh"
            text
            onClick={(e) => {
                fetchRowData();
                clearState();
            }}
        />
    );
    const paginatorRight = <Button type="button" icon="pi pi-download" text onClick={(e) => console.log(rowData)} />;

    const onColumnToggle = (event) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columnFromRowData.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

        setVisibleColumns(orderedSelectedColumns);
    };

    const header = (
        <div className="grid flex">
            <div className="col-3">
                <MultiSelect
                    value={visibleColumns}
                    options={columnFromRowData}
                    optionLabel="header"
                    onChange={onColumnToggle}
                    className="w-full sm:w-20rem"
                    display="chip"
                />
            </div>
            <div className="col-3">
                <span className="p-input-icon-left w-full sm:w-20rem">
                    <i className="pi pi-search" />
                    <InputText placeholder="Activity Type" />
                </span>
            </div>
            <div className="col-3">
                <span className="p-input-icon-left w-full sm:w-20rem">
                    <i className="pi pi-search" />
                    <InputText placeholder="Activity Project" />
                </span>
            </div>
        </div>
    );

    // original data returned from sequelize could be an array(findAll) or one json(findOne)
    // columnNames as a guide
    // columnObjectArray: to extrat and save columns into [{ key: 'name', field: 'name', header: 'Name' } , ...] format
    const getColumnsThroughLoopArrayJSON = (obj, columnHeaderMap, columnNames = [], parentKey = null, columnObjectArray = []) => {
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                getColumnsThroughLoopArrayJSON(obj[i], columnHeaderMap, columnNames, parentKey, columnObjectArray); // when looping array, array element use entire array object's key as parent key
            }
        } else {
            for (let key in obj) {
                if (typeof obj[key] === "object") {
                    if (Array.isArray(obj[key])) {
                        for (let i = 0; i < obj[key].length; i++) {
                            getColumnsThroughLoopArrayJSON(obj[key], columnHeaderMap, columnNames, parentKey, columnObjectArray); // when looping array, array element use entire array object's key as parent key
                        }
                    } else {
                        if (parentKey != null && parentKey != "") {
                            getColumnsThroughLoopArrayJSON(obj[key], columnHeaderMap, columnNames, parentKey + "." + key, columnObjectArray);
                        } else {
                            getColumnsThroughLoopArrayJSON(obj[key], columnHeaderMap, columnNames, key, columnObjectArray);
                        }
                    }
                } else {
                    if (obj[key] !== null) {
                        if (parentKey != null && parentKey != "" && key != "id") {
                            if (!columnNames.includes(parentKey + "." + key)) {
                                columnNames.push(parentKey + "." + key);

                                let headerObj = _.find(columnHeaderMap, ["columnname", parentKey + "." + key]);

                                columnObjectArray.push({
                                    key: parentKey + "." + key,
                                    field: parentKey + "." + key,
                                    header: headerObj && headerObj.heading && headerObj.heading != "null" ? headerObj.heading : parentKey + "." + key,
                                });
                            }
                        } else {
                            if (!columnNames.includes(key)) {
                                columnNames.push(key);

                                let headerObj = _.find(columnHeaderMap, ["columnname", key]);

                                columnObjectArray.push({
                                    key: key,
                                    field: key,
                                    header: headerObj && headerObj.heading && headerObj.heading != "null" ? headerObj.heading : key,
                                });
                            }
                        }
                    }
                }
            }
        }
        return columnObjectArray;
    };

    const columnBodyFormatter = (data, options) => {
        let res = _.get(data, options.field); //_.get(object, 'a[0].b.c');
        if (options.field.slice(-4) == "date" && moment.isMoment(moment(res))) {
            return moment(res).format("YYYY-MM-DD");
        }
        // can add more case here here to handle different data
        else {
            return res;
        }
    };

    const renderDynamicColumns = (columnOjectArrays) => {
        let columns = [];

        columnOjectArrays.forEach((ele) => {
            columns.push(
                <Column
                    key={ele.key}
                    field={ele.field}
                    header={ele.header}
                    sortable
                    body={columnBodyFormatter} // using default parameters: (data: any, options: ColumnBodyOptions)
                ></Column>,
            );
        });

        return columns;
    };

    const dataTableSaveLayout = (state) => {
        layoutMeta = state;
        if (
            !(currentContentData && currentContentData.layoutMeta && _.isEqual(layoutMeta, currentContentData.layoutMeta)) &&
            props.tabKey == currentContentData.tabId
        ) {
            contentDataUpdate({
                ...currentContentData,
                layoutMeta: layoutMeta,
                currentTabDepth: currentTabDepth,
                tabs: currentDepthTabs,
            });
        }
    };

    const dataTableLoadLayout = () => {
        if (currentContentData && currentContentData.layoutMeta) {
            return currentContentData.layoutMeta;
        } else {
            contentDataUpdate({
                ...currentContentData,
                layoutMeta: layoutMetaUpdate,
                currentTabDepth: currentTabDepth,
                tabs: currentDepthTabs,
            });

            return layoutMetaUpdate;
        }
    };

    const onRowReorder = (e) => {
        setRowData(e.value);

        contentDataUpdate({
            ...currentContentData,
            rowDataForTab: e.value,
            tabId: props.tabKey,
            currentTabDepth: currentTabDepth,
            tabs: currentDepthTabs,
        });
    };

    const selectLayout = (e) => {
        setSelectedLayout(e.value); // for dropDown itselt to display selected option

        contentDataUpdate({
            ...currentContentData,
            layoutMeta: e.value,
            tabId: props.tabKey,
            currentTabDepth: currentTabDepth,
            tabs: currentDepthTabs,
        });

        setLayoutMetaUpdate(e.value);
    };

    const cdl = currentTabDepth;

    return (
        <div className="grid flex-grow-1">
            <div className="col-12">
                <div className="col-12">
                    <div>
                        <Button
                            onClick={() => {
                                addNewTab({
                                    label: "New form",
                                    componentType: "DataGrid",
                                    initialState: initialState,
                                    tabs: currentDepthTabs,
                                    depth: currentTabDepth,
                                    tabId: tabId,
                                    currentDepthLevel: cdl,
                                });
                            }}
                        >
                            Open New Same Depth Tab
                        </Button>
                        <Button
                            onClick={(event) => {
                                handleAddNewDepthTab({
                                    label: tabId,
                                    content: "",
                                    componentType: "TabsContainer",
                                    initialState: {},
                                    child: {
                                        label: `${tabId + 1}`,
                                        content: "",
                                        componentType: "DataGrid",
                                        initialState: {},
                                        tabId: tabId + 1,
                                    },
                                    tabId: tabId,
                                    currentDepthLevel: cdl,
                                });
                            }}
                        >
                            Open New Tab with Nested Depth
                        </Button>
                    </div>
                </div>
                <div className="col-12">
                    <Dropdown
                        value={selectedLayout}
                        onChange={selectLayout}
                        options={layoutOptions}
                        optionLabel="name"
                        placeholder="Select a Layout"
                        className="w-full md:w-14rem"
                    />
                </div>
                <div className="col-12">
                    <div className="col-12">
                        <div className="card">
                            <DataTable
                                ref={dataTableRef}
                                value={rowData}
                                showGridlines
                                dataKey="id"
                                scrollable
                                reorderableColumns
                                reorderableRows // need an extra column to be dragable
                                onRowReorder={onRowReorder} // re-order rows by saving RowData array in that order
                                resizableColumns
                                columnResizeMode="expand"
                                tableStyle={{ minWidth: "50rem" }}
                                header={header} // table's header, (above the row header)
                                paginator
                                rows={5}
                                rowsPerPageOptions={[10, 25, 50, 100, 500]}
                                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                paginatorLeft={paginatorLeft}
                                paginatorRight={paginatorRight}
                                removableSort
                                sortMode="multiple" //requires metaKey (e.g. ⌘) to be pressed when clicking second column header.
                                loading={loading}
                                emptyMessage="No Member found."
                                stateStorage="custom"
                                customSaveState={dataTableSaveLayout} // run every render
                                customRestoreState={dataTableLoadLayout}
                                stateKey="dt-state-demo-local"
                            >
                                <Column rowReorder style={{ width: "1rem" }} frozen />
                                {renderDynamicColumns(visibleColumns)}
                            </DataTable>
                        </div>
                    </div>
                    <div className="col-12">
                        <Button
                            type="button"
                            label="Save Current Layout"
                            icon="pi  pi-download"
                            onClick={(e) => {
                                let layoutName = moment().local().format("YYYYMMDDHHmmss");
                                axios
                                    .post("/action/primeReactTableSaveLayout", {
                                        layoutName,
                                        layoutMeta,
                                    })
                                    .then(() => {
                                        fetchAllLayout();
                                        setSelectedLayout(layoutMeta);
                                    });
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
