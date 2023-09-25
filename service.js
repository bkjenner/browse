global.baseDir = __dirname;

var application_root = __dirname,
    express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    fs = require("fs"),
    path = require("path"),
    http = require("http"),
    https = require("https"),
    settings = require("./src/lib/framework/settings.js"),
    loader = require("./src/lib/framework/loader.js"),
    io = require("socket.io"),
    morgan = require("morgan"),
    security = require("./src/lib/framework/security.js"),
    connections = require("./src/lib/framework/connections.js"),
    csrf = require("csurf"),
    Db = require("./src/lib/data/models"),
    rulesEngine = require("./src/lib/framework/rulesengine.js"),
    babel = require("@babel/core"),
    compression = require("compression"),
    expAutoSan = require("express-autosanitizer"),
    { logger, morganLogger } = require("./src/lib/framework/logger.js"),
    { nanoid } = require("nanoid");

var csrfProtection = csrf({ cookie: true });
var privateKey = fs.readFileSync("./sslcert/server.key", "utf8");
var certificate = fs.readFileSync("./sslcert/server.cert", "utf8");
var credentials = { key: privateKey, cert: certificate };

function assignID(req, res, next) {
    req.id = nanoid(5);
    next();
}

/* Create Server */
var app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.text({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(settings.system().cookieKey));
app.use(security.initAuthentication());
app.use(compression());
app.use(express.static(path.join(__dirname, "/app/assets/images"))); // Serve static resources from the images folder
app.use(express.static(path.join(__dirname, "/src/assets")));
app.use(expAutoSan.all);
app.use(assignID);
app.use(morganLogger());

loader.initialize(app);

app.use("/", csrfProtection, express.static(path.join(application_root, "/app")));
app.all("/*", csrfProtection, function (req, res) {
    res.cookie("csrfToken", req.csrfToken());
    res.sendFile(path.join(application_root, "/app", "index.html"));
});

var server = https.createServer(credentials, app).listen(settings.system().sslServicePort);
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
