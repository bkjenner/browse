import React, { useState } from "react";

import { SideNav } from "lib/components";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

export default function Home() {
    const theme = useTheme();

    return (
        <Box sx={{ display: "flex" }}>
            <div>Hello world</div>
        </Box>
    );
}
