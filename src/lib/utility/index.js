import _ from "lodash";
import validate from "validate.js";
import moment from "moment";
import axios from "axios";
import React from "react";
const sanitizeHTML = require("sanitize-html");

export function getPropDef(props) {
    return {
        moduleName: props.moduleName || null,
        area: props.area || null,
        fieldName: props.fieldName || null,
        subFieldName: props.subFieldName || null,
    };
}

export function getFieldDef(state, ownProps) {
    var field;
    if (ownProps.moduleName) {
        if (ownProps.area && ownProps.area != "") {
            if (ownProps.subFieldName && ownProps.subFieldName != "") {
                field =
                    state[ownProps.moduleName][ownProps.area][ownProps.fieldName].record &&
                    state[ownProps.moduleName][ownProps.area][ownProps.fieldName].record[ownProps.subFieldName]
                        ? state[ownProps.moduleName][ownProps.area][ownProps.fieldName].record[ownProps.subFieldName]
                        : {};
            } else {
                if (ownProps.fieldName && ownProps.fieldName != "") {
                    field = state[ownProps.moduleName][ownProps.area][ownProps.fieldName]
                        ? state[ownProps.moduleName][ownProps.area][ownProps.fieldName]
                        : {};
                } else {
                    field = state[ownProps.moduleName][ownProps.area] ? state[ownProps.moduleName][ownProps.area] : {};
                }
            }
        } else {
            if (ownProps.subFieldName && ownProps.subFieldName != "") {
                field =
                    state[ownProps.moduleName][ownProps.fieldName].record &&
                    state[ownProps.moduleName][ownProps.fieldName].record[ownProps.subFieldName]
                        ? state[ownProps.moduleName][ownProps.fieldName].record[ownProps.subFieldName]
                        : {};
            } else {
                if (ownProps.fieldName && ownProps.fieldName != "") {
                    field = state[ownProps.moduleName][ownProps.fieldName] ? state[ownProps.moduleName][ownProps.fieldName] : {};
                } else {
                    field = state[ownProps.moduleName] ? state[ownProps.moduleName] : {};
                }
            }
        }
    }

    let moduleName = null;

    if (ownProps.moduleName) {
        moduleName = ownProps.moduleName;
    } else if (state.mod && state.mod.name) {
        moduleName = state.mod.name;
    }

    let qs;

    if (moduleName) {
        qs = state.mod && state.mod[moduleName] && state.mod[moduleName].qs ? state.mod[moduleName].qs : null;
    }

    return { qs: qs, field: field };
}

export function getPayloadDef(def, payload) {
    if (def.area && def.fieldName && def.subFieldName) {
        return {
            [def.area]: {
                [def.fieldName]: {
                    record: {
                        [def.subFieldName]: { ...payload },
                    },
                },
            },
        };
    } else if (def.area && def.fieldName) {
        return {
            [def.area]: {
                [def.fieldName]: { ...payload },
            },
        };
    } else if (def.fieldName) {
        return {
            [def.fieldName]: { ...payload },
        };
    } else if (def.area) {
        return {
            [def.area]: { ...payload },
        };
    }
}

export function getStateValue(def, state, key) {
    if (def.area && def.fieldName && def.subFieldName) {
        return state[def.area][def.fieldName].record[def.subFieldName][key];
    } else if (def.area && def.fieldName) {
        return state[def.area][def.fieldName][key];
    } else if (def.fieldName) {
        return state[def.fieldName][key];
    }
}

export function getFieldLevelData(state, ownProps) {
    var field;
    if (ownProps.moduleName) {
        if (ownProps.area && ownProps.area != "") {
            if (ownProps.subFieldName && ownProps.subFieldName != "") {
                return state[ownProps.moduleName][ownProps.area][ownProps.fieldName].record
                    ? state[ownProps.moduleName][ownProps.area][ownProps.fieldName].record
                    : null;
            } else {
                if (ownProps.fieldName && ownProps.fieldName != "") {
                    return state[ownProps.moduleName][ownProps.area] ? state[ownProps.moduleName][ownProps.area] : null;
                } else {
                    return state[ownProps.moduleName] ? state[ownProps.moduleName] : null;
                }
            }
        } else {
            if (ownProps.subFieldName && ownProps.subFieldName != "") {
                return state[ownProps.moduleName][ownProps.fieldName].record ? state[ownProps.moduleName][ownProps.fieldName].record : null;
            } else {
                if (ownProps.fieldName && ownProps.fieldName != "") {
                    return state[ownProps.moduleName] ? state[ownProps.moduleName] : null;
                } else {
                    return state[ownProps.moduleName] ? state[ownProps.moduleName] : null;
                }
            }
        }
    } else {
        return null;
    }
}

export function dropStateValue(def, state, key) {
    if (def && def.area && def.fieldName && def.subFieldName) {
        if (
            state[def.area] &&
            state[def.area][def.fieldName] &&
            state[def.area][def.fieldName] &&
            state[def.area][def.fieldName].record &&
            state[def.area][def.fieldName].record[def.subFieldName] &&
            state[def.area][def.fieldName].record[def.subFieldName][key]
        ) {
            delete state[def.area][def.fieldName].record[def.subFieldName][key];
        }
    } else if (def && def.area && def.fieldName) {
        if (state[def.area] && state[def.area][def.fieldName] && state[def.area][def.fieldName] && state[def.area][def.fieldName][key]) {
            delete state[def.area][def.fieldName][key];
        }
    } else if (def && def.fieldName) {
        if (state[def.fieldName] && state[def.fieldName][key]) {
            delete state[def.fieldName][key];
        }
    } else if (def && def.area) {
        if (state[def.area] && state[def.area][key]) {
            delete state[def.area][key];
        }
    }
    return state;
}

export function dropStateValues(def, state, keys) {
    let changedState = state;
    if (keys && keys.length > 0) {
        keys.map((key) => {
            changedState = dropStateValue(def, changedState, key);
        });
    }

    return changedState;
}

export function manipulateTreeData(data, actions, childProp) {
    if (data && data.length > 0) {
        var objInternal = this;
        var removeIdx;
        var tData = _.map(data, (node) => {
            if (node && node[childProp]) {
                node[childProp] = objInternal.manipulateTreeData(node[childProp], actions, childProp);
            }

            _.map(actions, (action, idx) => {
                if (node[action.field] && node[action.field] == action.value) {
                    if (action.type == "add") {
                        _.map(action.newValues, (nVal) => {
                            node[nVal.name] = nVal.value;
                        });
                    } else if (action.type == "update") {
                        _.map(action.newValues, (nVal) => {
                            node[nVal.name] = nVal.value;
                        });
                    } else if (action.type == "remove") {
                        _.map(action.newValues, (nVal) => {
                            delete node[nVal.name];
                        });
                    } else if (action.type == "removeNode") {
                        removeIdx = idx;
                    } else if (action.type == "push") {
                        _.map(action.newValues, (nVal) => {
                            if (node[action.pushField]) {
                                node[action.pushField].push(nVal);
                            } else {
                                node[action.pushField] = [nVal];
                            }
                        });
                    } else if (action.type == "pull") {
                        _.map(action.newValues, (nVal) => {
                            if (node[action.pushField]) {
                                node[action.pushField] = node[action.pushField].filter(function (e) {
                                    return e[nVal.propName] != nVal.findValue;
                                });
                            }
                        });
                        node[nVal.name] = node[nVal.name].filter(function (e) {
                            return e[nVal.propName] != nVal.findValue;
                        });
                    }
                }
            });
            return node;
        });
        if (!isNaN(removeIdx)) {
            tData.splice(removeIdx, 1);
        }
        return tData;
    } else {
        return [];
    }
}

export function flat(r, a, field) {
    //var objInternal = this;
    var b = {};
    Object.keys(a).forEach(function (k) {
        if (k !== field) {
            b[k] = a[k];
        }
    });
    r.push(b);
    if (Array.isArray(a[field])) {
        //b[field] = a[field].map(function (a) { return a;/*.id;*/ });
        return a[field].reduce((x, y) => {
            return flat(x, y, field);
        }, r);
    }
    return r;
}

export function flattenChildren(arr, field, field2, children = []) {
    // let objInternal = this;
    if (arr !== undefined && Array.isArray(arr) && arr.length !== 0) {
        arr.map((child) => {
            if (child !== undefined) {
                if (Array.isArray(child)) {
                    flattenChildren(child, field, field2, children);
                } else {
                    children.push(child);
                    flattenChildren(child[field][field2], field, field2, children);
                }
            }
        });
    } else if (arr !== undefined && arr !== null && typeof arr === "object") {
        children.push(arr);
        if (arr[field] !== undefined && arr[field] !== null && arr[field][field2] !== undefined && arr[field][field2] !== null) {
            if (arr.props && arr.props.fieldType && arr.props.fieldType == "multipick") {
                return children;
            } else {
                flattenChildren(arr[field][field2], field, field2, children);
            }
        }
    }
    return children;
}

export function mapDetail(state, values) {
    try {
        _.keys(values).map((key) => {
            if (state[key]) {
                state[key].value = values[key];
            }
        });
        return state;
    } catch (e) {
        console.log("error mapping details: ", e);
        return {};
    }
}

export function createValueMappings(values) {
    try {
        var state = {};
        _.keys(values).map((key) => {
            state[key] = { value: values[key] };
        });
        return state;
    } catch (e) {
        console.log("error mapping details: ", e);
        return {};
    }
}

export function mapDetailSubClass(state, values) {
    try {
        _.keys(values).map((key) => {
            if (state[key]) {
                if (state[key].subClass) {
                    state[key].record = _.merge({}, state[key].record, createValueMappings(values[key].record));
                } else {
                    state[key].value = values[key];
                }
            } else {
                state[key] = { value: values[key] };
            }
        });
        return state;
    } catch (e) {
        console.log("error mapping details: ", e);
        return {};
    }
}

export function unMapDetail(state) {
    try {
        state = _.merge({}, state);
        _.map(_.keys(state), (key) => {
            //check whether the value should be ignored
            if (state[key] && (!state[key].hasOwnProperty("ignoreDb") || state[key].ignoreDb == false)) {
                //sql is one dimensional, check if the supplied value is an array
                if (state[key].value instanceof Array) {
                    if (state[key].value.length > 0) {
                        //check whether the array item is an object
                        if (state[key].value[0] instanceof Object) {
                            //if it is an object, default to the id
                            if (state[key].value[0] && state[key].value[0].id) {
                                state[key] = state[key].value[0].id;
                            } else {
                                state[key] = null;
                            }
                        } else {
                            state[key] = state[key].value[0];
                        }
                    } else {
                        state[key] = null;
                    }
                } else if (state[key].value instanceof Object) {
                    if (state[key].value && state[key].value.id) {
                        state[key] = state[key].value.id;
                    } else {
                        state[key] = null;
                    }
                } else {
                    state[key] = state[key].value;
                }
            } else {
                delete state[key];
            }
        });
        return state;
    } catch (e) {
        return {};
    }
}

export function unMapDetailSubClass(state) {
    try {
        var subClasses = [];
        _.map(_.keys(state), (key) => {
            //check whether the value should be ignored
            if (state[key] && (!state[key].ignoreDb || (state[key].hasOwnProperty("ignoreDb") && state[key].ignoreDb == false))) {
                //sql is one dimensional, check if the supplied value is an array
                if (state[key].value instanceof Array) {
                    if (state[key].value.length > 0) {
                        //check whether the array item is an object
                        if (state[key].value[0] instanceof Object) {
                            //if it is an object, default to the id
                            if (state[key].value[0] && state[key].value[0].id) {
                                state[key] = state[key].value[0].id;
                            } else {
                                state[key] = null;
                            }
                        } else {
                            state[key] = state[key].value[0];
                        }
                    } else {
                        state[key] = null;
                    }
                } else if (state[key].value instanceof Object) {
                    if (state[key].value && state[key].value.id) {
                        state[key] = state[key].value.id;
                    } else {
                        state[key] = null;
                    }
                } else {
                    state[key] = state[key].value;
                }
            } else {
                if (state[key].ignoreDb && state[key].subClass) {
                    subClasses.push({ key, record: unMapDetail(state[key].record), parentFields: state[key].includeParentFields });
                }
                delete state[key];
            }
        });
        return { main: state, subClasses };
    } catch (e) {
        return {};
    }
}

export function unMapDetailSearch(state) {
    try {
        _.map(_.keys(state), (key) => {
            //check whether the value should be ignored
            if (state[key] && (!state[key].hasOwnProperty("ignoreDb") || state[key].ignoreDb == false)) {
                var op = state[key].operator && state[key].operator.op ? state[key].operator.op : null;

                //sql is one dimensional, check if the supplied value is an array
                if (state[key].value instanceof Array) {
                    if (state[key].value.length > 0) {
                        if (state[key].multiple && state[key].multiple == true) {
                            var stateValues = _.map(state[key].value, (v) => {
                                if (v instanceof Object) {
                                    return v.id ? v.id : null;
                                } else {
                                    return v;
                                }
                            });
                            state[key] = op ? { value: stateValues, op } : stateValues;
                        } else {
                            //check whether the array item is an object
                            if (state[key].value[0] instanceof Object) {
                                //if it is an object, default to the id
                                if (state[key].value[0] && state[key].value[0].id) {
                                    state[key] = op ? { value: state[key].value[0].id, op } : state[key].value[0].id;
                                } else {
                                    state[key] = null;
                                }
                            } else {
                                state[key] = op ? { value: state[key].value[0], op } : state[key].value[0];
                            }
                        }
                    } else {
                        state[key] = null;
                    }
                } else if (state[key].value instanceof Object) {
                    if (state[key].value && state[key].value.id) {
                        state[key] = op ? { value: state[key].value.id, op } : state[key].value.id;
                    } else {
                        state[key] = null;
                    }
                } else {
                    state[key] = op ? { value: state[key].value, op } : state[key].value;
                }
            } else {
                delete state[key];
            }
        });
        return state;
    } catch (e) {
        return {};
    }
}

export function tempId() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}

export function validateChecklist(checklistItems, checklistRecord) {
    if (checklistRecord) {
        var messages = [];
        Object.keys(checklistRecord).map((cli) => {
            var item = _.find(checklistItems, { name: cli });
            //default the check to being required if null or true
            if (item && (!item.isrequired || (item.isrequired && item.isrequired == true))) {
                if (!checklistRecord[cli].value || checklistRecord[cli].value == "") {
                    messages.push(`${item.caption} is required.`);
                }
            }
        });
        return messages && messages.length > 0 ? { valid: false, message: messages } : { valid: true, message: "" };
    } else {
        return { valid: true, message: "" };
    }
}

export function downloadFile(fileData, fileName) {
    if (fileData && fileName) {
        fileDownload(fileData, fileName);
    } else {
        return null;
    }
}

export function parseGoogleAddress(addressData, selectedAddress) {
    var address = {};
    if (addressData && addressData.length > 0) {
        var addressBase = addressData[0];
        if (addressBase && addressBase.address_components && addressBase.address_components.length > 0) {
            var streetNumber, route, city, province, country, postalCode;
            var subLocality1, subLocality2, subLocality3;
            var cityLocality, cityAdminLevel1, cityPostalTown;
            let suiteNumber;
            let abLocality = false;
            let cityLocalityFlag = false;

            addressBase.address_components.forEach((comp) => {
                if (comp.types && comp.types.length > 0) {
                    if (comp.types.indexOf("street_number") >= 0) {
                        streetNumber = comp.long_name;
                    }
                    if (comp.types.indexOf("route") >= 0) {
                        route = comp.long_name;
                    }
                    if (comp.types.indexOf("sublocality_level_3") >= 0) {
                        subLocality3 = comp.long_name;
                    }
                    if (comp.types.indexOf("sublocality_level_2") >= 0) {
                        subLocality2 = comp.long_name;
                    }
                    if (comp.types.indexOf("sublocality_level_1") >= 0) {
                        subLocality1 = comp.long_name;
                    }

                    if (comp.types.indexOf("subpremise") >= 0) {
                        // TFS
                        // Aug 31, 2022
                        // Parse only suite number to add to front of street address
                        suiteNumber = comp.long_name.replace(/[^0-9]/g, "");
                    }

                    if (comp.types.indexOf("locality") >= 0 && comp.types.indexOf("political") >= 0) {
                        cityLocalityFlag = true;
                        cityLocality = comp.long_name;

                        if (comp.long_name == "AB") {
                            // Jan. 06, 2023, Bug 124
                            // Flag to use admin area level 2 in outskirts of Alberta area
                            abLocality = true;
                        }
                    } else {
                        if (comp.types.indexOf("postal_town") >= 0) {
                            cityPostalTown = comp.long_name;
                        } else if (comp.types.indexOf("administrative_area_level_1") >= 0 && comp.types.indexOf("political") >= 0) {
                            cityAdminLevel1 = comp.long_name;
                        }
                    }

                    // DevOps 696
                    // May 12, 2023
                    // Added check for presence of Locality object - Use Admin Area level 2 if not found
                    if (
                        (comp.types.indexOf("administrative_area_level_2") >= 0 && comp.types.indexOf("political") >= 0 && abLocality) ||
                        (comp.types.indexOf("administrative_area_level_2") >= 0 && comp.types.indexOf("political") >= 0 && !cityLocalityFlag)
                    ) {
                        cityLocality = comp.long_name;
                    }

                    if (cityLocality) {
                        city = cityLocality;
                        if (comp.types.indexOf("administrative_area_level_1") >= 0 && comp.types.indexOf("political") >= 0) {
                            province = comp.long_name;
                            address.province = { value: province, validationState: null, validationMessage: null };
                        }
                    } else if (cityPostalTown) {
                        city = cityPostalTown;
                    } else if (cityAdminLevel1) {
                        city = cityAdminLevel1;
                    }

                    address.city = { value: city, validationState: null, validationMessage: null };

                    if (comp.types.indexOf("country") >= 0 && comp.types.indexOf("political") >= 0) {
                        country = comp.long_name;
                        address.country = { value: country, validationState: null, validationMessage: null };
                    }
                    if (comp.types.indexOf("postal_code") >= 0) {
                        postalCode = comp.long_name;
                        address.postalcode = { value: postalCode, validationState: null, validationMessage: null };
                    }
                }
            });

            //Address 2
            var address2;
            if (selectedAddress) {
                var arrAddress = selectedAddress.split(",");
                if (arrAddress && arrAddress.length > 3) {
                    if (arrAddress.indexOf(city) > 1) {
                        address2 = arrAddress[1];
                    }
                }
            }

            //Street Address Logic
            if (streetNumber && route) {
                address.address1 = {
                    value: `${suiteNumber ? `${suiteNumber}-` : ""}${streetNumber ? streetNumber : ""} ${route ? route : ""}`,
                    validationState: null,
                    validationMessage: null,
                };
                address.address2 = { value: address2 ? address2 : null };
            } else if (subLocality3 && subLocality2 && subLocality1) {
                address.address1 = { value: subLocality3 ? subLocality3 : null, validationState: null, validationMessage: null };
                address.address2 = { value: subLocality2 ? subLocality2 : null, validationState: null, validationMessage: null };
            } else if (subLocality2 && subLocality1) {
                address.address1 = { value: subLocality2 ? subLocality2 : null, validationState: null, validationMessage: null };
                address.address2 = { value: subLocality1 ? subLocality1 : null, validationState: null, validationMessage: null };
            } else if (subLocality1) {
                address.address1 = { value: subLocality1 ? subLocality1 : null, validationState: null, validationMessage: null };
                address.address2 = { value: address2 ? address2 : null, validationState: null, validationMessage: null };
            } else if (selectedAddress.split(",").length > 0) {
                address.address1 = {
                    value: selectedAddress.split(",")[0] ? selectedAddress.split(",")[0] : null,
                    validationState: null,
                    validationMessage: null,
                };
                address.address2 = { value: address2 ? address2 : null, validationState: null, validationMessage: null };
            }

            //PlaceID to know whether it was searched or typed
            if (addressBase.place_id) {
                address.placeid = { value: addressBase.place_id };
                address.isvalidated = { value: true };
            }
            return address;
        } else {
            return address;
        }
    } else {
        return address;
    }
}

/**
 *
 *
 * @export validator
 *
 * https://validatejs.org/#validate-js
 * Utilize validatejs for validation on the following
 * data types:
 * number
 * date
 * datetime
 * bool
 * field types:
 * email
 * password
 * postalcode
 * card
 *
 * @param {string} caption the caption property
 * @param {string} name  the fieldName property
 * @param {string|object} value the value provide
 * @param {string} type the dataType or type property
 * @param {bool} required the isRequired property
 * @param {string} format the format in which the string displays
 * @param {object} constraints the custom
 * @returns
 */
export function validator(caption, name, value, type, required = false, format = null, constraints = null, customMessage) {
    let result = {
            validationState: null,
            validationMessage: null,
        },
        falsity;

    //Required validation
    if (required) {
        if (validate.isEmpty(value) && caption) {
            setValidationResult(result, `${caption} is required`);
            return result;
        } else if (value === "false" && caption) {
            setValidationResult(result, `${caption} is required`);
            return result;
        } else if (validate.isEmpty(value) && customMessage) {
            setValidationResult(result, `${customMessage}`);
            return result;
        } else {
            setValidationResult(result);
        }
    }

    //Data type validation
    if (type === "number") {
        if (!constraints) {
            if (isNaN(value)) {
                setValidationResult(result, customMessage ? customMessage : caption ? `${caption} must be a number` : "Must be a number");
            } else {
                setValidationResult(result);
            }
        } else {
            falsity = validate(
                {
                    [name]: value,
                },
                constraints,
            );
            setValidationResult(result, falsity, name);
        }
    } else if (type === "phonenumber") {
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        pattern: /^[ 0-9\.\-\(\)\+]*$/,
                        message: "^Invalid phone number",
                    },
                },
            };
        }

        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (type == "date" || type == "datetime") {
        if (!constraints) {
            if (moment(value, format, true).isValid()) {
                setValidationResult(result);
            } else if (required == false && (value == "" || value == null || value == undefined)) {
                falsity = undefined;
            } else {
                setValidationResult(result, caption ? `${caption} is an invalid date` : "Invalid date");
            }
        } else {
            falsity = validate(
                {
                    [name]: value,
                },
                constraints,
            );
            setValidationResult(result, falsity, name);
        }
    } else if (type === "birthdate") {
        if (!moment(value, format, true).isValid()) {
            setValidationResult(result, caption ? `${caption} is an invalid date` : "Invalid date");
        } else if (moment().diff(value, "years", true) < 18) {
            setValidationResult(result, "Should be at least 18 years old");
        } else {
            setValidationResult(result);
        }
    } else if (type == "datarange") {
    } else if (type === "bool") {
    } else if (type === "string") {
        if (!constraints) {
            setValidationResult(result);
        } else {
            falsity = validate(
                {
                    [name]: value,
                },
                constraints,
            );
            setValidationResult(result, falsity, name);
        }

        //Field type validation
    } else if (type === "email") {
        /******** Define default constraints for email **********/
        if (!constraints) {
            constraints = {
                [name]: {
                    email: {
                        message: "^Please insert a valid email address",
                    },
                },
            };
        }

        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );

        // tfs 8186 => set email field not required in firm Demographics Address MultipickModal
        // when that field is empty, validate still results an error,
        // over-write falsity's error when email field is not required, and having an empty/null value
        // also should not use validate.isEmpty(value), as it should block when value = "  "
        // Jan-24-2022
        if (required != true && (value == "" || value == null || value == undefined)) {
            falsity = undefined;
        }
        //////

        setValidationResult(result, falsity, name);
    } else if (type == "username") {
        /******** Define default constraints for user name **********/
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        pattern: /need put up a pattern/,
                        message: "Define your own message",
                    },
                },
            };
        }

        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (type === "password") {
        /******** Define default constraints for password **********/
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        /*
                          Minimum eight characters, at least one letter and one number:
                          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

                          Minimum eight characters, at least one letter, one number and one special character:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

                          Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

                          Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/

                          Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/

                        */

                        //Minimum eight characters, at least one letter, one number and one special character:
                        pattern: /^(?=.{8,}$)(?=.*[A-Za-z])(?=.*[0-9])(?=.*\W).*$/,
                        message:
                            "^Invalid password. Valid password must contain minimum eight characters, at least one letter, one number and one special character.",
                    },
                },
            };
        }

        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (type === "postalcode") {
        /******** Define default constraints for canadian postal code **********/
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        //Format T1T 1T1
                        pattern: /^[A-Z]\d[A-Z]\s{1}\d[A-Z]\d$/,
                        message: "^Invalid postal code. Valid postal code format is A1A 1A1.",
                    },
                },
            };
        }

        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (type === "creditcard") {
        /******** Define default constraints for major credit cards **********/
        //Visa
        //  /^(?:4[0-9]{12}(?:[0-9]{3})?)$/

        //MasterCard
        //  /^(?:5[1-5][0-9]{14})$/

        //American express
        // /^(?:3[47][0-9]{13})$/

        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        pattern: /^((?:4[0-9]{12}(?:[0-9]{3})?)|(?:5[1-5][0-9]{14})|(?:3[47][0-9]{13}))$/,
                        message: "^Invalid credit card number. Please verify card number.",
                    },
                },
            };
        }

        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (type === "cvv") {
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        pattern: /^[0-9]{3}$/,
                        message: "^Invalid CVV. CVV must be exactly 3 digits.",
                    },
                },
            };
        }

        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (type === "cvvAmEx") {
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        pattern: /^[0-9]{4}$/,
                        message: "^Invalid CVV. CVV must be exactly 4 digits.",
                    },
                },
            };
        }

        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (type === "name") {
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        pattern: /^(.+)$/,
                        message: "^This field cannot be left blank.",
                    },
                },
            };
        }
        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (type === "chequenumber") {
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        pattern: /^[0-9]{1,}$/,
                        message: "^Invalid cheque number. Cheque number must be 1 or more digits.",
                    },
                },
            };
        }
        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (type === "cpacanadanumber") {
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        pattern: /^[cC][0-9]{5,}$/,
                        message: "^Invalid CPA Canada number. Must begin with a C, followed by a minimum of 5 digits (ex. C12345678)",
                    },
                },
            };
        }
        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (type === "questiontextanswer") {
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        pattern: /^(.+)$/,
                        message: "^Explanation cannot be left blank.",
                    },
                },
            };
        }
    } else if (type === "years") {
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        pattern: /^[1-9]([0-9])?$/,
                        message: "^Invalid number of years. Years must be 1 or 2 digit(s).",
                    },
                },
            };
        }
        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (required && type === "year") {
        if (!constraints) {
            constraints = {
                [name]: {
                    format: {
                        pattern: /^[0-9]{4}$/,
                        message: "^Invalid year. Year must be 4 digits.",
                    },
                },
            };
        }
        falsity = validate(
            {
                [name]: value,
            },
            constraints,
        );
        setValidationResult(result, falsity, name);
    } else if (type === "select") {
        if (!constraints) {
            if (required && (value === null || value === "Please select" || value === "Please Select")) {
                setValidationResult(result, customMessage ? `${customMessage}` : caption ? `${caption} is required` : "This field is required"); // check if customMessage exists before using default
                return result;
            }
        }
    } else if (type === "addresstype") {
        // Special case for address type in member profile
        if (!constraints) {
            if (value === null || value === "Please select" || value === "Please Select") {
                setValidationResult(result, caption ? `${caption} is required` : "This field is required");
                return result;
            } else {
                return;
            }
        }
    }

    return result;
}

/**
 * @param {object} result the validation result
 * @param {string|object} [falsity=null] object returned from validate method or error message
 * @param {string} name the field name
 */
function setValidationResult(result, falsity = null, name = null) {
    if (falsity) {
        result.validationState = "error";
        result.validationMessage = _.isString(falsity) ? falsity : _.isArray(falsity[name]) ? falsity[name].join(" ") : "Invalid Error Message!";
    } else {
        result.validationState = "success";
        result.validationMessage = null;
    }
}

export function sanitizeInput(request) {
    var cleaned = {};
    for (var key in request) {
        if (request[key]) {
            cleaned[key] = sanitizeHTML(request[key], {
                allowedTags: [],
                allowedAttributes: {},
            });
        }
    }

    return cleaned;
}

export function downloadFileNotifications(filePath, fileName) {
    axios({
        url: `https://localhost/action/notificationsDownloadFile?fileName=${fileName}&filePath=${filePath}`,
        method: "GET",
        responseType: "blob", // important
    })
        .then((response) => {
            if (response.data) {
                // Add a null value option to the start to indicate that these inputs need to be selected
                downloadFile(response.data, fileName);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

export function findRecordInState(state, key, value) {
    let path = [];
    let record;
    let newState;

    if (state && key && value) {
        JSON.stringify(state, (_, nestedObject) => {
            if (nestedObject && nestedObject[key] === value) {
                record = nestedObject;
            }

            return nestedObject;
        });
    } else if (state && key) {
        JSON.stringify(state, (objectKey, nestedObject) => {
            if (nestedObject !== null && typeof nestedObject === "object") {
                nestedObject.parent = objectKey;
            }

            if (nestedObject && nestedObject[key] && nestedObject[key].value) {
                record = nestedObject;
            }

            return nestedObject;
        });
    }

    return { path, record };
}

export function addressValidation(addressRecord) {
    let messages = [];
    let isValid = true;

    _.map(addressRecord, (object, key) => {
        let validationState = object.validationState;
        let validationMessage = object.validationMessage;
        let value = object.value;

        if (object.isRequired && (value === "" || value === null)) {
            if (validationState !== undefined && validationMessage !== undefined) {
                if (validationState !== "success") {
                    isValid = false;

                    if (key === "isvalidated") {
                        validationMessage = validationMessage ? validationMessage : "You must confirm your address is correct";
                        messages.push(validationMessage);
                    }

                    if (!messages.includes(validationMessage)) {
                        messages.push(validationMessage);
                    }
                }
            } else if (validationState === "error") {
                isValid = false;

                if (!messages.includes(validationMessage)) {
                    messages.push(validationMessage);
                }
            }
        }
    });

    return { record: addressRecord, isValid, messages };
}

export function employerValidation(employmentState, employerRecord) {
    let messages = [];
    let isValid = true;

    if (employerRecord.isemployed && employerRecord.isemployed.value === "yes") {
        if (employmentState.pane === "search" && employerRecord["search-clientname"].value === null) {
            isValid = false;
            messages.push("Employer Name is required");
            employerRecord["search-clientname"].validationState = "error";
            employerRecord["search-clientname"].validationMessage = "Employer Name is required";
        }

        if (employmentState.pane === "results") {
            isValid = false;
            messages.push("Please continue selecting your employer");
        }

        if (employmentState.pane === "add") {
            messages.push("Please continue adding your employer");
            _.map(employerRecord, (object, key) => {
                let validationState = object.validationState;
                let validationMessage = object.validationMessage;
                let value = object.value;

                if (object.isRequired && (value === "" || value === null)) {
                    if (validationState !== undefined && validationMessage !== undefined) {
                        if (validationState !== "success") {
                            isValid = false;

                            if (!messages.includes(validationMessage)) {
                                messages.push(validationMessage);
                            }
                        }
                    } else if (validationState === "error") {
                        isValid = false;

                        if (!messages.includes(validationMessage)) {
                            messages.push(validationMessage);
                        }
                    }
                }
            });
        }

        if (employmentState.pane === "details") {
            if (employerRecord["primaryoffice"].value === true) {
                let phone = employerRecord["phone"];
                let email = employerRecord["email"];

                phone.isRequired = true;
                email.isRequired = true;
            }

            for (var key in employerRecord) {
                // Check for values that are required except for Sector and Subsector which may not be attached to existing employers
                if (
                    employerRecord[key].isRequired === true &&
                    employerRecord[key].value === null &&
                    key !== "refsectorid" &&
                    key !== "refsubsectorid"
                ) {
                    isValid = false;
                    messages.push(employerRecord[key].caption + " is required");
                    employerRecord[key].validationState = "error";
                    employerRecord[key].validationMessage = employerRecord[key].caption + " is required";
                }
            }
        }
    } else if (employerRecord.isemployed && employerRecord.isemployed.value === null) {
        isValid = false;
        messages.push("Current employment is required");
    }

    return { record: employerRecord, isValid, messages };
}

/**
 * @param {object} state State to process
 * @param {object} validation State record after validation, any validation messages, and isValid value
 * @param {object} action Action being processed, including payload
 * @param {function} dispatch
 * @param {function} done
 */
export function workflowProcessStep(state, validation, action, dispatch, done, persist = true) {
    let messages = [...new Set(validation.messages)];
    let modState = validation.record;
    let isValid = validation.isValid;

    action.payload.area = "module";

    if (!action.payload.fieldName) {
        action.payload.fieldName = "workflow";
    }

    try {
        var workflow = getFieldDef(state, action.payload);
        var stepInfo = action.payload;

        var nRecord = _.merge({}, state[action.payload.moduleName]);
        nRecord[action.payload.area].workflow.startAtStep = stepInfo.currentStepIndex;
        nRecord[action.payload.area].workflow.currentStepIndex = stepInfo.currentStepIndex;
        nRecord[action.payload.area].workflow.submitStepIndex = stepInfo.submitStepIndex;

        // get most accurate cacheID
        // to avoid review's StepChange overwrite cacheID
        // partially related to tfs 8785/8758
        let workflowID =
            nRecord.module && nRecord.module.workflow && nRecord.module.workflow.id
                ? nRecord.module.workflow.id
                : nRecord.id
                ? nRecord.id
                : state &&
                  state.mod &&
                  state.mod[action.payload.moduleName] &&
                  state.mod[action.payload.moduleName].qs &&
                  state.mod[action.payload.moduleName].qs.value; // may not be accurate, if pss record's cacheID polluted, details on Jira: tfs 8828 / devOps 153

        var actionName, actionSuccess, actionFailed;
        if (stepInfo.currentStepIndex != stepInfo.submitStepIndex) {
            if (
                (workflow.field && !workflow.field.isSubmitted) ||
                (workflow.field.isSubmitted && stepInfo.allowStepPersistAfterSubmit && stepInfo.allowStepPersistAfterSubmit == true)
            ) {
                // Has yet to be submitted
                actionName = stepInfo.cachePersistRule;
                actionSuccess = "WORKFLOW_STEP_CHANGE_SAVE_STATE_SUCCESSFUL";
                actionFailed = "WORKFLOW_STEP_CHANGE_SAVE_STATE_FAILED";
            } else if (workflow.field && workflow.field.isSubmitted && workflow.field.stepsEnabled) {
                // Additional information workflows
                actionName = stepInfo.cachePersistRule;
                actionSuccess = "WORKFLOW_STEP_CHANGE_SAVE_STATE_SUCCESSFUL";
                actionFailed = "WORKFLOW_STEP_CHANGE_SAVE_STATE_FAILED";
            } else {
                // Viewing submitted
                actionSuccess = "WORKFLOW_ADVANCE_STEP_SUCCESSFUL";
                actionFailed = "WORKFLOW_ADVANCE_STEP_FAILED";
            }
        } else {
            if (workflow && workflow.field && workflow.field.isSubmitted && stepInfo.allowResubmit && stepInfo.allowResubmit == true) {
                //is allowed to resubmit
                actionName = stepInfo.resubmitRule;
                actionSuccess = "WORKFLOW_SAVE_SUCCESSFUL";
                actionFailed = "WORKFLOW_SAVE_FAILED";
            } else if (workflow && workflow.field && (!workflow.field.isSubmitted || workflow.field.isSubmitted == false)) {
                //has yet to be submitted
                actionName = stepInfo.submitRule;
                actionSuccess = "WORKFLOW_SAVE_SUCCESSFUL";
                actionFailed = "WORKFLOW_SAVE_FAILED";
            } else {
                //should just progress to next step
                actionSuccess = "WORKFLOW_ADVANCE_STEP_SUCCESSFUL";
                actionFailed = "WORKFLOW_ADVANCE_STEP_FAILED";
            }
        }

        if (actionName && persist === true) {
            var getCircularReplacer = () => {
                const seen = new WeakSet();
                return (key, value) => {
                    if (typeof value === "object" && value !== null) {
                        if (seen.has(value)) {
                            return;
                        }
                        seen.add(value);
                    }
                    return value;
                };
            };

            if (isValid === true) {
                let newStepIndex = stepInfo.currentStepIndex + 1;

                nRecord[action.payload.area].workflow.startAtStep = newStepIndex;
                nRecord[action.payload.area].workflow.currentStepIndex = newStepIndex;

                dispatch({
                    type: "WORKFLOW_STEP_SAVING",
                    payload: {
                        ...action.payload,
                    },
                });

                axios
                    .post(`/action/${actionName}`, {
                        workflow: JSON.parse(JSON.stringify(nRecord, getCircularReplacer())),
                        id: workflowID,
                        ps:
                            state &&
                            state.mod &&
                            state.mod[action.payload.moduleName] &&
                            state.mod[action.payload.moduleName].qs &&
                            state.mod[action.payload.moduleName].qs["ps"]
                                ? state.mod[action.payload.moduleName].qs["ps"]
                                : null,
                    })
                    .then((response) => {
                        if (response && response.data) {
                            if (response.data.hasOwnProperty("processCompleted")) {
                                // Annual Declaration application catch.
                                if (response.data.processCompleted === false) {
                                    action.payload.callback(false);
                                    dispatch({
                                        type: "SWEET_ALERT_SHOW_HIDE",
                                        payload: {
                                            ...action.payload,
                                            fieldName: "sweetalert",
                                            show: true,
                                            type: "error",
                                            bodyText: "There was an error processing the data with your submission, please try again.",
                                        },
                                    });
                                    done();
                                } else if (response.data.processCompleted === true) {
                                    dispatch({
                                        type: actionSuccess,
                                        payload: {
                                            ...action.payload,
                                            workflow: response.data && response.data.workflow ? response.data.workflow : null,
                                            isSubmitted: response.data && response.data.isSubmitted ? response.data.isSubmitted : null,
                                        },
                                    });
                                    if (response.data && response.data.status && response.data.status === "success" && response.data.redirectURL) {
                                        location.href = response.data.redirectURL;
                                    }
                                    action.payload.callback(true);
                                    dispatch({
                                        type: "WORKFLOW_STEP_VALIDATION_SUCCESSFUL",
                                        payload: {
                                            ...action.payload,
                                            newState: modState,
                                            isValid: isValid,
                                            validationState: isValid == false ? "error" : null,
                                            validationMessage: messages,
                                            toastOptions: action.payload.toastOptions,
                                        },
                                    });
                                    dispatch({
                                        type: "WORKFLOW_STEP_SAVED",
                                        payload: {
                                            ...action.payload,
                                        },
                                    });
                                    done();
                                }
                            } else {
                                // Backwards compatability
                                dispatch({
                                    type: actionSuccess,
                                    payload: {
                                        ...action.payload,
                                        workflow: response.data && response.data.workflow ? response.data.workflow : null,
                                        isSubmitted: response.data && response.data.isSubmitted ? response.data.isSubmitted : null,
                                    },
                                });
                                if (response.data && response.data.status && response.data.status === "success" && response.data.redirectURL) {
                                    location.href = response.data.redirectURL;
                                }
                                action.payload.callback(true);
                                dispatch({
                                    type: "WORKFLOW_STEP_VALIDATION_SUCCESSFUL",
                                    payload: {
                                        ...action.payload,
                                        newState: modState,
                                        isValid: isValid,
                                        validationState: isValid == false ? "error" : null,
                                        validationMessage: messages,
                                        toastOptions: action.payload.toastOptions,
                                    },
                                });
                                dispatch({
                                    type: "WORKFLOW_STEP_SAVED",
                                    payload: {
                                        ...action.payload,
                                    },
                                });
                                done();
                            }
                        } else {
                            // No response from rule
                            action.payload.callback(false);
                            dispatch({
                                type: "SWEET_ALERT_SHOW_HIDE",
                                payload: {
                                    ...action.payload,
                                    fieldName: "sweetalert",
                                    show: true,
                                    type: "error",
                                    bodyText: "There was an error connecting to the server with your application, please try again.",
                                },
                            });
                            modState.sweetalert.show = true; // Prevent WORKFLOW_STEP_VALIDATION_SUCCESSFUL from overwriting show to false
                            dispatch({ type: actionFailed, payload: { ...action.payload } });
                            done();
                        }
                    })
                    .catch((error) => {
                        isValid = false;
                        action.payload.callback(isValid);

                        dispatch({
                            type: "SWEET_ALERT_SHOW_HIDE",
                            payload: {
                                ...action.payload,
                                fieldName: "sweetalert",
                                show: true,
                                type: "error",
                                message: "Something went wrong, please try again",
                            },
                        });

                        // Prevent WORKFLOW_STEP_VALIDATION_SUCCESSFUL from overwriting show to false
                        modState.sweetalert.show = true;

                        dispatch({
                            type: "WORKFLOW_STEP_VALIDATION_INVALID",
                            payload: {
                                ...action.payload,
                                newState: modState,
                                isValid: isValid,
                                validationState: isValid == false ? "error" : null,
                                validationMessage: messages,
                                toastOptions: action.payload.toastOptions,
                            },
                        });

                        dispatch({ type: actionFailed, payload: { ...action.payload } });

                        done();
                    });
            } else {
                action.payload.callback(isValid);

                dispatch({
                    type: "WORKFLOW_STEP_VALIDATION_INVALID",
                    payload: {
                        ...action.payload,
                        newState: modState,
                        isValid: isValid,
                        validationState: isValid == false ? "error" : null,
                        validationMessage: messages,
                        toastOptions: action.payload.toastOptions,
                    },
                });
                done();
            }
        } else {
            dispatch({
                type: actionSuccess,
                payload: { ...action.payload, startAtStep: stepInfo.currentStepIndex + 1, currentStepIndex: stepInfo.currentStepIndex + 1 },
            });

            action.payload.callback(isValid);
            dispatch({
                type: "WORKFLOW_STEP_VALIDATION_INVALID",
                payload: {
                    ...action.payload,
                    newState: modState,
                    isValid: isValid,
                    validationState: isValid == false ? "error" : null,
                    validationMessage: messages,
                    toastOptions: action.payload.toastOptions,
                },
            });
            done();
        }
    } catch (error) {
        dispatch({ type: "WORKFLOW_STEP_VALIDATION_FAILED", payload: { ...action.payload, error } });
        done();
    }
}

/**
 * Recursively search through an object looking for an array of keys
 *
 * @param {Array}   collector - Array to which the matching objects are added
 * @param {Object}  target    - Object to search
 * @param {Array}   fields    - Array of keys to search for
 * @param {string}  key       - Object key for the current function iteration
 * @param {Object}  parent    - Object for the current function iteration
 */
export function recursiveSearch(collector, target, fields, key, parent) {
    if (target !== null && typeof target === "object") {
        for (const objectKey in target) {
            recursiveSearch(collector, target[objectKey], fields, objectKey, target);
        }
    } else {
        if (key && fields && fields.includes(key)) {
            if (parent && !collector.includes(parent)) {
                collector.push(parent);
            }
        }
    }
}

export function flattenObject(object) {
    let result = {};

    for (const i in object) {
        if (typeof object[i] === "object" && !Array.isArray(object[i])) {
            const temp = flattenObject(object[i]);
            for (const j in temp) {
                result[i + "." + j] = temp[j];
            }
        } else {
            result[i] = object[i];
        }
    }

    return result;
}

export function getStateAtLocation(state, location) {
    let stateValue = location.split(".").reduce((o, i) => o[i], state);
    return stateValue;
}

/**
 * Get propDef for a field given its location in state
 * @param {string} location - Location in state
 * @returns propDef object
 *
 * Example:
 *
 * location = main.module.multipick.record.name
 * returns { moduleName: main, area: module, fieldName: multipick, subFieldName: name }
 */
export function getPropDefFromLocation(location) {
    let propDef = location.split(".");

    return {
        moduleName: propDef[0] ? propDef[0] : null,
        area: propDef[1] ? propDef[1] : null,
        fieldName: propDef[2] ? propDef[2] : null,
        subFieldName: propDef[4] ? propDef[4] : null,
    };
}

export function genericValidation(state, validationMap) {
    let isValid = true;
    let messages = [];

    if (validationMap) {
        for (let [field, mapValue] of validationMap) {
            if (validationMap && validationMap.has("modalKey")) {
                if (!field.includes(validationMap.get("modalKey")) || field === validationMap.get("modalKey")) {
                    continue;
                }
            }

            let stateAtField = getStateAtLocation(state, field);

            if (stateAtField) {
                let isRequired = (stateAtField && stateAtField.isRequired) || (mapValue && mapValue.isRequired);
                let emptyValue = false;

                if (Array.isArray(stateAtField.value) && stateAtField.value.length === 0) {
                    emptyValue = true;
                } else if (stateAtField.hasOwnProperty("value") && stateAtField.value === null) {
                    emptyValue = true;
                } else if (!stateAtField.hasOwnProperty("value")) {
                    emptyValue = true;
                }

                if ((isRequired && emptyValue) || stateAtField.validationState === "error") {
                    isValid = false;
                    let message;

                    if (emptyValue) {
                        if (mapValue.customMessage) {
                            message = mapValue.customMessage;
                        } else if (mapValue.caption) {
                            message = `${mapValue.caption} is required`;
                        } else if (Array.isArray(stateAtField.value)) {
                            message = "You must add records";
                        } else {
                            message = "This field is required";
                        }

                        messages.push(message);
                    } else if (stateAtField.validationState === "error") {
                        if (stateAtField.validationMessage && !messages.includes(stateAtField.validationMessage)) {
                            messages.push(stateAtField.validationMessage);
                        }
                    }

                    let def = getPropDefFromLocation(field);
                    let m = getPayloadDef(def, {
                        validationState: !Array.isArray(stateAtField.value) ? "error" : null,
                        validationMessage: message,
                    });

                    if (state && def.moduleName && state[def.moduleName]) {
                        state[def.moduleName] = _.merge({}, state[def.moduleName], m);
                    }
                }
            }
        }
    }

    return { isValid, state, messages };
}

export function agGridDateToLocaleString(value) {
    if (value) {
        return moment(value).local().format("l");
    }
}

export default {
    getPropDef: getPropDef,
    getFieldDef: getFieldDef,
    getPayloadDef: getPayloadDef,
    getFieldLevelData: getFieldLevelData,
    dropStateValue: dropStateValue,
    manipulateTreeData: manipulateTreeData,
    mapDetail: mapDetail,
    mapDetailSubClass: mapDetailSubClass,
    unMapDetail: unMapDetail,
    unMapDetailSubClass: unMapDetailSubClass,
    unMapDetailSearch: unMapDetailSearch,
    getStateValue: getStateValue,
    tempId: tempId,
    validator: validator,
    flat: flat,
    flattenChildren: flattenChildren,
    validateChecklist: validateChecklist,
    downloadFile: downloadFile,
    parseGoogleAddress: parseGoogleAddress,
    sanitizeInput: sanitizeInput,
    downloadFileNotifications: downloadFileNotifications,
    findRecordInState,
    addressValidation,
    employerValidation,
    workflowProcessStep,
    recursiveSearch,
    flattenObject,
    getStateAtLocation,
    getPropDefFromLocation,
    genericValidation,
    dropStateValues,
    createValueMappings,
    agGridDateToLocaleString,
};
