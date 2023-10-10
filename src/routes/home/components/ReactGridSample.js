import * as React from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
// import "@silevis/reactgrid/styles.css";
import { SideNav } from "lib/components";
import axios from "axios";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// function FlowThrough(data) {
//     if (data) {
//         return <div>FLOW</div>;
//     }

//     return null;
// }

let headerRow = {
    rowId: "header",
    cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" }
    ]
};

let people = [
    { name: "Thomas", surname: "Goldman" },
    { name: "Susie", surname: "Quattro" },
    { name: "", surname: "" }
];

let columns = [
    { columnId: "name", width: 150 },
    { columnId: "surname", width: 150 }
];


let getRows = (data) =>{
    return [
        headerRow,
        ...data.map((ele,idx)=>{
            return {
                rowId: idx,
                cells: [
                    { type: "text", text:  ele.name},
                    { type: "text", text:  ele.surname}
                ]
            }
        })
    ]
}



export default function ReactGridSample() {
    const [data, setData] = React.useState(null);

    // React.useEffect(() => {
    //     axios.get("/action/getMembershipFlowThrough").then((response) => {
    //         setData(response.data);
    //     });
    // }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <h1>ReactGrid</h1>
                {/* yarn add @silevis/reactgrid */}
                <ReactGrid 
                    rows={getRows(people)} 
                    columns={columns} 
                />
            </Box>
        </Box>
    );
}
