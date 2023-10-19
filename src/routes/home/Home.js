import React, { useState } from "react";
import { SideMenu } from "lib/components";
import { TabsWrapper } from "lib/components/TabsWrapper";
import TabInterface from "lib/components/TabInterface";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";

export default function Home() {
    const [component, setComponent] = useState("ActivityBrowse");
    const [navigationVisible, setNavigationVisible] = useState(true);

    const navigationItems = [
        {
            key: "ActivityBrowse",
            label: "Activity Browse",
            icon: "pi pi-calendar-times",
        },
    ];

    return (
        <div className="grid flex-grow-1 flex-direction-col">
            <div className="col-1 col-offset-2">
                <Button type="button" icon="pi pi-bars outlined" onClick={() => setNavigationVisible(!navigationVisible)} />
            </div>
            <div className="col-3 h-full">
                <SideMenu value={component} items={navigationItems} visible={navigationVisible} onChange={setComponent} />
            </div>
            <div className={navigationVisible ? "col-10 col-offset-2" : "col-12"}>
                {component == "ActivityBrowse" ? <TabInterface /> : <>Error</>}
            </div>
        </div>
    );
}
