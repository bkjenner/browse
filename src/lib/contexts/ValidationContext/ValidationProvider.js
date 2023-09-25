import * as React from "react";
import { ValidationContext } from "./ValidationContext";

let validationMap = new Map();

class ValidationProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addFieldToValidate: this.addFieldToValidate.bind(this),
            removeFieldToValidate: this.removeFieldToValidate.bind(this),
            addModalToValidate: this.addModalToValidate.bind(this),
            removeModalToValidate: this.removeModalToValidate.bind(this),
            getValidationMap: this.getValidationMap.bind(this),
            toastOptions: {
                location: "top-right",
                autoClose: true,
                hideProgressBar: false,
                pauseOnHover: true,
            },
        };
    }

    getFieldLocation = (propDef) => {
        let location = [];

        if (propDef.moduleName) {
            location.push(propDef.moduleName);
            if (propDef.area) {
                location.push(propDef.area);
                if (propDef.fieldName) {
                    location.push(propDef.fieldName);
                    if (propDef.subFieldName) {
                        location.push("record");
                        location.push(propDef.subFieldName);
                    }
                }
            }
        }

        return location.length > 1 ? location.join(".") : location;
    };

    addFieldToValidate = (propDef, props) => {
        let fieldLocation = this.getFieldLocation(propDef);

        if (props.isRequired === "true") {
            props.isRequired = true;
        }

        if (props.isRequired === "false") {
            props.isRequired = false;
        }

        validationMap.set(fieldLocation, props);
    };

    removeFieldToValidate = (propDef) => {
        let fieldLocation = this.getFieldLocation(propDef);
        validationMap.delete(fieldLocation);
    };

    addModalToValidate = (propDef) => {
        let fieldLocation = this.getFieldLocation(propDef);
        validationMap.set("modalKey", fieldLocation);
    };

    removeModalToValidate = () => {
        validationMap.delete("modalKey");
    };

    getValidationMap = () => {
        return validationMap;
    };

    render() {
        return (
            <ValidationContext.Provider
                value={{
                    validationContext: {
                        ...this.state,
                    },
                }}
            >
                {this.props.children}
            </ValidationContext.Provider>
        );
    }
}

export default ValidationProvider;
