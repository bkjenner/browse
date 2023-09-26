import * as React from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


export default function Overview() {

    return (
        <Box sx={{ display: "flex" }}>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                    <Toolbar />
                    
                    <h1>Welcome!</h1>
                    <h2>Overview Component holder</h2>

                    <Typography paragraph>Render Overview Component here</Typography>
            </Box>
        </Box>
    );
}
