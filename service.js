global.baseDir = __dirname;

const application_root = __dirname;
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const settings = require("./src/lib/framework/settings.js");
const loader = require("./src/lib/framework/loader.js");
const io = require("socket.io");
const morgan = require("morgan");
const security = require("./src/lib/framework/security.js");
const connections = require("./src/lib/framework/connections.js");
const csrf = require("csurf");
const db = require("./src/lib/data/db.js");
const _ = require("lodash");
const rulesEngine = require("./src/lib/framework/rulesengine.js");
const babel = require("@babel/core");
const compression = require("compression");
const expAutoSan = require("express-autosanitizer");
const { logger, morganLogger } = require("./src/lib/framework/logger.js");
const { nanoid } = require("nanoid");
const csrfProtection = csrf({ cookie: true });
const privateKey = fs.readFileSync("./sslcert/server.key", "utf8");
const certificate = fs.readFileSync("./sslcert/server.cert", "utf8");
const credentials = { key: privateKey, cert: certificate };
const cors = require("cors");

function assignID(req, res, next) {
    req.id = nanoid(5);
    next();
}

async function service() {
    /* Create Server */
    const app = express();
    const server = https.createServer(credentials, app);

    app.use(
        bodyParser.json({ limit: "50mb" }),
        bodyParser.text({ type: "text/*" }),
        bodyParser.urlencoded({ extended: true }),
        cookieParser(settings.system().cookieKey),
        security.initAuthentication(),
        compression(),
        express.static(path.join(__dirname, "/app/assets/images")), // Serve static resources from the images folder
        express.static(path.join(__dirname, "/src/assets")),
        expAutoSan.all,
        assignID,
        morganLogger(),
    );

    loader.initialize(app);

    app.use("/", csrfProtection, express.static(path.join(application_root, "/app")));
    app.all("/*", csrfProtection, function (req, res) {
        res.cookie("csrfToken", req.csrfToken());
        res.sendFile(path.join(application_root, "/app", "index.html"));
    });

    connections.initialize(io(server));
    logger.log("system", "HTTPS service listening on port:" + settings.system().sslServicePort);

    var transpiledScript = babel.transform("var test='preload';", {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-transform-spread",
            "@babel/plugin-transform-shorthand-properties",
        ],
    }).code;

    await new Promise((resolve) => server.listen({ port: settings.system().sslServicePort }, resolve));
}

service();
