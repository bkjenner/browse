import * as React from "react";
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

export default function DataGridSample1() {
    const [data, setData] = React.useState(null);

    // React.useEffect(() => {
    //     axios.get("/action/getMembershipFlowThrough").then((response) => {
    //         setData(response.data);
    //     });
    // }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <h1>DataGridSample 1 Name Holder</h1>
                {/* <FlowThrough /> */}
            </Box>
        </Box>
    );
}
