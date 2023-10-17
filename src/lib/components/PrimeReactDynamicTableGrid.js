import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Button } from "primereact/button";

import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

import { useTabsWrapperContext } from "./TabsWrapper";
import { useContentProviderContext } from "../contexts/ContentContext/ContentProvider";

import moment from "moment";

export default function PrimeReactDynamicTableGrid({props}) {   
    
    const { selectedTabIndex, currentTabDepth, tabId, addNewTab, handleAddNewDepthTab, currentDepthTabs } = useTabsWrapperContext();
    const { contentDataUpdate, currentContentData } = useContentProviderContext();
    // Initial State
    // Used whenever we create a new form
    const initialState = {
        noUseInitialStateHolder:'incase overwite existing data when switching tabs'
    }

    const dataTableRef = useRef(null);

    const [rowData, setRowData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [columnFromRowData, setColumnData] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState([]);

    const [exportColumns, setExportColumns] = useState([]); //data for export function

    // const [layoutMeta, setLayoutMeta] = useState({}); // dataTableLoadLayout default layout when first loading, 
    // //also get updated in every render by customSaveState
    // switch to use a simple variable to hold the layout data instead,
    let layoutMeta ={};
    let columnHeaderMap;

    const [layoutMetaUpdate, setLayoutMetaUpdate] = useState({}); // tie to useEffect to trigger re-render table layout

    useEffect(() => {
        // console.log("layoutMetaUpdate useEffect");
        // console.log(layoutMetaUpdate);
        if (dataTableRef.current) {
            dataTableRef.current.restoreState(); // the built-in restoreState() function would trigger re-render layout
        }
    }, [layoutMetaUpdate]);


    useEffect(() => {
        console.log('currentContentData');
        console.log(currentContentData);
        // try to load data from context first,
        // if no data in context, like initial load, call rule to fetch data from 
        if(
            currentContentData && currentContentData.rowDataForTab 
            && currentContentData.rowDataForTab.length>0
        ){
            console.log("loading existing data from tab context");

            let res = currentContentData.rowDataForTab;
            columnHeaderMap = currentContentData.columnHeaderMapping 
                ? currentContentData.columnHeaderMapping
                : [];

            setRowData(res);
            setLoading(false);
            let columnObjectArray = [];
            if (typeof res === "object" && res != null) {
                // console.log("passed in nested json");
                // console.log(data);
                // if data passed in in in nested json:
                columnObjectArray = getColumnsThroughLoopArrayJSON(res, columnHeaderMap);
                // console.log(columnNames);
                setColumnData(columnObjectArray);
                setVisibleColumns(columnObjectArray); // initially display all columns
                // setExportColumns(columnObjectArray.map((col) => ({ title: col.header, dataKey: col.field })));
            } else {
                console.log("No Column rendered. \nNeed JSON or JSON Array to render columns");
            }
        }
        else{
            console.log("initial fetching");
            fetchRowData();
        };
    }, []);

    const fetchRowData = () => {
        let recordsNum = 10 + parseInt(moment().local().format("ss"));
        console.log('should fetch ' + recordsNum + ' records');
        axios.get(`/action/activityBrowse?p_metadata=true&p_pagesize=${recordsNum}`).then((response) => {
            // console.log(response.data);
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
            })
            let columnObjectArray = [];
            if (typeof res === "object" && res != null) {
                console.log("passed in nested json");
                // console.log(data);
                // if data passed in in in nested json:
                columnObjectArray = getColumnsThroughLoopArrayJSON(res, columnHeaderMap);
                // console.log(columnNames);
                setColumnData(columnObjectArray);
                setVisibleColumns(columnObjectArray); // initially display all columns
                // setExportColumns(columnObjectArray.map((col) => ({ title: col.header, dataKey: col.field })));
            } else {
                console.log("No Column rendered. \nNeed JSON or JSON Array to render columns");
            }
        });
    };

    const clearState = () => {
        console.log("ClearStateClick");
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
                console.log("left button clicked");
                fetchRowData();
                clearState()
            }}
        />
    );
    const paginatorRight = <Button type="button" icon="pi pi-download" text onClick={(e) => console.log(rowData)} />;

    const onColumnToggle = (event) => {
        // @TODO
        // console.log(columnFromRowData);
        let selectedColumns = event.value;
        // console.log(selectedColumns);
        let orderedSelectedColumns = columnFromRowData.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

        setVisibleColumns(orderedSelectedColumns);
    };

    const header = (
        <>
            {/* <div className="flex align-items-center justify-content-start gap-2" >
                <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                <Button type="button" label="Save" icon="pi pi-check" onClick={saveLayout} />
                <br/>
            </div> */}
            <MultiSelect
                value={visibleColumns}
                options={columnFromRowData}
                optionLabel="header"
                onChange={onColumnToggle}
                className="w-full sm:w-20rem"
                display="chip"
            />
        </>
    );



    const [statuses] = useState(["Active", "Inactive"]);


    // original data returned from sequelize could be an array(findAll) or one json(findOne)
    // columnNames as a guide
    // columnObjectArray: to extrat and save columns into [{ key: 'name', field: 'name', header: 'Name' } , ...] format
    const getColumnsThroughLoopArrayJSON = (obj, columnHeaderMap, columnNames = [], parentKey = null, columnObjectArray = []) => {
        if (Array.isArray(obj)) {
            // loop through array
            for (let i = 0; i < obj.length; i++) {
                getColumnsThroughLoopArrayJSON(obj[i], columnHeaderMap, columnNames, parentKey, columnObjectArray); // when looping array, array element use entire array object's key as parent key
            }
        } else {
            for (let key in obj) {
                if (typeof obj[key] === "object") {
                    if (Array.isArray(obj[key])) {
                        // loop through array
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
                    // not displaying columns that are null in all rows
                    if (obj[key] !== null) {
                        // For id field, not showing any foreigh key id, only showing highest level's id (id without parent key)
                        if (parentKey != null && parentKey != "" && key != "id") {
                            if (!columnNames.includes(parentKey + "." + key)) {
                                columnNames.push(parentKey + "." + key);

                                // in case need to handle nesting data, currently NOT having them with PG db
                                let headerObj = _.find(columnHeaderMap, ['columnname', parentKey + "." + key]); 

                                columnObjectArray.push({
                                    key: parentKey + "." + key,
                                    field: parentKey + "." + key,
                                    header: headerObj && headerObj.heading && headerObj.heading != "null" 
                                            ? headerObj.heading 
                                            : parentKey + "." + key,
                                    // header: parentKey + "." + key,
                                });
                            }
                        } else {
                            if (!columnNames.includes(key)) {
                                columnNames.push(key);

                                let headerObj = _.find(columnHeaderMap, ['columnname', key]); 

                                columnObjectArray.push({
                                    key: key,
                                    field: key,
                                    header: headerObj && headerObj.heading && headerObj.heading!='null' 
                                            ? headerObj.heading 
                                            : key,
                                    // header: key,
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
        // let columnNames = [];
        // let columnObjectArray = [];
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

        console.log("dataTableSaveLayout");
        

        layoutMeta = state;
        // only update the context if the the layout meta is diffferent, otherwise would be looping
        if(
            !(currentContentData && currentContentData.layoutMeta && _.isEqual(layoutMeta, currentContentData.layoutMeta))
            && props.tabKey == currentContentData.tabId
        ){
            console.log(state);
            contentDataUpdate({ 
                ...currentContentData, 
                layoutMeta: layoutMeta,
                // tabId: props.tabKey,
                currentTabDepth: currentTabDepth,
                tabs: currentDepthTabs,
            }); 
        }
    };

    const dataTableLoadLayout = () => {
        // also handles the initial loading layoutMeta
        
        // console.log(layoutMetaUpdate);

        // check if tab context already has layoutMeta
        if(currentContentData && currentContentData.layoutMeta){
            console.log("loading layout from tab currentContentData");
            return currentContentData.layoutMeta;
        }
        else{
            console.log("loading layout from layoutMetaUpdate");
            
            contentDataUpdate({ 
                ...currentContentData, 
                layoutMeta: layoutMetaUpdate,
                // tabId: props.tabKey,
                currentTabDepth: currentTabDepth,
                tabs: currentDepthTabs,
            }); 
            
            return layoutMetaUpdate;
        }
    };
    const loadLayout1 = () => {
        console.log("loading saved layout 1");
        // console.log(layoutMeta);

        let layout = {
            first: 0,
            rows: 7,
            multiSortMeta: [],
            columnOrder: [],
        };

        contentDataUpdate({ 
            ...currentContentData, 
            layoutMeta: layout,
            tabId: props.tabKey,
            currentTabDepth: currentTabDepth,
            tabs: currentDepthTabs,
        }); 

        
        // the useEffect would trigger layout re-load based on data in layoutMetaUpdate
        setLayoutMetaUpdate(layout); 
    };

    const onRowReorder = (e) =>{

        // row data directly to table
        setRowData(e.value);
        
        contentDataUpdate({ 
            ...currentContentData, 
            rowDataForTab: e.value,
            tabId: props.tabKey,
            currentTabDepth: currentTabDepth,
            tabs: currentDepthTabs,
        });
    };
    const cdl = currentTabDepth;
    return (
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                <div>
                <Button onClick={() => {
                    addNewTab(
                        {
                            label: "Table Grid",
                            content: "",
                            componentType: "TableGrid",
                            initialState: initialState,
                            tabs: currentDepthTabs,
                            depth: currentTabDepth,
                            tabId: tabId,
                            currentDepthLevel: cdl,
                        }
                    )
                }}>
                    Open New Same Depth Tab
                </Button>
                <Button onClick={(event) => {
                    handleAddNewDepthTab(
                        {
                            label: tabId,
                            content: "",
                            componentType: "TabsContainer",
                            initialState: {},
                            child: {
                                label: `${tabId + 1}`,
                                content: "",
                                componentType: "TableGrid",
                                initialState: {},
                                tabId: tabId + 1,
                            },
                            tabId: tabId,
                            currentDepthLevel: cdl,
                        }
                    )
                }}>
                    Open New Tab with Nested Depth
                </Button>
            </div>
                </Grid>
                    
                <Grid item xs={12}>
                    <h1>PrimeReact Grid Component</h1>
                </Grid>

                <Grid item xs={12}>
                    <Button type="button" label="Test Load Saved Layout1" icon="pi pi-check" onClick={loadLayout1} />
                </Grid>
                <Grid item xs={11}>
                    <Grid item xs={12}>
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
                                // scrollHeight="400px"
                                tableStyle={{ minWidth: "50rem" }}
                                header={header} // table's header, (above the row header)
                                // headerColumnGroup={headerGroup}
                                paginator
                                rows={5}
                                rowsPerPageOptions={[10, 25, 50, 100, 500]}
                                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                paginatorLeft={paginatorLeft}
                                paginatorRight={paginatorRight}
                                removableSort
                                sortMode="multiple" //requires metaKey (e.g. ⌘) to be pressed when clicking second column header.
                                // sortField="member.registeredname" // initial sorting
                                // sortOrder={-1}
                                // filters={filters}
                                // filterDisplay="row"
                                loading={loading}
                                // globalFilterFields={['member.registeredname', 'member.memberstatus.description', 'member.membersubstatus.description', 'member.firstmembcountrydate']}
                                emptyMessage="No Member found."
                                stateStorage="custom"
                                customSaveState={dataTableSaveLayout} // run every render
                                
                                // wrapped in restoreState(), 
                                // which run on initial Mount ( mapped inside a useEffect(...,[]) ) 
                                // or directly call restoreState() to re-render layout
                                customRestoreState={dataTableLoadLayout} 

                                stateKey="dt-state-demo-local"
                            >
                                <Column rowReorder style={{ width: "1rem" }} frozen />
                                {renderDynamicColumns(visibleColumns)}
                            </DataTable>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="button"
                            label="Save Current Layout"
                            icon="pi  pi-download"
                            onClick={(e) => {
                                let key = moment().local().format("YYYYMMDDHHmmss");
                                console.log("saving to cache " + key);
                                console.log(layoutMeta);
                                axios.post("/action/primeReactTableSaveLayout", {
                                    key,
                                    layoutMeta,
                                });
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
