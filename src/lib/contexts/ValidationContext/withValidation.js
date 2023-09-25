import * as React from "react";
import { ValidationContext } from "./ValidationContext";

export function withValidation(Component) {
    return function ValidationComponent(props) {
        return <ValidationContext.Consumer>{(contexts) => <Component {...props} {...contexts} />}</ValidationContext.Consumer>;
    };
}
