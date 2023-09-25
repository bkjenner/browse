import * as React from "react";
import { AuthenticationContext } from "./AuthenticationContext";

export function withAuthentication(Component) {
    return function AuthenticationComponent(props) {
        return <AuthenticationContext.Consumer>{(contexts) => <Component {...props} {...contexts} />}</AuthenticationContext.Consumer>;
    };
}
