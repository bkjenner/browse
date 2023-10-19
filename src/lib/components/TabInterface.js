import React, { useState } from "react";
import { TabsWrapper } from "./TabsWrapper";
import { ContentProvider } from "lib/contexts/ContentContext/ContentProvider";

/**
 * This component acts as a wrapper to the Tab container and allows for the storage of content data in each tab
 *
 * @returns {JSX.Element} The Tab container component which supports nested tabs
 */
function TabInterface() {
    return (
        <ContentProvider>
            <TabsWrapper></TabsWrapper>
        </ContentProvider>
    );
}

export default TabInterface;
