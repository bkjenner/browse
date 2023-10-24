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
import MenuRibbon from "./MenuRibbon";



import moment from "moment";

export default function DataGrid(props) {


    const dataTableRef = useRef(null);
    const [rowData, setRowData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [columnHeaderMap, setColumnHeaderMap] = useState(null);

    const [layoutMetaUpdate, setLayoutMetaUpdate] = useState(null); // tie to useEffect to trigger re-render table layout

    let layoutMeta;

    useEffect(() => {
        if (props.selfFetchData == true) {
            let recordsNum = 100 + parseInt(moment().local().format("ss"));
            // console.log('should fetch ' + recordsNum + ' records');
            axios
                .get(`/action/${props.fetchRowDataRule ? props.fetchRowDataRule : "activityBrowse"}?p_metadata=true&p_pagesize=${recordsNum}`)
                .then((response) => {
                    // // console.log(response.data);
                    let res = response.data && response.data.activities ? response.data.activities : response.data;
                    let columnHeaderMapping = response.data && response.data.metadata ? response.data.metadata : [];
                    setColumnHeaderMap(columnHeaderMapping)

                    setRowData(res);
                    setLoading(false);
                });
        }
    }, []);

    // to monitor and apply any local layout has been selected/set
    // then reload triggered from restoreState() would trigger dataTableSaveLayout, and push new layout data to parent
    useEffect(() => {
        console.log("layoutMetaUpdate useEffect");
        // console.log(layoutMetaUpdate);
        if (dataTableRef.current) {
            dataTableRef.current.restoreState(); // the built-in restoreState() function would trigger re-render layout
        }
    }, [layoutMetaUpdate]);

    // to monitor and apply any parent passed in layout 
    useEffect(() => {
        console.log("parent passed in layoutMeta useEffect");
        // console.log(layoutMetaUpdate);
        setLayoutMetaUpdate(props.layoutMeta);
    }, [props.layoutMeta]);


    const [layoutOptions, setLayoutOptions] = useState(null); // value selected from layoutOptions list
    const [selectedLayout, setSelectedLayout] = useState(null); // value selected from layoutOptions list

    useEffect(() => {
        if(props.showLoadLayoutDropDown==true){
            fetchAllLayout();
        }
        
    }, []);

    const selectLayout = (e) =>{
        // console.log(e.value);
        if(e.value){
            delete e.value.columnWidths;
            delete e.value.tableWidth;
        }
        setSelectedLayout(e.value); // for dropDown itselt to display selected option

        // the useEffect would trigger layout re-load based on data in layoutMetaUpdate
        setLayoutMetaUpdate(e.value); 

    }

    const fetchAllLayout = () =>{
        axios.get(`/action/${props.loadLayoutRule ? props.loadLayoutRule :'primeReactTableFetchLayout'}`)
        .then((response) => {
            if(response.data && response.data.length>0){
                // console.log(response.data);
                setLayoutOptions(response.data);
            }
            else{
                console.log('no existing layout fetched')
            }
        });
    }

    const getColumnsThroughLoopArrayJSON = (obj, columnHeaderMap, columnNames = [], parentKey = null, columnObjectArray = []) => {
        // // original data returned from sequelize could be an array(findAll) of nested data or one json(findOne) with nested date or flat data
        // [
        //     { 
        //         clientid, 
        //         clientnumber, 
        //         member: { 
        //             memberstatus: { 
        //                 id: 111, 
        //                 description: "active" 
        //             } ,
        //             memberdate: 111
        //         } 
        //     }
        //     //......more elements....
        // ];
        // @TODO currently no implememtation for nested one to many relation like one client has two addresses
        // columnObjectArray: to extrat and save columns into [{ key: 'name', field: 'name', header: 'Name' } , ...] format
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

    const renderDynamicColumns = (rowDataValue,columnHeaderMap) => {

        let columnObjectArray = getColumnsThroughLoopArrayJSON(rowDataValue, columnHeaderMap);

        let columns = [];

        columnObjectArray.forEach((ele) => {
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
        // passed in parameter state is the layout that table currently is showing
        console.log("local dataTableSaveLayout function");

        layoutMeta = state;
        props.dataTableSaveLayout(state);
        // if(props.dataTableSaveLayout && !_.isEqual(props.layoutMeta, state)){
        //     props.dataTableSaveLayout(state);
        // }


    };

    const dataTableLoadLayout = () => {
        // also handles the initial loading layoutMeta
        
        console.log("local dataTableLoadLayout function");
        console.log(layoutMetaUpdate);
        // dataTableRef.current.restoreColumnWidths(); 

        // if a load function is passed in  
        // call it and use its returned value as layout only on initial loading when local layoutMetaUpdate is null
        // otherwise use layoutMetaUpdate as layOut and push changes up to parent for saving. 
        if(props.dataTableLoadLayout && layoutMetaUpdate == null){
            let res = props.dataTableLoadLayout();
            setLayoutMetaUpdate(res);
            // console.log(res);
            // layoutMeta = res;
            return (res);
        }
        else{
            // layoutMeta = layoutMetaUpdate;
            return layoutMetaUpdate;
        }
    };

    const onRowReorder = (e) =>{

        if(props.updateRowData && props.rowDataValue){
            props.updateRowData(e.value);
        }

        // // row data directly to table
        // setRowData(e.value);
        
        
    };


    const paginatorLeft = <Button type="button" icon="pi pi-download" text onClick={(e) =>  console.log('left button clicked')} />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text onClick={(e) =>  console.log('right button clicked')} />;

    return (
        <>
            {props.showLoadLayoutDropDown == true ? (
                <div className="col-12">
                    <h2>Select a Layout</h2>
                    <Dropdown
                        value={selectedLayout}
                        onChange={selectLayout}
                        options={layoutOptions}
                        optionLabel="name"
                        placeholder="Select a Layout"
                        className="w-full md:w-14rem"
                    />
                </div>
            ) : (
                <></>
            )}
            <br></br>
            <div className="col-12">
            <MenuRibbon />
                <div className="card">
                    <DataTable
                        ref={dataTableRef}
                        value={
                            props.selfFetchData == true
                            ? rowData
                            : props.rowDataValue
                        }
                        loading={
                            props.selfFetchData == true
                            ? loading
                            : props.loading
                        }
                        emptyMessage={props.emptyMessage ? props.emptyMessage : "No Record Found."}
                        dataKey={props.dataKey ? props.dataKey : "id"}
                        // DataTable re-order rows by saving RowData array in that order, disabled when column sorting is on
                        // further implementation needed if want to re-order row when column sorting is on
                        onRowReorder={onRowReorder} // DataTable save/load rows in the same order as they are in the array
                        // header={header} // table's header, (above the row header)

                        rows={5}
                        rowsPerPageOptions={[10, 25, 50, 100, 500]}
                        paginator
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        paginatorLeft={props.paginatorLeft ? props.paginatorLeft : paginatorLeft}
                        paginatorRight={props.paginatorRight ? props.paginatorRight : paginatorRight}
                        {...props.tableOtherProps} // overwrite any table setting from passed in props
                        stateStorage={
                            props.stateStorage
                                ? props.stateStorage
                                : props.dataTableLoadLayout || props.dataTableSaveLayout || props.layoutMeta
                                ? "custom"
                                : 'local'
                        }
                        // stateStorage needs to be 'custom' to trigger below passed in function
                        customSaveState={dataTableSaveLayout} // run every render
                        // run only on initial Mount ( mapped inside a useEffect(...,[]) )
                        // or directly call restoreState() to re-render layout
                        customRestoreState={dataTableLoadLayout}
                    >
                        <Column rowReorder style={{ width: "1rem" }} frozen />
                        {
                            props.selfFetchData == true
                            ? renderDynamicColumns(rowData, columnHeaderMap)
                            :renderDynamicColumns(props.rowDataValue, props.columnHeaderMap)
                        }
                    </DataTable>
                </div>
            </div>

            <br></br>

            {props.showSaveLayoutButton == true && props.saveLayoutRule ? (
                <div className="col-12">
                    <Button
                        type="button"
                        label="Save Current Layout"
                        icon="pi  pi-download"
                        onClick={(e) => {
                            let layoutName = moment().local().format("YYYYMMDDHHmmss");
                            console.log("saving to cache " + layoutName);
                            console.log(layoutMeta);

                            delete layoutMeta.columnWidths;
                            delete layoutMeta.tableWidth;
                            console.log(layoutMeta);
                            axios
                                .post(`/action/${props.saveLayoutRule}`, {
                                    layoutName,
                                    layoutMeta: layoutMeta,
                                })
                                .then(() => {
                                    fetchAllLayout();
                                    setSelectedLayout(layoutMeta);
                                });
                        }}
                    />
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
