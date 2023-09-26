import * as React from "react";

import DataGridSample1 from "./components/DataGridSample1.js";
// import CorporateRegistrations from "./components/CorporateRegistrations.js";
// import Finance from "./components/Finance.js";
import Overview from "./components/Overview.js";
import { SideNav } from "lib/components";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export default function Home() {
    const [compName, setCompName] = React.useState("Overview");

    const theme = useTheme();

    let itemsMap = [
        {
            key: "Overview",
            title: "Overview",
            icon: <HomeIcon sx={{ color: `${theme.palette.primary.contrastText}` }} />,
        },
        {
            key: "DataGridSample1",
            title: "DataGridSample 1 Name Holder",
            icon: <GroupsIcon sx={{ color: `${theme.palette.primary.contrastText}` }} />,
        },
        // {
        //     key: "CorporateRegistrations",
        //     title: "Corporate Registrations",
        //     icon: <BusinessIcon sx={{ color: `${theme.palette.primary.contrastText}` }} />,
        // },
        // {
        //     key: "Finance",
        //     title: "Finance",
        //     icon: <CreditCardIcon sx={{ color: `${theme.palette.primary.contrastText}` }} />,
        // },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <SideNav items={itemsMap} onClick={setCompName} selectedRow={compName} />
            {compName == "Overview" ? (
                <Overview />
            ) : compName == "DataGridSample1" ? (
                <DataGridSample1 />
            // ) : compName == "CorporateRegistrations" ? (
            //     <CorporateRegistrations />
            // ) : compName == "Finance" ? (
            //     <Finance />
            ) : (
                <>Error</>
            )}
        </Box>
    );
}
