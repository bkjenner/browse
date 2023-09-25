const morgan = require("morgan");
const winston = require("winston");
const { createWriteStream, writeFile } = require("fs");
const path = require("path");
const settings = require("./settings");
const logDirectory = path.join(global.baseDir, "log");
const fs = require("fs");
const security = require("./security");

const terminalColorCodes = {
    reset: "\x1b[0m",
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    brightBlack: "\x1b[90m",
};

const level = () => {
    const env = process.env.NODE_ENV || "dev";
    const isDev = env === "dev";

    return isDev ? "debug" : "warn";
};

const levels = {
    error: 0,
    warn: 1,
    http: 2,
    system: 3,
    info: 4,
    debug: 5,
};

const colors = {
    error: "red",
    warn: "yellow",
    http: "blue",
    system: "cyan",
    info: "grey",
    debug: "magenta",
};

winston.addColors(colors);

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp({ format: "HH:mm:ss" }),
            winston.format.colorize(),
            winston.format.printf(
                (message) =>
                    `[${terminalColorCodes.brightBlack}${message.timestamp}${terminalColorCodes.reset}] ${message.level}: ${message.message}`,
            ),
        ),
    }),
    new winston.transports.File({
        filename: path.join(logDirectory, "errors.log"),
        level: "error",
        format: winston.format.combine(
            winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            winston.format.colorize(),
            winston.format.printf((message) => `[${message.timestamp}] ${message.level}: ${message.message}`),
        ),
    }),
];

const logger = winston.createLogger({
    level: level(),
    levels,
    transports,
});

const morganLogger = () => {
    morgan.token("requestID", (req) => {
        return req.id;
    });

    morgan.token("userid", (req) => {
        let cookie;

        if (req.cookies.username) {
            cookie = JSON.parse(req.cookies.username);
        }

        if (req.user && req.user.id) {
            return req.user.id;
        } else if (cookie && cookie.userid) {
            return cookie.userid;
        } else if (cookie && cookie.firmid) {
            return security.decrypt(cookie.firmid);
        } else {
            return;
        }

        return;
    });

    morgan.token("coloredStatus", (req, res) => {
        let status = (typeof res.headersSent !== "boolean" ? Boolean(res.header) : res.headersSent) ? res.statusCode : undefined;

        let color =
            status >= 500
                ? terminalColorCodes.red
                : status >= 400
                ? terminalColorCodes.yellow
                : status >= 300
                ? terminalColorCodes.cyan
                : status >= 200
                ? terminalColorCodes.green
                : terminalColorCodes.reset;

        return `${color}${status}${terminalColorCodes.reset}`;
    });

    let cleanBodies = (key, value) => {
        if (["cardNumber", "expiryMonth", "expiryYear", "cardSecCode", "secCode", "cardName"].includes(key)) {
            return undefined;
        }

        return value;
    };

    morgan.token("requestBody", (req, res) => {
        if (req.method == "POST") {
            return req.autosan.body;
            // return JSON.stringify(req.autosan.body, cleanBodies);
        } else {
            return req.autosan.query;
            // return JSON.stringify(req.autosan.query, cleanBodies);
        }
    });

    morgan.token("responseBody", (req, res) => {
        return JSON.stringify(res.responseBody);
    });

    morgan.token("statusText", (req, res) => {
        if (res && res.responseBody) {
            return res.responseBody[0].Status;
        }
    });

    morgan.token("shortMessage", (req, res) => {
        if (res && res.responseBody) {
            return res.responseBody[0].ShortMessage;
        }
    });

    let logFormat = ":userid :method :coloredStatus :url :response-time ms";
    let consoleErrorFormat = ":requestID :userid :method :coloredStatus :url :response-time ms";
    let fileErrorFormat = ":requestID\n:requestID :userid :method :status :url :response-time ms\n\n:requestBody\n\n:responseBody";
    let paymentFormat = ":requestID :userid :method :coloredStatus :url :statusText :shortMessage";

    return [
        morgan(logFormat, {
            skip: (req, res) => {
                return res.statusCode >= 400;
            },
            stream: {
                write: (message) => logger.http(message.substring(0, message.lastIndexOf("\n"))),
            },
        }),
        morgan(consoleErrorFormat, {
            skip: (req, res) => {
                return res.statusCode < 400;
            },
            stream: {
                write: (message) => logger.error(message.substring(0, message.lastIndexOf("\n"))),
            },
        }),
        morgan(
            (tokens, req, res) => {
                return JSON.stringify({
                    requestID: tokens.requestID(req, res),
                    log: {
                        requestID: tokens.requestID(req, res),
                        userID: tokens.userid(req, res),
                        method: tokens.method(req, res),
                        status: tokens.status(req, res),
                        url: tokens.url(req, res),
                        requestBody: tokens.requestBody(req, res),
                        responseBody: tokens.responseBody(req, res),
                    },
                });
            },
            {
                skip: (req, res) => {
                    return res.statusCode < 400;
                },
                stream: {
                    write: (message) => {
                        let object = JSON.parse(message);
                        let requestID = object.requestID;
                        let log = JSON.stringify(object.log, null, 0);

                        fs.writeFile(path.join(logDirectory, "requests", `${requestID}.json`), log, (err) => {
                            if (err) {
                                logger.error("Error writing request file for request " + requestID);
                            }
                        });
                    },
                },
            },
        ),

        // morgan(fileErrorFormat, {
        //     skip: (req, res) => {
        //         return res.statusCode < 400;
        //     },
        //     stream: {
        //         write: (message) => {
        //             let requestID = message.split("\n")[0];
        //             let log = message.split("\n")[1];

        //             fs.writeFile(path.join(logDirectory, "requests", `${requestID}.log`), log);
        //         },
        //     },
        //     // stream: fs.createWriteStream(path.join(logDirectory, "requestErrors.log"), { flags: "a" }),
        // }),
    ];
};

module.exports.logger = logger;
module.exports.morganLogger = morganLogger;
