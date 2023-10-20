import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";

import  DataGrid  from "./DataGrid.js";
import { useTabsWrapperContext } from "./TabsWrapper.js";
import { useContentProviderContext } from "../contexts/ContentContext/ContentProvider.js";

import moment from "moment";

export default function DataGridWrapperForTabs(props) {   
    
    const { selectedTabIndex, currentTabDepth, tabId, addNewTab, handleAddNewDepthTab, currentDepthTabs } = useTabsWrapperContext();
    const { contentDataUpdate, currentContentData } = useContentProviderContext();
    // Initial State
    // Used whenever we create a new form
    const initialState = {
    }


    const [rowData, setRowData] = useState(null);
    const [columnHeaderMap, setColumnHeaderMap] = useState(null);
    const [loading, setLoading] = useState(true);
    const [columnFromRowData, setColumnData] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState([]);




    const [layoutMetaUpdate, setLayoutMetaUpdate] = useState({}); // tie to useEffect to trigger re-render table layout

    useEffect(() => {
        if(
            !(
                currentContentData && currentContentData.rowDataForTab 
                && _.isEqual(rowData, currentContentData.rowDataForTab)
            )
            && props.tabKey == currentContentData.tabId
        ){
            console.log('push rowData update to storage')
            contentDataUpdate({ 
                ...currentContentData,  
                rowDataForTab: rowData,
                // columnHeaderMapping: columnHeaderMapping, 
                tabId: props.tabKey,
                currentTabDepth: currentTabDepth,
                tabs: currentDepthTabs,
            })
        }
        
    }, [rowData]);


    useEffect(() => {
        // console.log('currentContentData');
        // console.log(currentContentData);
        // try to load data from context first,
        // if no data in context, like initial load, call rule to fetch data from db
        if(
            currentContentData && currentContentData.rowDataForTab 
            && currentContentData.rowDataForTab.length>0
        ){
            console.log("loading existing data from tab context");

            setColumnHeaderMap(currentContentData.columnHeaderMapping 
                ? currentContentData.columnHeaderMapping
                : [])
            setRowData(currentContentData.rowDataForTab);
            setLoading(false);
        }
        else{
            console.log("initial fetching data from db");
            fetchRowData();
        };
    }, []);

    const fetchRowData = () => {
        let recordsNum = 100 + parseInt(moment().local().format("ss"));
        // console.log('should fetch ' + recordsNum + ' records');
        axios.get(`/action/activityBrowse?p_metadata=true&p_pagesize=${recordsNum}`).then((response) => {
            // // console.log(response.data);
            let res = response.data && response.data.activities ? response.data.activities : response.data;
            let columnHeaderMapping = response.data && response.data.metadata ? response.data.metadata : [];

            setColumnHeaderMap(columnHeaderMapping)
            setRowData(res);
            setLoading(false);
            contentDataUpdate({ 
                ...currentContentData,  
                rowDataForTab: res,
                columnHeaderMapping: columnHeaderMapping, 
                tabId: props.tabKey,
                currentTabDepth: currentTabDepth,
                tabs: currentDepthTabs,
            })
        });
    };


    const paginatorRight = <Button type="button" icon="pi pi-download" text onClick={(e) =>  console.log('parent right click function overwrite')} />;
    

    const paginatorLeft = (
        <Button
            type="button"
            icon="pi pi-refresh"
            text
            onClick={(e) => {
                // console.log("left button clicked");
                // if(props.fetchRowData){
                //     props.fetchRowData();
                // }
                fetchRowData();
                // console.log(layoutMetaUpdate);
                console.log("ClearStateClick");
                
                setLayoutMetaUpdate({
                    first: 0,
                    rows: 7,
                    multiSortMeta: [],
                    columnOrder: [],
                });
            }}
        />
    );
    const onColumnToggle = (event) => {
        // @TODO
        // // console.log(columnFromRowData);
        let selectedColumns = event.value;
        // // console.log(selectedColumns);
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






    const dataTableSaveLayout = (state) => {

        console.log("dataTableSaveLayout");
        // console.log(state);
        if(
            !(
                currentContentData && currentContentData.layoutMeta 
                && _.isEqual(state, currentContentData.layoutMeta)
            )
            && props.tabKey == currentContentData.tabId
        ){
            contentDataUpdate({ 
                ...currentContentData, 
                // layoutMeta: layoutMeta,
                layoutMeta: state,
                // tabId: props.tabKey,
                currentTabDepth: currentTabDepth,
                tabs: currentDepthTabs,
            }); 
        }
        
    };

    const dataTableLoadLayout = () => {
        // component only call this on initial loading layoutMeta
        console.log(" dataTableLoadLayout function");
        // console.log(currentContentData.layoutMeta);

        // check if tab context already has layoutMeta
        if(currentContentData && currentContentData.layoutMeta){
            // console.log("loading layout from tab currentContentData");
            return currentContentData.layoutMeta;
        }
        else{
            return {};
        }
    };


   

    const cdl = currentTabDepth;


    return (
        <div className="grid flex-grow-1 flex-direction-col">
            <div className="col-12"></div>
            <div className="col-12">
                <div>
                    <Button
                        onClick={() => {
                            addNewTab({
                                label: "Table Grid",
                                content: "",
                                componentType: "TableGridForTab",
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
                                    componentType: "TableGridForTab",
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
                <h1>PrimeReact Grid Component</h1>
            </div>

            <div className="col-12">
                <DataGrid
                    selfFetchData={false}
                    rowDataValue={rowData} // need a useEffect for rowData to monitor changes and push to storage
                    updateRowData={setRowData} //
                    columnHeaderMap={columnHeaderMap} // fetched along rowData, currently no update needed after initial fetch
                    loading={loading}
                    emptyMessage="No Activities Found."
                    dataKey="id"
                    // onRowReorder={onRowReorder}// should handle it locally, and push rowData changes back

                    // directly pass any layout to the table
                    layoutMeta={layoutMetaUpdate}
                    dataTableSaveLayout={dataTableSaveLayout} // when ever local layout changes, call this to update stored layout
                    dataTableLoadLayout={dataTableLoadLayout} // when initial load/mount, call this to check and fetch if there are stored layout
                    stateStorage='custom'
                    
                    fetchRowDataRule="activityBrowse" // in case component needs a data refresh
                    
                    // props directly passed into PrimeReact DataTable component
                    // see https://primereact.org/datatable/#api.DataTable.props for more info
                    tableOtherProps={{
                        showGridlines: true,
                        scrollable: true,
                        reorderableColumns: true,
                        reorderableRows: true,
                        resizableColumns: true,
                        columnResizeMode: "expand",
                        tableStyle: { minWidth: "50rem" },
                        removableSort: true,
                        sortMode: "multiple", //requires metaKey (e.g. ⌘) to be pressed when clicking second column header.
                        // paginator: true,
                        rows: 6,
                        rowsPerPageOptions: [6, 10, 25, 50, 100, 500],
                        paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
                        currentPageReportTemplate: "{first} to {last} of {totalRecords}",
                    }}
                    paginatorRight={paginatorRight} //overwrite the component
                    paginatorLeft={paginatorLeft} //overwrite the component
                    showSaveLayoutButton={true}
                    saveLayoutRule="primeReactTableSaveLayout"
                    showLoadLayoutDropDown={true}
                    loadLayoutRule="primeReactTableFetchLayout"
                />
            </div>
        </div>
    );
}
