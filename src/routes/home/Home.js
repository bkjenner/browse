import React, { useState } from "react";

import { SideNav } from "lib/components";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useQuery, gql } from "@apollo/client";

const GET_CLIENTS = gql`
    query Client {
        clients {
            activated
            clientname
        }
    }
`;

export default function Home() {
    const theme = useTheme();

    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return data.clients.map(({ clientname }) => <div>{clientname}</div>);
}
