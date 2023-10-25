import React, { useEffect, useState } from "react";
import { Menubar } from 'primereact/menubar';
import { useTabsWrapperContext } from "./TabsWrapper";
import { useContentProviderContext } from "../contexts/ContentContext/ContentProvider";

function MenuRibbon(props) {
    const { tabId, currentDepthTabs, addNewTab, currentTabDepth, handleAddNewEditChildTab } = useTabsWrapperContext();
    const { currentContentData } = useContentProviderContext();
    const initialState = {};
    const cdl = currentTabDepth;
    const items = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash',
                    command: () => {console.log('delete')}
                },
                {
                    separator: true
                },
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Edit Same Depth',
                    icon: 'pi pi-fw pi-align-left',
                    command: () => {
                        if(currentContentData.selectedRowId) {
                            addNewTab({
                                label: `${currentContentData.selectedRowTitle}`,
                                content: "This is a placeholder edit form",
                                componentType: "EditForm",
                                initialState: initialState,
                                tabs: currentDepthTabs,
                                depth: currentTabDepth,
                                tabId: tabId,
                                currentDepthLevel: cdl,
                                selectedRowId: currentContentData.selectedRowId,
                            });
                        }
                    }
                },
                {
                    label: 'Edit Nested',
                    icon: 'pi pi-fw pi-align-center',
                    command: () => {
                        if(currentContentData.selectedRowId) {
                            handleAddNewEditChildTab({
                                label: 'Edits',
                                content: "",
                                componentType: "TabsContainer",
                                initialState: {},
                                child: {
                                    label: `${currentContentData.selectedRowTitle}`,
                                    content: "",
                                    componentType: "EditForm",
                                    initialState: {},
                                    tabId: tabId + 1,
                                    selectedRowId: currentContentData.selectedRowId,
                                },
                                tabId: tabId,
                                currentDepthLevel: cdl,
                            });
                        }
                    }
                },
            ]
        },
    ];

    return (
        <Menubar model={items} />
    );
}

export default MenuRibbon;
