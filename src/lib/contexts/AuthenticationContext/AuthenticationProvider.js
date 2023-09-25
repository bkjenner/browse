import * as React from "react";
import { AuthenticationContext } from "./AuthenticationContext";

class AuthenticationProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            getAuthentication: this.getAuthentication.bind(this),
            setAuthentication: this.setAuthentication.bind(this),
        };

        this.isAuthenticated = false;
    }

    getAuthentication = () => {
        return this.isAuthenticated;
    };

    setAuthentication = (value) => {
        if (value === "true") {
            value = true;
        }

        if (value === true) {
            this.isAuthenticated = value;
            return;
        }

        return;
    };

    render() {
        return (
            <AuthenticationContext.Provider
                value={{
                    authenticationContext: {
                        ...this.state,
                    },
                }}
            >
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }
}

export default AuthenticationProvider;
