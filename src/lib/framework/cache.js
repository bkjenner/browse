/**
 * The Application rules.
 *
 * @class Rules
 * @constructor
 */
function Cache() {}

//---------Export-------------//

module.exports = new Cache();

//----------Requires--------//

var Promise = require("bluebird");
var fs = require("fs-extra");
var path = require("path");
var _ = require("lodash");
var Db = require("../data/models");
var settings = require("../framework/settings");
var util = require("../framework/utility");
var redis = require("redis");
var client;
var cache = {};
var { logger, morganLogger } = require("./logger.js");

if (settings.cache().cacheMode == "redis") {
    var clientSettings = {
        host: settings.cache().serverHostname,
        port: settings.cache().serverPort,
    };
    if (settings.cache().serverPassword) {
        clientSettings.password = settings.cache().serverPassword;
    }
    client = redis.createClient(clientSettings);
    client.on("connect", () => {
        logger.system("Connected to redis server...");
    });
    client.on("error", function (err) {
        logger.system("error event - " + client.host + ":" + client.port + " - " + err);
    });
}

/**
 * Get value from cache
 *
 * @example
 *   Rules.getValue("name").then(() => { }).catch((err) => { });
 *
 * @method getValue
 * @param {String} name The name of the cached variable to populate
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.getValue = function (name) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.cache().cacheMode == "local") {
                //retrieve cache value from memory
                if (cache && cache[name]) {
                    resolve(cache[name]);
                } else {
                    resolve(null);
                }
            } else if (settings.cache().cacheMode == "redis") {
                //retrieve cache value from redis
                client.get(name, (err, value) => {
                    if (err) {
                        reject(err);
                    }
                    try {
                        resolve(JSON.parse(value));
                    } catch (e) {
                        resolve(value);
                    }
                });
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Set value into from cache
 *
 * @example
 *   Rules.setValue("name", 1).then(() => { }).catch((err) => { });
 *
 * @method setValue
 * @param {String} name The name of the cached variable to populate
 * @param {Object} value The value being saved to cache
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.setValue = function (name, value) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.cache().cacheMode == "local") {
                if (cache) {
                    cache[name] = value;
                    if (settings.cache().isLocalCachePersisted) {
                        objInternal
                            .persistCache(cache)
                            .then(() => {
                                resolve();
                            })
                            .catch((e) => {
                                reject(e);
                            });
                    } else {
                        resolve();
                    }
                } else {
                    resolve();
                }
            } else if (settings.cache().cacheMode == "redis") {
                //set value in redis
                if (typeof value == "object") {
                    value = JSON.stringify(value);
                }
                client.set(name, value, (err, returnValue) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Get they keys found within a hash. This method only applies to redis hashes.
 *
 * @example
 *   Rules.getHashKeys("hash").then(() => { }).catch((err) => { });
 *
 * @method getHashKeys
 * @param {String} hash The name of the hash to retrieve the keys from
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.getHashKeys = function (hash) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.cache().cacheMode == "redis") {
                //retrieve cache value from redis
                client.hkeys(hash, (err, values) => {
                    try {
                        resolve(JSON.parse(values));
                    } catch (e) {
                        resolve(values);
                    }
                });
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Get hash value from cache
 *
 * @example
 *   Rules.getHashValue("hash", "name").then(() => { }).catch((err) => { });
 *
 * @method getHashValue
 * @param {String} hash The name of the hash to retrieve from
 * @param {String} name The name of the hash key to retrieve
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.getHashValue = function (hash, name) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.cache().cacheMode == "local") {
                //In a local cache, the hash is the parent key and name is the object key within the parent
                if (cache && cache[hash] && cache[hash][name]) {
                    resolve(JSON.parse(cache[hash][name]));
                } else {
                    resolve(null);
                }
            } else if (settings.cache().cacheMode == "redis") {
                //retrieve cache value from redis
                client.hget(hash, name, (err, values) => {
                    try {
                        resolve(JSON.parse(values));
                    } catch (e) {
                        resolve(values);
                    }
                });
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Set value into from cache
 *
 * @example
 *   Rules.setHashValue("name", 1).then(() => { }).catch((err) => { });
 *
 * @method setHashValue
 * @param {String} hash The name of the hash to set
 * @param {String} name The name of the hash key to set
 * @param {Object} value The value being saved to cache
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.setHashValue = function (hash, name, value) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.cache().cacheMode == "local") {
                //In local cache the hash is used to find the parent value and the name is used as a reference to the parent object's  key
                if (cache && cache[hash]) {
                    cache[hash][name] = value;
                } else if (cache) {
                    cache[hash] = { [name]: value };
                }
                if (settings.cache().isLocalCachePersisted) {
                    objInternal
                        .persistCache(cache)
                        .then(() => {
                            resolve();
                        })
                        .catch((e) => {
                            reject(e);
                        });
                } else {
                    resolve();
                }
            } else if (settings.cache().cacheMode == "redis") {
                client.hset(hash, name, value, (err, value) => {
                    resolve();
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Deletes a key within a hash. This function only applies to Redis caches.
 *
 * @example
 *   Rules.deleteHashKey("hash", "key").then(() => { }).catch((err) => { });
 *
 * @method setHashValue
 * @param {String} hash The name of the hash to use
 * @param {String} key The name of the key to delete
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.deleteHashKey = function (hash, key) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.cache().cacheMode == "redis") {
                client.hdel(hash, key, (err, value) => {
                    resolve();
                });
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Get all hash values for key
 *
 * @example
 *   Rules.getAllHashValues("hash").then(() => { }).catch((err) => { });
 *
 * @method getAllHashValues
 * @param {String} hash The name of the hash to retrieve from
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.getAllHashValues = function (hash) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.cache().cacheMode == "local") {
                //In a local cache, the hash is the parent key and name is the object key within the parent
                if (cache && cache[hash]) {
                    resolve(JSON.parse(cache[hash]));
                } else {
                    resolve(null);
                }
            } else if (settings.cache().cacheMode == "redis") {
                //retrieve cache value from redis
                client.hgetall(hash, (err, values) => {
                    try {
                        resolve(JSON.parse(values));
                    } catch (e) {
                        resolve(values);
                    }
                });
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Set all keys for a hash
 *
 * @example
 *   Cache.setAllHashValues("hash").then(() => { }).catch((err) => { });
 *
 * @method setAllHashValues
 * @param {String} hash The name of the hash to assign
 * @param {Object} values The key values to assign to the hash
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.setAllHashValues = function (hash, values) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.cache().cacheMode == "local") {
                //In a local cache, the hash is the parent key and name is the object key within the parent
                if (cache) {
                    cache[hash] = values;
                } else {
                    resolve(null);
                }
            } else if (settings.cache().cacheMode == "redis") {
                //retrieve cache value from redis
                client.hmset(hash, values, (err, values) => {
                    resolve();
                });
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Check if cache value exists
 *
 * @example
 *   Rules.cacheExists("name").then(() => { }).catch((err) => { });
 *
 * @method getValue
 * @param {String} name The name of the cached variable to check
 * @return {Boolean} Resolves with boolean
 */
Cache.prototype.cacheExists = function (name) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.cache().cacheMode == "local") {
                //retrieve cache value from memory
                if (cache && cache[name]) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else if (settings.cache().cacheMode == "redis") {
                //retrieve cache value from redis
                client.exists(name, (err, value) => {
                    resolve(value);
                });
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Check if cache hash key exists
 *
 * @example
 *   Rules.cacheExistsHash("hash", "name").then(() => { }).catch((err) => { });
 *
 * @method cacheExistsHash
 * @param {String} hash The hash to check
 * @param {String} name The name of the hash key to check
 * @return {Boolean} Resolves with boolean
 */
Cache.prototype.cacheExistsHash = function (hash, name) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.cache().cacheMode == "local") {
                //retrieve cache value from memory
                if (cache && cache[hash] && cache[hash][name]) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else if (settings.cache().cacheMode == "redis") {
                //retrieve cache value from redis
                client.hexists(hash, name, (err, value) => {
                    resolve(value);
                });
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Load rules engine cache
 *
 * @example
 *   Rules.loadCache().then(() => { }).catch((err) => { });
 *
 * @method loadCache
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.loadCache = function () {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        try {
            if (settings.cache().cacheMode == "local") {
                logger.system("loading local cache..");
                objInternal
                    .loadPersistedCache()
                    .then((rCache) => {
                        if (rCache) {
                            cache = _.merge({}, cache, rCache);
                            logger.system("persisted cache loaded..");
                            resolve();
                        } else {
                            resolve();
                        }
                    })
                    .then(() => {
                        resolve();
                    });
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Load persisted cache object
 *
 * @example
 *   Rules.loadPersistedCache().then(() => { }).catch((err) => { });
 *
 * @method loadPersistedCache
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.loadPersistedCache = function () {
    return new Promise((resolve, reject) => {
        try {
            var path = `${settings.cache().cachePersistPath}cache.json`;
            if (fs.existsSync(path)) {
                logger.system("loading persisted local cache..");
                fs.readFile(path, "utf8", function (err, data) {
                    if (err) reject(err);
                    resolve(JSON.parse(data));
                });
            } else {
                logger.system("local cache is not persisted..");
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Persist Cache object to file
 *
 * @example
 *   Rules.persistCache(cache).then(() => { }).catch((err) => { });
 *
 * @method persistCache
 * @param {Object} obj The cache object to persist
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.persistCache = function (cache) {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(`${settings.cache().cachePersistPath}cache.json`, JSON.stringify(cache), function (err) {
                if (err) reject(err);
                resolve();
            });
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Populate rules engine cache
 *
 * @example
 *   Rules.populateLocalCache().then(() => { }).catch((err) => { });
 *
 * @method populateCache
 * @return {Object} Resolves with null or rejects with error
 */
Cache.prototype.populateLocalCache = function (obj = {}) {
    var objInternal = this;
    return new Promise((resolve, reject) => {
        obj.recordstatus = "A";
    });
};

//----------Routes--------------//
Cache.prototype.initialize = function (app) {
    var objInternal = this;

    objInternal.loadCache().then(() => {});
};
