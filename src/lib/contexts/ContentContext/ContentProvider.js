import React, { useContext, useState } from "react";
import { ContentContext } from "./ContentContext";

export const ContentProvider = (props) => {
    const [masterContentData, setMasterContentData] = useState({});

    const [currentContentData, setCurrentContentData] = useState({});

    /**
     * This function will handle updating the Context with the data from the form or tab
     * 
     * @param {Object} newContentData Object with keys of fields and values of what to store in the context
     */
    const contentDataUpdate = (newContentData) => {
        let contentCopy = {...masterContentData};
        contentCopy[newContentData.tabId] = newContentData;

        setMasterContentData(contentCopy);
        setCurrentContentData(newContentData);
    }


    /**
     * This function will remove the stored tab data from the context
     * 
     * @param {int} tabId The Id of the tab which is to be removed from the context 
     */
    const contentDataDelete = (tabId) => {
        let contentCopy = { ...masterContentData };
        delete contentCopy[tabId];
        setMasterContentData(contentCopy);
    }
    
    /**
     * This function will retrieve the data of the tab in view from the context
     * @param {int} tabId id of the tab that is being viewed 
     */
    const getContentData = (tabId) => {
        let contentCopy  = { ...masterContentData };
        if(contentCopy && contentCopy[tabId]) {
            setCurrentContentData(contentCopy[tabId]);
        }
    }
    return (
        <ContentContext.Provider
            value={
                {
                    masterContentData,    
                    contentDataUpdate,
                    contentDataDelete,
                    getContentData,
                    currentContentData,
                }
            }
        >
            {props.children}
        </ContentContext.Provider>
    );
}

export const useContentProviderContext = () => {
    return useContext(ContentContext);
}