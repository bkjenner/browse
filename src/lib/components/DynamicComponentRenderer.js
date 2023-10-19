import React from "react";
import ComponentMap from "./ComponentMap"; // Import the object with component exports

/**
 * This component will render any component listed in the component map file based on the componetType prop.
 * Any props passed in will also be passed to the component that is rendering
 *
 * @param {Object} props Contains information on the React Component to render. Utilizes the componentType prop to find the functional component to render
 * @returns {JSX.Element} JSX element of the component to render
 */
const DynamicComponentRenderer = (props) => {
    // Check if the component exists in the ComponentMap
    if (props.componentType in ComponentMap) {
        return React.createElement(ComponentMap[`${props.componentType}`], { ...props });
    } else {
        return <div>Component not found</div>;
    }
};

export default DynamicComponentRenderer;
