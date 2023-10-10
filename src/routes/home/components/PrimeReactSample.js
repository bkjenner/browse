import * as React from "react";

import { SideNav } from "lib/components";
import axios from "axios";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


import {Button} from 'primereact/button';

import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

import moment from "moment";

export default function PrimeReactSample() {

    const [rowData, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filters, setFilters] = React.useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'clientnumber': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'member.registeredname': { value: null, matchMode: FilterMatchMode.CONTAINS },
        // representative: { value: null, matchMode: FilterMatchMode.IN },
        'member.memberstatus.description': { value: null, matchMode: FilterMatchMode.EQUALS },
        // verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [globalFilterValue, setGlobalFilterValue] = React.useState('');

    React.useEffect(() => {
        axios.get("/action/testGetMember")
        .then((response) => {
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        });
    }, []);

    const paginatorLeft = <Button 
        type="button" 
        icon="pi pi-refresh" 
        text 
        onClick={(e) => {
            // location.reload();
            console.log('left button clicked');
            setData([]);
        }}
    />;
    const paginatorRight = <Button 
        type="button" 
        icon="pi pi-download" 
        text 
        onClick={(e) => console.log('right button clicked')}
    />;

    const dateBodyFormatter = (ele) =>{
        console.log(ele);
        return moment(ele['member.firstmembcountrydate']).format('YYYY-MM-DD')
    }

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column header="ClientID" rowSpan={2} />
                <Column header="Client Info" colSpan={2} />
                <Column header="Membership Info" colSpan={3} />
            </Row>
            <Row>
                <Column header="Name" sortable field="member.registeredname" />
                <Column header="Client Number" sortable field="clientnumber" />
                <Column header="Status" sortable field="member.memberstatus.description" />
                <Column header="SubStatus" sortable field="member.membersubstatus.description" />
                <Column header="Member Since" sortable field="member.firstmembcountrydate" />
            </Row>
        </ColumnGroup>
    );

    const [statuses] = React.useState(['Active', 'Inactive']);

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown 
                value={options} 
                options={statuses} 
                onChange={(e) => options.filterApplyCallback(e)} 
                // itemTemplate={statusItemTemplate} 
                placeholder="Select One" 
                className="p-column-filter" 
                showClear 
                style={{ minWidth: '12rem' }} 
            />
        );
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <h1>PrimeReact</h1>
                {/* <div className="text-center">
                    <Button label="Click" icon="pi pi-plus" onClick={(e) => setData(data + 1)}></Button>
                    <div className="text-2xl text-900 mt-3">{data}</div>
                </div> */}
                <div className="card">
                    <DataTable
                        value={rowData}
                        dataKey="id"
                        scrollable
                        scrollHeight="400px"
                        tableStyle={{ minWidth: "50rem" }}
                        headerColumnGroup={headerGroup}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[10, 25, 50, 100, 500]}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        paginatorLeft={paginatorLeft}
                        paginatorRight={paginatorRight}
                        sortMode="multiple" //requires metaKey (e.g. ⌘) to be pressed when clicking second column header.
                        // sortField="member.registeredname" // initial sorting
                        // sortOrder={-1}
                        filters={filters}
                        filterDisplay="row"
                        loading={loading}
                        // globalFilterFields={['member.registeredname', 'member.memberstatus.description', 'member.membersubstatus.description', 'member.firstmembcountrydate']}
                        // header={header}
                        emptyMessage="No Member found."
                    >
                        <Column
                            field="id"
                            // header="ClientID"
                            sortable
                        ></Column>
                        <Column
                            field="member.registeredname"
                            // header="Name"
                            // sortable
                            // filter
                            // filterPlaceholder="Search by name"
                        ></Column>
                        <Column
                            field="clientnumber"
                            // header="ClientNumber"
                            // sortable
                            // filter
                            // filterPlaceholder="Search by ClientNumber"
                        ></Column>
                        <Column
                            field="member.memberstatus.description"
                            // header="Membership Status"
                            // sortable
                            // filter
                            // filterElement={statusRowFilterTemplate}
                        ></Column>
                        <Column
                            field="member.membersubstatus.description"
                            // header="Membership SubStatus"
                            // sortable
                            
                        ></Column>
                        <Column
                            field="member.firstmembcountrydate"
                            // header="Member Since"
                            // sortable
                            body={dateBodyFormatter}
                        ></Column>
                    </DataTable>
                </div>
            </Box>
        </Box>
    );
}
