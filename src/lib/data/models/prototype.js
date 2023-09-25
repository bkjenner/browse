let Sequelize = require("sequelize");
let settings = require("../../framework/settings");
let Promise = require("bluebird");

if (settings.system().mainDatastore == "mssql") {
    Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
        return this._applyTimezone(date, options).format("YYYY-MM-DD HH:mm:ss.SSS");
    };
    Sequelize.DATE.prototype.toSql = function () {
        return "DATETIME";
    };
}

let db = new Sequelize(settings.system().mainDatastoreConnectionstring, {
    dialect: settings.system().mainDatastore,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 120000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
    },
    dialectOptions: {
        options: {
            requestTimeout: 100000,
            useUTC: false,
            enableArithAbort: false,
        },
    },
    timezone: "America/Edmonton",
    retry: {
        match: [/Deadlock/i],
        max: 3, // Maximum rety 3 times
        backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
        backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
    },
});

db.alterSync = function () {
    return db.sync({ alter: true });
};

db.forceSync = function () {
    return db.sync({ force: true });
};

db.baseSync = function () {
    if (settings.sysbuilder().systemDefTables && settings.sysbuilder().systemDefTables.length > 0) {
        return Promise.map(settings.system().systemDefTables, (t) => {
            return db.models[t].sync({ alter: true });
        });
    } else {
        return null;
    }
};

db.initSystem = function () {
    var objInternal = this;
    console.log("force sync..");
    return db
        .sync({ force: true })
        .then(() => {
            console.log("done syncing..");
            console.log("populating default data..");
            return objInternal.populateDefaultData(false);
        })
        .then(() => {
            console.log("done populating default data..");
        });
};

module.exports = db;
