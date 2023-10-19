import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { ListBox } from "primereact/listbox";

export default function SideMenu(props) {
    const Item = (i) => {
        return (
            <div className="grid card flex justify-content-center align-items-center">
                <div className={i.icon + " col-1"} />
                <div className="col-11">{i.label}</div>
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center">
            <Sidebar appendTo="self" position="left" visible={props.visible} modal={false} showCloseIcon={false}>
                <ListBox
                    itemTemplate={Item}
                    value={props.value}
                    onChange={(event) => {
                        if (event.value) {
                            props.onChange(event.value);
                        }
                    }}
                    options={props.items}
                    optionLabel="label"
                    optionValue="key"
                    className="sidemenu-listbox h-full w-full"
                />
            </Sidebar>
        </div>
    );
}
