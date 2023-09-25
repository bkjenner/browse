/**
 * The framework module loader.
 *
 * @class Loader
 * @constructor
 */
function Loader() {}

module.exports = new Loader();

var Promise = require("bluebird");
var fs = require("fs-extra");
var path = require("path");
var Db = require("../data/models");
var settings = require("./settings");
var os = require("os");
var _ = require("lodash");
var rulesEngine = require("./rulesengine");
var admin = require("./modules/admin");
var { logger, morganLogger } = require("./logger.js");

//----------Routes--------------//
Loader.prototype.initialize = function (app) {
    logger.system("Initializing framework modules..");
    rulesEngine.initialize(app);
    admin.initialize(app);
    logger.system("Finished initializing framework modules..");
    logger.system("Associating data models..");
    let models = Db.models;
    try {
        Object.keys(models).forEach((model) => {
            if (models[model].associate) {
                models[model].associate(Db);
            }
        });
    } catch (e) {
        logger.system("Error associating data models", e);
    }
    logger.system("Finished associating data models..");
};
