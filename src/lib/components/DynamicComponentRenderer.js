import React from "react";
import ComponentMap from "./ComponentMap"; // Import the object with component exports

const DynamicComponentRenderer = (props) => {
    // Check if the component exists in the ComponentMap
    if (props.componentType in ComponentMap) {
        return  React.createElement(
            ComponentMap[`${props.componentType}`], 
            {props},
        );        
    } else {
        return <div>Component not found</div>;
    }
};

export default DynamicComponentRenderer;
