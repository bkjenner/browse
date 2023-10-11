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
var settings = require("./settings");
var cache = require("./cache");
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
};
