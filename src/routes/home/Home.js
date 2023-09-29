import React, { useState } from "react";

import { SideNav, Tab } from "lib/components";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useQuery, gql } from "@apollo/client";
import { TabsContainerWrapper } from "../../lib/components/TabsWrapper";

const GET_CLIENTS = gql`
    query Client {
        clients {
            activated
            clientname
        }
    }
`;

// Create the form context at the highest level so that we can store information and swap between tabs
export default function Home() {
    const theme = useTheme();
    let apollo = false; // Set this to true to use graphql
    
    
    if(apollo) {
        const { loading, error, data } = useQuery(GET_CLIENTS);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error : {error.message}</p>;
        
        return data.clients.map(({ clientname }) => <div>{clientname}</div>);
    } else {
        return (
            <Box sx={{ display: "flex" }}>
                <div>Hello world</div>
                <br/>
                <TabsContainerWrapper />
            </Box>
        );
    }
}
