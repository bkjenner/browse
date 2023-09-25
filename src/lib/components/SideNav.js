import * as React from "react";

import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";


export default function SideNav(props) {
    // const [compName, setCompName] = React.useState('Overview');
    const drawerWidth = 250;
    const theme = useTheme();

    let itemMap = props.items;

    function SideNavItem(i) {
        const items = i.items;
        const listItems = items.map((item) =>
        <ListItem key={item.key} disablePadding>
            <ListItemButton
                selected = {props.selectedRow == item.key ? true : false }
                onClick = {(event) => {
                    props.onClick(item.key);
                }}
            >
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary= {item.title} />
            </ListItemButton>
        </ListItem>
        );
        return (
          <List>{listItems}</List>
        );
    }


    return (
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
                PaperProps={{ sx: { color: `${theme.palette.primary.contrastText}`, backgroundColor: `${theme.palette.grey[800]}` } }}
            >
                <Toolbar />
                <Divider />
                <SideNavItem items={itemMap} />
            </Drawer>
    );
}
