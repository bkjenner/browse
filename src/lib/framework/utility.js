function Utility() {}

var settings = require("./settings.js");
var Promise = require("bluebird");
var _ = require("lodash");
var fs = require("fs-extra");
var os = require("os");
var sanitizeHTML = require("sanitize-html");

module.exports = new Utility();

Utility.prototype.treeify = function (data, idField = "id", parentField = "parentid") {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        resolve(objInternal.transformToTree([].concat(data), idField, parentField));
    });
};

Utility.prototype.transformToTree = function (arr, idField = "id", parentField = "parentid") {
    var objInternal = this;
    try {
        var nodes = {};
        return arr.filter(function (obj) {
            if (obj) {
                var id = obj[idField],
                    parentId = obj[parentField];

                nodes[id] = _.defaults(obj, nodes[id], { children: [] });
                parentId && (nodes[parentId] = nodes[parentId] || { children: [] })["children"].push(obj);

                return !parentId;
            } else {
                return false;
            }
        });
    } catch (e) {
        objInternal.handleError(e).then(() => {
            reject(e);
        });
    }
};

Utility.prototype.treeifySorted = function (data, idField = "id", parentField = "parentid", sortField) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        console.log("util getting sorted tree..");
        resolve(objInternal.transformToTreeSorted([].concat(data), idField, parentField, sortField));
    });
};

Utility.prototype.transformToTreeSorted = function (arr, idField = "id", parentField = "parentid", sortField) {
    var objInternal = this;
    try {
        var nodes = {};
        return _.orderBy(arr, sortField).filter(function (obj) {
            if (obj) {
                var id = obj[idField],
                    parentId = obj[parentField];

                nodes[id] = _.defaults(obj, nodes[id], { children: [] });
                parentId && (nodes[parentId] = nodes[parentId] || { children: [] })["children"].push(obj);
                return !parentId;
            } else {
                return false;
            }
        });
    } catch (e) {
        objInternal.handleError(e).then(() => {
            reject(e);
        });
    }
};

Utility.prototype.treeifyWithPath = function (data, idField = "id", parentField = "parentid") {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        //var tree = objInternal.transformToTreeWithPath([].concat(data), idField, parentField);
        var tree = objInternal.transformToTree([].concat(data), idField, parentField);
        objInternal.assignTreePaths(tree, null, idField, parentField).then((newTree) => {
            resolve(newTree);
        });
    });
};

Utility.prototype.assignTreePaths = function (data, path, idField = "id", parentField = "parentid") {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        if (data && data.length > 0) {
            Promise.map(data, (item) => {
                item.path = path ? `${path}.${item[idField]}` : item[idField];
                if (item.children && item.children.length > 0) {
                    return objInternal.assignTreePaths(item.children, item.path, idField, parentField).then((items) => {
                        item.children = items;
                        return item;
                    });
                } else {
                    return item;
                }
            }).then((tree) => {
                resolve(tree);
            });
        } else {
            resolve();
        }
    });
};

Utility.prototype.transformToTreeWithPath = function (arr, idField = "id", parentField = "parentid") {
    var objInternal = this;
    try {
        var nodes = {};
        return arr.filter(function (obj) {
            if (obj) {
                var id = obj[idField],
                    parentId = obj[parentField];

                obj.path = id && parentId && nodes[parentId] && nodes[parentId].path ? nodes[parentId].path + "." + id : id;

                nodes[id] = _.defaults(obj, nodes[id], { children: [] });

                parentId && (nodes[parentId] = nodes[parentId] || { children: [] })["children"].push(obj);

                return !parentId;
            } else {
                return false;
            }
        });
    } catch (e) {
        objInternal.handleError(e).then(() => {});
    }
};

Utility.prototype.flat = function (r, a, field) {
    var objInternal = this;
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
            return objInternal.flat(x, y, field);
        }, r);
    }
    return r;
};

Utility.prototype.flattenTree = function (tree, childrenField) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (tree) {
                resolve(
                    tree.reduce((x, y) => {
                        return objInternal.flat(x, y, childrenField);
                    }, []),
                );
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
};

Utility.prototype.unMapDetail = function (state) {
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
};

Utility.prototype.cleanObject = function (state) {
    try {
        _.map(_.keys(state), (key) => {
            if (state[key] === null || state[key] === undefined) {
                delete state[key];
            }
        });
        return state;
    } catch (e) {
        return {};
    }
};

Utility.prototype.unMapDetailSubClass = function (state) {
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
};

//----------File System Management-----------//

/**
Physically updates the setting value and if it does not exist it appends the value in the file.

@example
	Utility.upsertSettingInFile({lookupValue: "module-value", replacementValue: "new value"}).then(() => { }).catch((err) => { });

@method upsertSettingInFile
@param {Object} setting The setting object that contains the lookup value source file and replacement value.
@return {Object} result Resolves to nothing or returns an error.
**/
Utility.prototype.upsertSettingInFile = function (setting) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            objInternal
                .updateSettingInFile({
                    basename: setting.basename,
                    sourceFile: setting.sourceFile,
                    lookupValue: setting.lookupValue,
                    replacementValue: setting.replacementValue,
                })
                .then((result) => {
                    if (!result.valueUpdated) {
                        return objInternal.appendSettingInFile({
                            basename: setting.basename,
                            sourceFile: setting.sourceFile,
                            lookupValue: setting.lookupValue,
                            replacementValue: setting.replacementValue,
                        });
                    } else {
                        resolve();
                    }
                })
                .then((aResult) => {
                    resolve();
                })
                .catch((e) => {
                    objInternal.handleError(e).then(() => {
                        reject(e);
                    });
                });
        } catch (e) {
            objInternal.handleError(e).then(() => {
                reject(e);
            });
        }
    });
};

/**
Physically updates the setting value change and writes the new file.

@example
	Utility.updateSettingInFile({lookupValue: "module-value", replacementValue: "new value"}).then(() => { }).catch((err) => { });

@method updateSettingInFile
@param {Object} setting The setting object that contains the lookup value source file and replacement value.
@return {Object} result Resolves to nothing or returns an error.
**/
Utility.prototype.updateSettingInFile = function (setting) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(setting.sourceFile, "utf8", function (err, fileData) {
                if (err) {
                    reject(err);
                } else {
                    var startKey =
                        setting.basename && setting.basename != ""
                            ? "/*sys-begin-" + setting.lookupValue + "-" + setting.basename + "*/"
                            : "/*sys-begin-" + setting.lookupValue + "*/";

                    var endKey =
                        setting.basename && setting.basename != ""
                            ? "/*sys-end-" + setting.lookupValue + "-" + setting.basename + "*/"
                            : "/*sys-end-" + setting.lookupValue + "*/";

                    if (fileData.indexOf(startKey) > -1 && fileData.indexOf(endKey) > -1) {
                        var strHeader = fileData.split(startKey)[0];
                        var strFooter = fileData.split(endKey)[1];
                        var newContent = startKey.concat(setting.replacementValue, endKey);
                        var newData = strHeader.concat(newContent, strFooter);

                        fs.writeFile(setting.sourceFile, newData, function (err) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({ valueUpdated: true });
                            }
                        });
                    } else {
                        resolve({ valueUpdated: false });
                    }
                }
            });
        } catch (e) {
            objInternal.handleError(e).then(() => {
                reject(e);
            });
        }
    });
};

/**
Physically appends the setting value to the existing area and writes the new file.

@example
	Utility.appendSettingInFile({lookupValue: "module-value", replacementValue: "new content"}).then(() => { }).catch((err) => { });

@method appendSettingInFile
@param {Object} setting The setting object that contains the lookup value source file and replacement value.
@return {Object} result Resolves to nothing or returns an error.
**/
Utility.prototype.appendSettingInFile = function (setting) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(setting.sourceFile, "utf8", function (err, fileData) {
                if (err) {
                    reject(err);
                } else {
                    var startKey = "/*sys-begin-" + setting.lookupValue + "*/";
                    var endKey = "/*sys-end-" + setting.lookupValue + "*/";
                    var startKeyInternal = "/*sys-begin-" + setting.lookupValue + "-" + setting.basename + "*/";
                    var endKeyInternal = "/*sys-end-" + setting.lookupValue + "-" + setting.basename + "*/";

                    if (fileData.indexOf(startKey) > -1 && fileData.indexOf(endKey) > -1) {
                        var strHeader = fileData.split(startKey)[0];
                        var existingContent = fileData.split(startKey)[1].split(endKey)[0];
                        var strFooter = fileData.split(endKey)[1];
                        var newContent = setting.basename
                            ? startKey + existingContent + startKeyInternal + setting.replacementValue + endKeyInternal + os.EOL + endKey
                            : startKey + existingContent + setting.replacementValue + os.EOL + endKey;
                        var newData = strHeader.concat(newContent, strFooter);

                        fs.writeFile(setting.sourceFile, newData, function (err) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    } else {
                        reject(new Error("Setting (" + startKey + ") not found in supplied file."));
                    }
                }
            });
        } catch (e) {
            objInternal.handleError(e).then(() => {
                reject(e);
            });
        }
    });
};

//----------Error handling-----------//

Utility.prototype.handleError = function (error) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.errorLogging().consoleMessage) {
                console.log("An error has occured: ", error);
            }
            if (settings.errorLogging().logToFile) {
                objInternal.logToFile(error);
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

Utility.prototype.logToFile = function (error) {
    return new Promise((resolve, reject) => {
        try {
            fs.appendFile(`${settings.errorLogging().logPath}errors.log`, `${new Date()} - ${error}\n`, function (err) {
                if (err) reject(err);
                resolve();
            });
        } catch (e) {
            reject(e);
        }
    });
};

//------Initialization------//

Utility.prototype.initialize = function (app) {
    var objInternal = this;
};

//------Input Sanitization ------//
Utility.prototype.sanitizeInput = function (object) {
    try {
        for (var key in object) {
            // Value itself is a string value, sanitize it
            if (object[key] && typeof object[key] === "string") {
                object[key] = sanitizeHTML(object[key], {
                    allowedTags: [],
                    allowedAttributes: {},
                });
            } else if (object[key] && typeof object[key] === "object") {
                // Value is an object, sanitize its children that are strings
                for (var property in object[key]) {
                    if (object[key][property] && typeof object[key][property] === "string") {
                        object[key][property] = sanitizeHTML(object[key][property], {
                            allowedTags: [],
                            allowedAttributes: {},
                        });
                    } else if (object[key][property] && typeof object[key][property] === "object") {
                        // Nested object
                        if (
                            object[key][property] &&
                            object[key][property].hasOwnProperty("value") &&
                            typeof object[key][property].value === "string"
                        ) {
                            // Sanitize the value
                            object[key][property].value = sanitizeHTML(object[key][property].value, {
                                allowedTags: [],
                                allowedAttributes: {},
                            });
                        }
                        if (property === "record") {
                            // Loop through and sanitize the record
                            for (var recordKey in object[key][property]) {
                                if (
                                    object[key][property][recordKey] &&
                                    object[key][property][recordKey].hasOwnProperty("value") &&
                                    object[key][property][recordKey].value &&
                                    typeof object[key][property][recordKey].value === "string"
                                ) {
                                    object[key][property][recordKey].value = sanitizeHTML(object[key][property][recordKey].value, {
                                        allowedTags: [],
                                        allowedAttributes: {},
                                    });
                                }
                            }
                        }
                        if (object[key][property] && object[key][property].hasOwnProperty("record")) {
                            for (var recordKey in object[key][property].record) {
                                if (
                                    object[key][property].record[recordKey] &&
                                    object[key][property].record[recordKey].hasOwnProperty("value") &&
                                    object[key][property].record[recordKey].value &&
                                    typeof object[key][property].record[recordKey].value === "string"
                                ) {
                                    object[key][property].record[recordKey].value = sanitizeHTML(object[key][property].record[recordKey].value, {
                                        allowedTags: [],
                                        allowedAttributes: {},
                                    });
                                }
                            }
                        }
                    }
                }
            } else {
                object[key] = object[key];
            }
        }

        return object;
    } catch (e) {
        return e;
    }
};

Utility.prototype.getPaymentMethod = function (input) {
    // Default to other
    let paymentMethodID = 0;
    let firstNum = parseInt(input.cardNumber.toString().substring(0, 1));
    let firstTwoNums = parseInt(input.cardNumber.toString().substring(0, 2));
    let firstFourNums = parseInt(input.cardNumber.toString().substring(0, 4));

    // Mastercard: Starts with 51-55 or 2221-2720
    if ((51 <= firstTwoNums && firstTwoNums <= 55) || (2221 <= firstFourNums && firstFourNums <= 2720)) {
        paymentMethodID = 12550;
        // American Express: Starts with 34 or 37
    } else if (firstTwoNums === 34 || firstTwoNums === 37) {
        paymentMethodID = 12560;
        // Visa: Starts with 4
    } else if (firstNum === 4) {
        paymentMethodID = 492;
        // Otherwise, a different credit card is being used
    } else {
        paymentMethodID = 12570;
    }

    return paymentMethodID;
};

/**
 * Take an array of invoices and return a string representation
 * of that array, in the format SQL is expecting. For example,
 * calling invoiceArrayToString(["1", "2", "3", "4"]) returns the
 * string "[1,2,3,4]"
 *
 * @param {Array} invoices - Array of invoices to convert
 */
Utility.prototype.invoiceArrayToString = function (invoices) {
    var invoicesString = "[";
    for (var index = 0; index < invoices.length; index++) {
        if (index === invoices.length - 1) {
            invoicesString = invoicesString + '"' + invoices[index] + '"' + "]";
        } else {
            invoicesString = invoicesString + '"' + invoices[index] + '"' + ",";
        }
    }
    return invoicesString;
};
