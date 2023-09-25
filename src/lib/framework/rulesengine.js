function RulesEngine() {}

module.exports = new RulesEngine();

const Promise = require("bluebird");
const fs = require("fs-extra");
const path = require("path");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const os = require("os");
const _ = require("lodash");
const Db = require("../data/models");
const settings = require("./settings");
const rules = require("../rules");
const util = require("./utility");
const security = require("./security");
const cache = require("./cache.js");

/**
 * Get rule references
 *
 * @example
 * 	RulesEngine.getRuleReferences({id: 1}).then((result) => { }).catch((err) => { });
 *
 * @method getRuleReferences
 * @param {Object} obj The arguments used to filter rule
 * @return {Object} Resolves with a collection of rule references or rejects with error
 */
RulesEngine.prototype.getRuleReferences = function (obj = {}) {
    return new Promise((resolve, reject) => {
        obj.recordstatus = "A";
        Db.models.rule
            .findAll({ where: { code: { [Op.like]: `%${obj.name}%` } } })
            .then((result) => {
                var references = _.map(_.sortBy(JSON.parse(JSON.stringify(result)), "name"), (ref) => {
                    var line, char;
                    var lines = ref.code.split("\n").map((line, idx) => {
                        var charIndex = line.indexOf(obj.name);
                        if (charIndex > -1) {
                            ref.line = idx;
                            ref.char = charIndex;
                            ref.code = line;
                        }
                        return line;
                    });
                    return ref;
                });
                resolve(references);
            })
            .catch((e) => {
                util.handleError(e).then(() => {
                    reject(e);
                });
            });
    });
};

/**
 * Log that the rule was run
 *
 * @example
 * 	RulesEngine.logRule("FETCH_DATA", {field: 'value'}, 1}}).then((result) => { }).catch((err) => { });
 *
 * @method logRule
 * @param {String} action The action being executed
 * @param {Object} content The data submitted to the rule
 * @param {Object} user The userid of the user
 * @return {Object} Resolves with a log result or rejects with an error
 */
RulesEngine.prototype.logRule = function (action, content, user) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            console.log(`logging rule (${action}): ${new Date()}`);
            resolve();
        } catch (e) {
            util.handleError(e).then(() => {
                reject(e);
            });
        }
    });
};

/**
 * Executes a rule
 *
 * @example
 * 	RulesEngine.runRule("FETCH_DATA", {field: 'value'}, 1}}).then((result) => { }).catch((err) => { });
 *
 * @method runRule
 * @param {String} action The action being executed
 * @param {Object} content The data submitted to the rule
 * @param {Object} user The userid of the user
 * @return {Object} Resolves with a rule result or rejects with an error
 */
RulesEngine.prototype.runRule = function (action, content, dep, user, firm, firmType) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (rules[action] && typeof rules[action] === "function") {
                rules[action]({ ...content, ...dep, execUserId: user, execFirmId: firm, execFirmType: firmType }).then((result) => {
                    resolve(result);
                });
            } else {
                reject(new Error("Requested action could not be executed."));
            }
        } catch (e) {
            util.handleError(e).then(() => {
                reject(e);
            });
        }
    });
};

/**
 * Validates whether a user has the ability to execute the specificed action
 *
 * @example
 * 	RulesEngine.validateAction({"action": "FETCH_DATA", userId: 1}).then((result) => { }).catch((err) => { });
 *
 * @method validateAction
 * @param {String} action The action being executed
 * @param {Integer} userId The user identifier being compared against
 * @return {Object} Resolves with a boolean indicating whether the user has the authority to execute the rule otherwise it rejects with an error indicating otherwise.
 */
RulesEngine.prototype.validateAction = function (action, user) {
    return new Promise((resolve, reject) => {
        try {
            if (settings.rulesEngine().restrictedAccess) {
                var userIdentifier = user && user.userid ? user : { ...user, userid: settings.system().publicUserAccount };
                rules[settings.rulesEngine().accessControlRule]({ action, user: userIdentifier }).then((result) => {
                    resolve(result);
                });
            } else {
                var userIdentifier = user && user.userid ? user.userid : settings.system().publicUserAccount;
                resolve({ authorized: true, userId: userIdentifier });
            }
        } catch (e) {
            util.handleError(e).then(() => {
                reject(e);
            });
        }
    });
};

/**
 * Executes a rule
 *
 * @example
 * 	RulesEngine.executeRule("FETCH_DATA", {field: 'value'}, {cookie: 'asdfasdf'}}).then((result) => { }).catch((err) => { });
 *
 * @method executeRule
 * @param {String} action The action being executed
 * @param {Object} content The data submitted to the rule
 * @param {Object} user The user data context
 * @return {Object} Resolves with a rule result or rejects with an error
 */
RulesEngine.prototype.executeRule = function (action, content, dep, user) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            objInternal.logRule(action, content, user);
            objInternal
                .validateAction(action, user)
                .then((validity) => {
                    if (validity.authorized == true) {
                        return objInternal.runRule(action, content, dep, validity.userId, validity.firmId, validity.firmType);
                    } else {
                        reject(new Error(validity.error));
                    }
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    util.handleError(e).then(() => {
                        reject(e);
                    });
                });
        } catch (e) {
            util.handleError(e).then(() => {
                reject(e);
            });
        }
    });
};

/**
 * Handle the rule request
 *
 * @example
 * 	RulesEngine.handleRule(req).then((result) => { }).catch((err) => { });
 *
 * @method handleRule
 * @param {Object} req The originating request object
 * @return {Object} Resolves with a rule result or rejects with an error
 */
RulesEngine.prototype.handleRule = function (req, res) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            objInternal
                .parseUserInfoFromReq(req)
                .then((userInfo) => {
                    if (
                        true
                        // userInfo ||
                        // settings.rulesEngine().whitelist.indexOf(req.params.name) > -1 ||
                        // (req.headers && req.headers.referer && req.headers.referer.indexOf("/admin") > -1)
                    ) {
                        var suppliedData;
                        if (req.header("Referer") && req.header("Referer").indexOf("/admin") > -1) {
                            suppliedData = req.method == "POST" ? req.body : req.query;
                        } else {
                            suppliedData = req.method == "POST" ? req.autosan.body : req.autosan.query;
                        }
                        return objInternal.executeRule(req.params.name, suppliedData, { req, res }, userInfo);
                    } else {
                        res.status(401).end();
                        return { resHandled: true };
                    }
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    util.handleError(e).then(() => {
                        reject(e);
                    });
                });
        } catch (e) {
            util.handleError(e).then(() => {
                reject(e);
            });
        }
    });
};

/**
 * Adds listener for socket.io communications
 *
 * @example
 * 	RulesEngine.addSocketListeners(socket).then((result) => { }).catch((err) => { });
 *
 * @method addSocketListeners
 * @param {Object} socket The individual socket
 * @param {Object} user The user data context
 * @return {Object} Resolves with a rule result or rejects with an error
 */
RulesEngine.prototype.addSocketListeners = function (socket) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            socket.on("action", (data, callback) => {
                if (data.name && data.name != "") {
                    objInternal
                        .executeRule(data.name, data.payload, { socket }, data.decoded.userid)
                        .then((result) => {
                            if (result && (!result.resHandled || result.resHandled == false)) {
                                if (callback) {
                                    callback(result);
                                }
                            }
                        })
                        .catch((e) => {
                            util.handleError(e).then(() => {
                                if (callback) {
                                    callback(e);
                                }
                            });
                        });
                } else {
                    if (callback) {
                        callback({ error: "Action name must be provided." });
                    }
                }
            });
        } catch (e) {
            util.handleError(e).then(() => {
                reject(e);
            });
        }
    });
};

/**
 * Parses JWT token from request object and returns the encoded payload if successful.
 *
 * @example
 * 	RulesEngine.parseUserInfoFromReq(req).then((result) => { }).catch((err) => { });
 *
 * @method parseUserTokenFromReq
 * @param {Object} req The request object
 * @return {Object} Resolves with a JWT token or rejects with an error
 */
RulesEngine.prototype.parseUserInfoFromReq = function (req) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            var tokenSet = security.parseUserTokenFromAPIReq(req);
            if (tokenSet.providerid && tokenSet.token) {
                security.verifyTokenRSA(tokenSet).then((user) => {
                    resolve(user);
                });
            } else if (tokenSet.token) {
                security.verifyToken(tokenSet.token).then((user) => {
                    resolve(user);
                });
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

//----------Routes--------------//
RulesEngine.prototype.initialize = function (app, csrfProtection) {
    var objInternal = this;

    if (settings.cache().cacheMode == "local" && settings.cache().isLocalCachePersisted) {
        cache.loadCache();
    }

    app.get("/action/:name", (req, res) => {
        req.setTimeout(800000);
        if (req.params && req.params.name && req.params.name != "") {
            objInternal
                .handleRule(req, res)
                .then((result) => {
                    if (result && (!result.resHandled || result.resHandled == false)) {
                        res.send(result);
                        res.end();
                    } else {
                        res.end();
                    }
                })
                .catch((e) => {
                    util.handleError(e).then(() => {
                        res.send({ error: e.message });
                        res.end();
                    });
                });
        } else {
            res.send({ error: "Action must be provided" });
            res.end();
        }
    });

    app.post("/action/:name", (req, res) => {
        req.setTimeout(800000);

        if (req.params && req.params.name && req.params.name != "") {
            objInternal
                .handleRule(req, res)
                .then((result) => {
                    if (result && (!result.resHandled || result.resHandled == false)) {
                        res.send(result);
                        res.end();
                    } else {
                        res.send();
                        res.end();
                    }
                })
                .catch((e) => {
                    util.handleError(e).then(() => {
                        res.send({ error: e.message });
                        res.end();
                    });
                });
        } else {
            res.send({ error: "Action must be provided" });
            res.end();
        }
    });

    app.delete("/action/:name", (req, res) => {
        req.setTimeout(800000);
        if (req.params && req.params.name && req.params.name != "") {
            objInternal
                .handleRule(req, res)
                .then((result) => {
                    if (result && (!result.resHandled || result.resHandled == false)) {
                        res.send(result);
                        res.end();
                    } else {
                        res.send();
                        res.end();
                    }
                })
                .catch((e) => {
                    util.handleError(e).then(() => {
                        res.send({ error: e.message });
                        res.end();
                    });
                });
        } else {
            res.send({ error: "Action must be provided" });
            res.end();
        }
    });
};
