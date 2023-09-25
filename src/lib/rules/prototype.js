const Promise = require("bluebird");
const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");
const Db = require("../data/models");
const settings = require("../framework/settings");
const util = require("../framework/utility");
const cache = require("../framework/cache");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const security = require("../framework/security");
const moment = require("moment");

function Rules() {
    r = this;

    /**
     * Log to the node service terminal in color from a rule
     * Use in place of console.log(message) if you'd like to log in color
     *
     * @param {string} [color] - Optional string value corresponding to one of the color keys below, will log
     *                           in green if color not provided
     * @param {string} message - Message to log to the terminal
     *
     * Example usage from inside a rule
     *
     *      customLogger("magenta", "This message will be logged to the terminal in the color magenta")
     */
    customLogger = (color, message) => {
        const colors = {
            reset: "\x1b[0m",
            black: "\x1b[30m",
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
        };

        console.log(`${color && colors[color] ? colors[color] : colors.green}%s${colors.reset}`, message);
    };
}

module.exports = new Rules();
