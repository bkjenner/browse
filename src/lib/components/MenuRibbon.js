import React, { useEffect, useState } from "react";
import { Menubar } from 'primereact/menubar';
import { useTabsWrapperContext } from "./TabsWrapper";
import { useContentProviderContext } from "../contexts/ContentContext/ContentProvider";

function MenuRibbon(props) {
    const { tabId, currentDepthTabs, addNewTab, currentTabDepth, handleAddNewDepthTab, handleAddNewChildTab } = useTabsWrapperContext();
    const { currentContentData } = useContentProviderContext();
    const initialState = {};
    const cdl = currentTabDepth;

    // 007
    // Access currentContentData to find row data to pass to new edit tab
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
                        addNewTab({
                            label: "Edit Form",
                            content: "This is a placeholder edit form",
                            componentType: "EditForm",
                            initialState: initialState,
                            tabs: currentDepthTabs,
                            depth: currentTabDepth,
                            tabId: tabId,
                            currentDepthLevel: cdl,
                            recordName: 'placeholder',
                            selectedRowId: currentContentData.selectedRowId,
                            fields: [
                                {
                                    inputType: 'text',
                                    name: 'aaa',
                                    title: 'Text Input Field'
                                },
                                {
                                    inputType: 'number',
                                    name: 'bbb',
                                    title: 'Number Input Field'
                                },
                                {
                                    inputType: 'date',
                                    name: 'cc',
                                    title: 'Date Input Field',
                                    tableName: '',
                                    columnFieldName: '',

                                },
                                {
                                    inputType: 'select',
                                    name: 'dd',
                                    title: 'Dropdown Input Field',
                                    tableName: '',
                                    columnFieldName: '',
                                },
                            ]
                        });
                    }
                },
                {
                    label: 'Edit Nested',
                    icon: 'pi pi-fw pi-align-center',
                    command: () => {
                        handleAddNewDepthTab({
                            label: 'Edits (Parent)',
                            content: "",
                            componentType: "TabsContainer",
                            initialState: {},
                            child: {
                                label: 'Nested Edit Form',
                                content: "This is a placeholder edit form",
                                componentType: "EditForm",
                                initialState: {},
                                tabId: tabId + 1,
                                selectedRowId: currentContentData.selectedRowId,
                                fields: [
                                    {
                                        inputType: 'text',
                                        name: 'uid',
                                        title: 'Unique ID',
                                        tableName: '',
                                        columnFieldName: '',

                                    },
                                    {
                                        inputType: 'text',
                                        name: 'priority',
                                        title: 'Priority',
                                        tableName: '',
                                        columnFieldName: '',
                                    },
                                    {
                                        inputType: 'text',
                                        name: 'status',
                                        title: 'Status',
                                        tableName: '',
                                        columnFieldName: '',

                                    },
                                    {
                                        inputType: 'text',
                                        name: 'activitytype',
                                        title: 'Activity Type',
                                        tableName: '',
                                        columnFieldName: '',
                                    },
                                    {
                                        inputType: 'text',
                                        name: 'activityproject',
                                        title: 'Activity Project',
                                        tableName: '',
                                        columnFieldName: '',
                                    },
                                    {
                                        inputType: 'text',
                                        name: 'performedby',
                                        title: 'Performed By',
                                        tableName: '',
                                        columnFieldName: '',
                                    },
                                    {
                                        inputType: 'text',
                                        name: 'performedfor',
                                        title: 'Performed For',
                                        tableName: '',
                                        columnFieldName: '',
                                    },
                                    {
                                        inputType: 'date',
                                        name: 'completiondate',
                                        title: 'Completion Date',
                                        tableName: '',
                                        columnFieldName: '',
                                    },
                                    {
                                        inputType: 'number',
                                        name: 'totalactual',
                                        title: 'Total Actual',
                                        tableName: '',
                                        columnFieldName: '',
                                    },
                                ]
                            },
                            tabId: tabId,
                            currentDepthLevel: cdl,
                        });
                    }
                },
            ]
        },
    ];

    // 007 Add a function where we can add a child tab to a separate parent tab by a parent ID somehow
    // So we can group edits together if we want
    return (
        <Menubar model={items} />
    );
}

export default MenuRibbon;
