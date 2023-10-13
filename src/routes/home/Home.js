import React, { useState } from "react";

import { SideNav, Tab } from "lib/components";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useQuery, gql } from "@apollo/client";
import { TabsContainerWrapper } from "../../lib/components/TabsWrapper";
import TabInterface from "../../lib/components/TabInterface";

// Create the form context at the highest level so that we can store information and swap between tabs
export default function Home() {
    const theme = useTheme();

    return <TabInterface/>
}
