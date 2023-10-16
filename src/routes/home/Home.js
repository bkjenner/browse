import * as React from "react";

import ReactGridSample from "./components/ReactGridSample.js";
import PrimeReactSample from "./components/PrimeReactSample.js";
import PrimeReactDynamic from "./components/PrimeReactDynamic.js";
// import CorporateRegistrations from "./components/CorporateRegistrations.js";
// import Finance from "./components/Finance.js";
import Overview from "./components/Overview.js";

import { SideNav } from "lib/components";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useQuery, gql } from "@apollo/client";
import { TabsContainerWrapper } from "../../lib/components/TabsWrapper";

import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import TabInterface from "../../lib/components/TabInterface";

// Create the form context at the highest level so that we can store information and swap between tabs
export default function Home() {
    const [compName, setCompName] = React.useState("PrimeReactDynamic");

    const theme = useTheme();

    let itemsMap = [
        {
            key: "Overview",
            title: "Overview",
            icon: <HomeIcon sx={{ color: `${theme.palette.primary.contrastText}` }} />,
        },
        {
            key: "ReactGridSample",
            title: "ReactGrid",
            icon: <GroupsIcon sx={{ color: `${theme.palette.primary.contrastText}` }} />,
        },
        // {
        //     key: "PrimeReactSample",
        //     title: "Prime React Sample",
        //     icon: <BusinessIcon sx={{ color: `${theme.palette.primary.contrastText}` }} />,
        // },
        {
            key: "PrimeReactDynamic",
            title: "Prime React Dynamic Columns",
            icon: <BusinessIcon sx={{ color: `${theme.palette.primary.contrastText}` }} />,
        },
        {
            key: "Tab",
            title: "Tab",
            icon: <CreditCardIcon sx={{ color: `${theme.palette.primary.contrastText}` }} />,
        },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <SideNav items={itemsMap} onClick={setCompName} selectedRow={compName} />
            {compName == "Overview" ? (
                <Overview />
            ) : compName == "ReactGridSample" ? (
                <ReactGridSample />
            // ) : compName == "PrimeReactSample" ? (
            //     <PrimeReactSample />
            ) : compName == "PrimeReactDynamic" ? (
                <PrimeReactDynamic />
            ) : compName == "Tab" ? (
                <TabInterface/>
            ) : (
                <>Error</>
            )}
        </Box>
    );
}
