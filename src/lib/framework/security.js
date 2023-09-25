function Security() {}

module.exports = new Security();

var settings = require("./settings.js");
var util = require("./utility.js");
var Promise = require("bluebird");
var Db = require("../data/models");
var _ = require("lodash");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var Strategy = passportJWT.Strategy;
var rsa = require("node-rsa");

var userCache = [];
var securityGroupCache = [];
var securityGroupCommandsCache = [];
var securityGroupContactsCache = [];
var commandsCache = [];
var commandJoinsCache = [];
var appCommandsCache = [];
var moduleCommandsCache = [];
var userPermissions = {};
var commandStructure = {};
var appCommands = {};
var moduleCommands = {};

/**
 * Generates JWT token for a given payload based on the specified algorithm.
 *
 * @example
 *   Security.getToken(payload).then((token) => { }).catch((err) => { });
 *
 * @method getToken
 * @param {Object} payload The data to tokenize.
 * @return {Object} Resolves with null or rejects with error
 */
Security.prototype.getToken = function (payload) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            resolve(
                jwt.sign(payload, settings.system().rsaPrivateKey, {
                    expiresIn: settings.system().tokenExpiryMins,
                    issuer: "CPA Alberta",
                    algorithm: "RS256",
                }),
            );
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Verifies JWT token from a given payload.
 *
 * @example
 *   Security.verifyToken(payload).then((token) => { }).catch((err) => { });
 *
 * @method verifyToken
 * @param {Object} payload The data to verify.
 * @return {Object} Resolves with null or rejects with error
 */
Security.prototype.verifyToken = function (payload) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            resolve(jwt.verify(payload, settings.system().rsaPublicKey));
        } catch (e) {
            resolve();
        }
    });
};

/**
 * Generates JWT token for a given payload from a given token.
 *
 * @example
 *   Security.getCustomToken(payload, privateKey).then((token) => { }).catch((err) => { });
 *
 * @method genCustomToken
 * @param {Object} payload The data to tokenize.
 * @param {Object} privateKey The Private key to use for the token
 * @return {Object} Resolves with null or rejects with error
 */
Security.prototype.getCustomToken = function (payload, privateKey, signingOptions) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            resolve(jwt.sign(payload, privateKey, signingOptions));
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Verifies custom JWT token.
 *
 * @example
 *   Security.verifyCustomToken(token, publicKey).then((token) => { }).catch((err) => { });
 *
 * @method verifyCustomToken
 * @param {Object} token The token to verify.
 * @param {Object} publicKey The key that the token is verified against.
 * @return {Object} Resolves with null or rejects with error
 */
Security.prototype.verifyCustomToken = function (token, publicKey) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            resolve(jwt.verify(token, publicKey));
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Generates JWT token for a given payload based on a provider's private key.
 *
 * @example
 *   Security.getTokenRSA(payload).then((token) => { }).catch((err) => { });
 *
 * @method getTokenRSA
 * @param {Object} payload The data to tokenize.
 * @return {Object} Resolves with null or rejects with error
 */
Security.prototype.getTokenRSA = function (payload) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            //If the type is RSA then we require a provider to get their unique key pair
            Db.models[settings.system().userAccountCollection]
                .findOne({
                    where: { providerid: payload.providerid },
                })
                .then((provider) => {
                    if (provider) {
                        nProvider = JSON.parse(JSON.stringify(provider));
                        resolve(
                            jwt.sign(
                                payload.data,
                                nProvider.privatekey,
                                { algorithm: "RS256" },
                                {
                                    expiresIn: settings.system().tokenExpiryMins,
                                },
                            ),
                        );
                    } else {
                        reject(new Error("Provider not found."));
                    }
                });
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Verifies JWT token from a given payload.
 *
 * Provider and Token must provided. In order to verify the token, the provider's private key must be
 * obtained and verified against the supplied token.
 *
 * @example
 *   Security.verifyTokenRSA(payload).then((token) => { }).catch((err) => { });
 *
 * @method verifyTokenRSA
 * @param {Object} payload An object containing the provider and token.
 * @return {Object} Resolves with null or rejects with error
 */
Security.prototype.verifyTokenRSA = function (payload) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            //Get the private key for the provider
            Db.models[settings.system().userAccountCollection]
                .findOne({
                    raw: true,
                    nest: true,
                    where: { providerid: payload.providerid },
                })
                .then((provider) => {
                    if (provider) {
                        try {
                            resolve(jwt.verify(payload.token, provider.publickey));
                        } catch (e) {
                            resolve(e);
                        }
                    } else {
                        reject(new Error("Provider not found."));
                    }
                });
        } catch (e) {
            resolve(e);
        }
    });
};

/**
 * Generates an keypair for a specific bit rate.
 *
 * @example
 *   Security.genKeyPair(value, bits).then((keys) => { }).catch((err) => { });
 *
 * @method genKeyPair
 * @param {String} value The value to encrypt.
 * @param {Integer} bits The number of bits to encrypt at, i.e. 256, 512, 1024, etc. Defaulted to 256
 * @return {Object} Resolves with null or rejects with error
 */
Security.prototype.genKeyPair = function (value, bits = 256) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            var key = new rsa();
            key.generateKeyPair();
            var keys = {
                publicKey: key.exportKey("pkcs8-public-pem"),
                privateKey: key.exportKey("pkcs8-private-pem"),
            };
            resolve(keys);
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Generates bcrypt hash for payload.
 *
 * @example
 *   Security.hash(payload).then((token) => { }).catch((err) => { });
 *
 * @method hash
 * @param {Object} payload The data to hash.
 * @return {Object} Resolves with null or rejects with error
 */
Security.prototype.hash = function (payload) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            bcrypt.hash(payload, 10, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Compares the supplied password and the hashed value.
 *
 * @example
 *   Security.hash(password, hash).then((token) => { }).catch((err) => { });
 *
 * @method hash
 * @param {String} password The plain text password to check.
 * @param {String} hash The password hash to compare against.
 * @return {Object} Resolves with null or rejects with error
 */
Security.prototype.hashCompare = function (password, hash) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            bcrypt.compare(password, hash, (err, valid) => {
                if (err) reject(err);
                resolve(valid);
            });
        } catch (e) {
            reject(e);
        }
    });
};

/**
	Encrypts the text with the AES 256 bit encryption algorithm
	
	@method encrypt
	@param {String} text The string to be encrypted
	@return {String} The encrypted string 
	**/
Security.prototype.encrypt = function (text) {
    var cipher = crypto.createCipher("aes-256-cbc", settings.system().tokenKey);
    var crypted = cipher.update(text.toString(), "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
};

/**
	Decrypts a a string that was encrypted using the encrypt method.
	
	@method decrypt
	@param {String} text The string to be encrypted
	@return {String} The decrypted string 
	**/
Security.prototype.decrypt = function (text) {
    var decipher = crypto.createDecipher("aes-256-cbc", settings.system().tokenKey);
    var dec = decipher.update(text.toString(), "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
};

/**
	Encrypts the text with the AES 256 bit hex encryption algorithm
	
	@method encryptHex
	@param {String} text The string to be encrypted
	@return {String} The encrypted string 
	**/
Security.prototype.encryptHex = function (text) {
    let cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(settings.system().aesBufferKey, "hex"),
        Buffer.from(settings.system().aesIv, "hex"),
    );
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
    /*
	  var iv = crypto.randomBytes(16);
	  var cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(settings.system().aesBufferKey), iv)
	  var crypted = cipher.update(text.toString(),'utf8','hex')
	  crypted += cipher.final('hex');
	  return crypted;
	  */
};

/**
	Decrypts an AES 256 bit hex string that was encrypted using the encryptHex method.
	
	@method decrypt
	@param {String} text The string to be encrypted
	@return {String} The decrypted string 
	**/
Security.prototype.decryptHex = function (text) {
    let encryptedText = Buffer.from(text, "hex");
    let decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(settings.system().aesBufferKey, "hex"),
        Buffer.from(settings.system().aesIv, "hex"),
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
};

/**
	Cryto random bytes
	
	@method cryptoRandomBytes
	@param {Integer} length The number of bytes to generate.
	@return {String} The random byte string 
	**/
Security.prototype.cryptoRandomBytes = function (numBytes) {
    return crypto.randomBytes(numBytes);
};

/**
	Gets all users within the system.
	
	@method getUsers
	@return {Array} The corresponding array of users. 
	**/
Security.prototype.getUsers = function () {
    return new Promise((resolve, reject) => {
        Db.models[settings.system().userAccountCollection]
            .findAll({})
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
	Gets all security groups within the system.
	
	@method getSecurityGroups
	@return {Array} The corresponding array of security groups. 
	**/
Security.prototype.getSecurityGroups = function () {
    return new Promise((resolve, reject) => {
        Db.models[settings.system().securityGroupCollection]
            .findAll({})
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
	Gets all security group commands within the system.
	
	@method getSecurityGroupCommands
	@return {Array} The corresponding array of security groups commands. 
	**/
Security.prototype.getSecurityGroupCommands = function () {
    return new Promise((resolve, reject) => {
        Db.models[settings.system().securityGroupCommandCollection]
            .findAll({})
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
	Gets all security group contacts within the system.
	
	@method getSecurityGroupContacts
	@return {Array} The corresponding array of security groups contacts. 
	**/
Security.prototype.getSecurityGroupContacts = function () {
    return new Promise((resolve, reject) => {
        Db.models[settings.system().securityGroupContactCollection]
            .findAll({})
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
	Gets all commands within the system.
	
	@method getCommands
	@return {Array} The corresponding array of commands. 
	**/
Security.prototype.getCommands = function () {
    return new Promise((resolve, reject) => {
        Db.models[settings.system().commandCollection]
            .findAll({})
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
	Gets all command join within the system.
	
	@method getCommandJoins
	@return {Array} The corresponding array of command joins. 
	**/
Security.prototype.getCommandJoins = function () {
    return new Promise((resolve, reject) => {
        Db.models[settings.system().commandJoinCollection]
            .findAll({})
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
	Gets all app commands within the system.
	
	@method getAppCommands
	@return {Array} The corresponding array of app commands. 
	**/
Security.prototype.getAppCommands = function () {
    return new Promise((resolve, reject) => {
        Db.models["appcommand"]
            .findAll({})
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
	Gets all module commands within the system.
	
	@method getModuleCommands
	@return {Array} The corresponding array of module commands. 
	**/
Security.prototype.getModuleCommands = function () {
    return new Promise((resolve, reject) => {
        Db.models["modulecommand"]
            .findAll({})
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
	Build command set for users.
	
	@method buildSecurityGroupSet
	@param {Array} securityGroups An array of security groups
	@param {Array} securityGroupCommands An array of security group commands
	@param {Array} securityGroupContacts An array of security group contacts
	@return {Object} The corresponding object of user commands. 
	**/
Security.prototype.buildSecurityGroupSet = function (securityGroups, securityGroupCommands, securityGroupContacts) {
    return new Promise((resolve, reject) => {
        try {
            resolve(
                _.map(securityGroups, (group) => {
                    group.commands = _.filter(securityGroupcommands, { syssecuritygroupid: group.id });
                    group.users = _.filter(securityGroupContacts, { syssecuritygroupid: group.id });
                    return group;
                }),
            );
        } catch (e) {
            reject(e);
        }
    });
};

/**
	Build command set for users.
	
	@method buildUserCommandSet
	@param {Array} users An array of users
	@param {Array} securityGroups An array of security groups
	@return {Object} The corresponding object of user commands. 
	**/
Security.prototype.buildUserCommandSet = function (users, securityGroups) {
    return new Promise((resolve, reject) => {
        try {
            var objUsers = {};
            _.map(users, (user) => {
                user = JSON.parse(JSON.stringify(user));
                var commands = [];
                _.map(securityGroups, (group) => {
                    group = JSON.parse(JSON.stringify(group));
                    var matches = _.filter(group.users, { contactid: user.id });
                    if (matches && matches.length > 0) {
                        commands = commands.concat(group.commands);
                        return group;
                    } else {
                        return group;
                    }
                });
                user.commands = commands;
                objUsers[user.id] = user;
                return user;
            });
            resolve(objUsers);
        } catch (e) {
            reject(e);
        }
    });
};

/**
	Build command structure.
	
	@method buildSecurityGroupSet
	@param {Array} securityGroups An array of security groups
	@param {Array} securityGroupCommands An array of security group commands
	@param {Array} securityGroupContacts An array of security group contacts
	@return {Object} The corresponding object of user commands. 
	**/
Security.prototype.buildSecurityGroupSet = function (securityGroups, securityGroupCommands, securityGroupContacts) {
    return new Promise((resolve, reject) => {
        try {
            resolve(
                _.map(securityGroups, (group) => {
                    group = JSON.parse(JSON.stringify(group));
                    group.commands = _.filter(JSON.parse(JSON.stringify(securityGroupCommands)), {
                        syssecuritygroupid: JSON.parse(JSON.stringify(group)).id,
                    });
                    group.users = _.filter(JSON.parse(JSON.stringify(securityGroupContacts)), {
                        syssecuritygroupid: JSON.parse(JSON.stringify(group)).id,
                    });
                    return group;
                }),
            );
        } catch (e) {
            reject(e);
        }
    });
};

/**
	Build app command hierarchy.
	
	@method buildAppCommandHierarchy
	@param {Array} appCommands An array of application commands
	@return {Object} The corresponding object of application commands. 
	**/
Security.prototype.buildAppCommandHierarchy = function (appCommands) {
    return new Promise((resolve, reject) => {
        try {
            util.treeify(appCommands, "id", "parentid").then((tree) => {
                resolve(tree);
            });
        } catch (e) {
            reject(e);
        }
    });
};

/**
	Build module command hierarchy.
	
	@method buildModuleCommandHierarchy
	@param {Array} moduleCommands An array of application commands
	@return {Object} The corresponding object of application commands. 
	**/
Security.prototype.buildModuleCommandHierarchy = function (moduleCommands) {
    return new Promise((resolve, reject) => {
        try {
            var mod = _.groupBy(moduleCommands, "moduleid");
            var result = _.forOwn(mod, (val, key) => {
                util.treeify(val, "id", "parentid").then((tree) => {
                    mod[key].hierarchy = tree;
                });
            });
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};

/**
	Build user app command structure.
	
	@method buildUserAppCommandStructure
	@param {Object} users An object containing the user objects
	@param {Array} appCommands An array of application commands
	@return {Object} The corresponding object of application commands. 
	**/
Security.prototype.buildUserAppCommandStructure = function (users, appCommands) {
    return new Promise((resolve, reject) => {
        try {
            if (users) {
                var result = _.forOwn(users, (val, key) => {
                    if (val && val.commands && val.commands.length > 0) {
                        var commIntersect = _.intersectionBy(
                            appCommands,
                            _.map(val.commands, (c) => {
                                c.commandid = c.syscommandid;
                                return c;
                            }),
                            "commandid",
                        );
                        util.treeify(commIntersect, "id", "parentid").then((tree) => {
                            users[key].appCommandHierarchy = tree;
                        });
                    }
                });
                resolve(users);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
	Build user module command structure.
	
	@method buildUserModuleCommandStructure
	@param {Object} users An object containing the user objects
	@param {Array} moduleCommands An array of module commands
	@return {Object} The corresponding object of user module commands. 
	**/
Security.prototype.buildUserModuleCommandStructure = function (users, moduleCommands) {
    return new Promise((resolve, reject) => {
        try {
            if (users) {
                var result = _.forOwn(users, (val, key) => {
                    if (val && val.commands && val.commands.length > 0) {
                        var intersect = _.intersectionBy(
                            moduleCommands,
                            _.map(val.commands, (c) => {
                                c.commandid = c.syscommandid;
                                return c;
                            }),
                            "commandid",
                        );
                        var mods = _.groupBy(intersect, "moduleid");

                        _.forOwn(mods, (mVal, mKey) => {
                            util.treeify(mVal, "id", "parentid").then((tree) => {
                                mVal.hierarchy = tree;
                            });
                        });

                        val.moduleCommandHierarchy = mods;
                    }
                });
                resolve(users);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
	Populates user security cache.
	
	@method populateUserSecurityCache
	@return {Object} The corresponding user security cache object. 
	**/
Security.prototype.populateUserSecurityCache = function () {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        objInternal
            .getUsers()
            .then((users) => {
                userCache = JSON.parse(JSON.stringify(users));
                return objInternal.getSecurityGroups();
            })
            .then((securityGroups) => {
                securityGroupCache = securityGroups;
                return objInternal.getSecurityGroupCommands();
            })
            .then((securityGroupCommands) => {
                securityGroupCommandsCache = securityGroupCommands;
                return objInternal.getSecurityGroupContacts();
            })
            .then((securityGroupContacts) => {
                securityGroupContactsCache = securityGroupContacts;
                return objInternal.getCommands();
            })
            .then((commands) => {
                commandsCache = JSON.parse(JSON.stringify(commands));
                return objInternal.getCommandJoins();
            })
            .then((commandJoins) => {
                commandJoinsCache = commandJoins;
                return objInternal.getAppCommands();
            })
            .then((rAppCommands) => {
                appCommandsCache = JSON.parse(JSON.stringify(rAppCommands));
                return objInternal.getModuleCommands();
            })
            .then((rModuleCommands) => {
                moduleCommandsCache = JSON.parse(JSON.stringify(rModuleCommands));
                return objInternal.buildSecurityGroupSet(securityGroupCache, securityGroupCommandsCache, securityGroupContactsCache);
            })
            .then((securityGroupSet) => {
                return objInternal.buildUserCommandSet(userCache, securityGroupSet);
            })
            .then((userSecurity) => {
                userPermissions = userSecurity;
                return objInternal.buildAppCommandHierarchy(JSON.parse(JSON.stringify(appCommandsCache)));
            })
            .then((rAppCommandsH) => {
                appCommands = rAppCommandsH;
                return objInternal.buildModuleCommandHierarchy(JSON.parse(JSON.stringify(moduleCommandsCache)));
            })
            .then((rModuleCommandsH) => {
                moduleCommands = rModuleCommandsH;
                return objInternal.buildUserModuleCommandStructure(userPermissions, moduleCommandsCache);
            })
            .then((userModuleCommands) => {
                userPermissions = userModuleCommands;
                return objInternal.buildUserAppCommandStructure(userPermissions, appCommandsCache);
            })
            .then((userAppCommands) => {
                userPermissions = userAppCommands;
                resolve(userPermissions);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
	Gets permissions for all or a single user. If a user identifier is provided it will find it or return all.
	
	@method getUserPermissions
	@param {String} id The id of the user, optional
	@return {Object} The corresponding user data. 
	**/
Security.prototype.getUserPermissions = function (id) {
    return new Promise((resolve, reject) => {
        try {
            if (userPermissions) {
                if (id && userPermissions[id]) {
                    resolve(userPermissions[id]);
                } else {
                    resolve(userPermissions);
                }
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(err);
        }
    });
};

/**
	Gets user information from matching user credentials.
	
	@method getUserFromCredentials
	@param {String} username The username of the user
	@param {String} password The password of the user
	@return {Object} The corresponding user data. 
	**/
Security.prototype.getUserFromCredentials = function (username, password) {
    return new Promise((resolve, reject) => {
        Db.models[settings.system().userAccountCollection]
            .findAll({ where: { login: username, password } })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
	Gets contact information for user.
	
	@method getContactDetailsForUser
	@param {String} username The username of the user
	@param {String} password The password of the user
	@return {Object} The corresponding user data. 
	**/
Security.prototype.getContactDetailsForUser = function (id) {
    return new Promise((resolve, reject) => {
        Db.models[settings.system().contactCollection]
            .findAll({ where: { id } })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
	The login method accepts the user name and password of a user. If the user is found a session variable is created and a user token is created and returned.
	
	@method login
	@param {String} username The username of the user logging in.
	@param {String} password The password of the user logging in.
	@param {Object} callback The callback function.
	@return {Object} The result object containing success, user token, name and login date.
	**/
Security.prototype.login = function (username, password) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        if (username && username.toString() != "" && password && password.toString() != "") {
            var userDetails;
            objInternal
                .getUserFromCredentials(username.toString(), password.toString())
                .then((user) => {
                    if (user && user[0] && user[0][settings.system().mainPrimaryIdentifier]) {
                        userDetails = user[0];
                        userDetails.success = true;
                        userDetails.token = objInternal.encrypt(userDetails[settings.system().userIDField]);
                        userDetails.loginDate = new Date();
                        userDetails[settings.system().parentContactField] = userDetails[settings.system().parentContactField];
                        userDetails.username = username;

                        return objInternal.getContactDetailsForUser(userDetails[settings.system().mainPrimaryIdentifier]);
                    } else {
                        reject(new Error("username or password is incorrect"));
                    }
                })
                .then((contactData) => {
                    if (contactData && contactData[0]) {
                        if (contactData[0].firstname && contactData[0].lastname && contactData[0].lastname && contactData[0].lastname != "") {
                            userDetails.name = contactData[0].firstname && " " && contactData[0].lastname;
                        }
                    }
                    resolve(userDetails);
                });
        } else {
            reject(new Error("username and password required"));
        }
    });
};

//JWT Authentication / CSRF

/**
 * Parses JWT token from request object and returns the token if it is found.
 *
 * @example
 * 	RulesEngine.parseUserTokenFromReq(req).then((result) => { }).catch((err) => { });
 *
 * @method parseUserTokenFromReq
 * @param {Object} req The request object
 * @return {Object} Resolves with a JWT token or rejects with an error
 */
Security.prototype.parseUserTokenFromReq = function (req) {
    try {
        if (req && req.cookies && req.cookies.token) {
            return req.cookies.token;
        } else if (req && req.headers && req.headers.token && req.headers.token.split(" ")[0] == "Bearer") {
            return req.headers.token.split(" ")[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        } else {
            return null;
        }
    } catch (e) {
        util.handleError(e).then(() => {
            reject(e);
        });
    }
};

/**
 * Parses JWT token from an API request object and returns a tokenSet if it is found.
 *
 * @example
 * 	RulesEngine.parseUserTokenFromAPIReq(req).then((result) => { }).catch((err) => { });
 *
 * @method parseUserTokenFromAPIReq
 * @param {Object} req The request object
 * @return {Object} Resolves with a JWT token or rejects with an error
 */
Security.prototype.parseUserTokenFromAPIReq = function (req) {
    var objInternal = this;
    try {
        var token = objInternal.parseUserTokenFromReq(req);
        var providerid;
        if (req && req.cookies && req.cookies.providerid) {
            providerid = req.cookies.provider;
        } else if (req && req.headers && req.headers.providerid) {
            providerid = req.headers.providerid;
        } else if (req.query && req.query.providerid) {
            providerid = req.query.providerid;
        }

        return { token, providerid };
    } catch (e) {
        util.handleError(e).then(() => {
            reject(e);
        });
    }
};

/**
Initiates the JWT authentication for all secured routes.

@method login
@return {Object} The initialized passport.
**/
Security.prototype.initAuthentication = function () {
    var objInternal = this;
    var params = {
        // secretOrKey: settings.system().tokenKey,
        secretOrKey: settings.system().rsaPublicKey,
        jwtFromRequest: objInternal.parseUserTokenFromReq,
        algorithm: ["RS256"],
    };

    passport.use(
        new Strategy(params, function (payload, done) {
            if (payload.userid) {
                return done(null, { id: payload.userid });
            } else {
                return done(new Error("User identifier not found."));
            }
        }),
    );

    return passport.initialize();
};

/**
Creates the authentication middleware used by any route that requires jwt authentication

@method login
@return {Object} The initialized passport.
**/
Security.prototype.authenticate = function () {
    return passport.authenticate("jwt", { session: false, failureRedirect: "/" });
};
