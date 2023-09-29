import React from "react";
import ComponentMap from "./ComponentMap"; // Import the object with component exports

const DynamicComponentRenderer = (props) => {
    // Check if the component exists in the ComponentMap
    if (props.componentType in ComponentMap) {
        if(`${props.componentType}Wrapper` in ComponentMap) {
            return  React.createElement(
                ComponentMap[`${props.componentType}`],  // Wrapper
                {props},                                        // Props
                // ComponentMap[props.componentType]               // Component
        );
        }
        else {
            return React.createElement(ComponentMap[props.componentType],{},);
        }
        
        
    } else {
        return <div>Component not found</div>;
    }
};

export default DynamicComponentRenderer;
