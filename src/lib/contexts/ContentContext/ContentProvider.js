import React, { useContext, useState } from "react";
import { ContentContext } from "./ContentContext";

export const ContentProvider = (props) => {
    // Object to hold all form / tab data
    const [masterContentData, setMasterContentData] = useState({});
    /**
     * This function will handle updating the Context with the data from the form or tab
     */
    const contentDataUpdate = (newContentData) => {
        let contentCopy = {...masterContentData};
        contentCopy[newContentData.tabId] = newContentData;

        setMasterContentData(contentCopy);
    }

    const contentDataDelete = (tabId) => {
        let contentCopy = { ...masterContentData };
        delete contentCopy[tabId];
        setMasterContentData(contentCopy);
    }

    return (
        <ContentContext.Provider
            value={
                {
                    masterContentData,    
                    contentDataUpdate,
                    contentDataDelete,
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