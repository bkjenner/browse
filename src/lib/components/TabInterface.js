import React, { useState } from "react";
import { TabsContainerWrapper } from "./TabsWrapper";
import { ContentProvider } from "../contexts/ContentContext/ContentProvider";

function TabInterface() {
    return (
        <ContentProvider>
            <TabsContainerWrapper></TabsContainerWrapper>
        </ContentProvider>
    )
}

export default TabInterface;
