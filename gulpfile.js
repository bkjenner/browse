const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const header = require("gulp-header");
const strip = require("gulp-strip-comments");
const log = require("fancy-log");
const webpack = require("webpack");
const devConfig = require("./webpack.dev.js");
const stagingDevConfig = require("./webpack.stagingdev.js");
const uatConfig = require("./webpack.uat.js");
const prodConfig = require("./webpack.prod.js");
const util = require("util");
const { spawn, execSync } = require("child_process");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
let progressLogged = false;

const colors = {
    reset: "\x1b[0m",
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
};

const execAndLog = (command) => {
    log(execSync(command).toString().trim());
};

function checkForMode() {
    return new Promise((resolve, reject) => {
        let args = process.argv;

        if (args && !["--deploy", "--hotfix", "--test"].includes(args[args.length - 1])) {
            console.log("Please supply a mode");
            console.log("--deploy: You are running a full deployment, commit will be tagged as a deployment");
            console.log("--hotfix: You are deploying a hotfix, commit will be tagged as a hotfix");
            console.log("--test: You are running a test build, commit will not be tagged");

            reject(new Error("No mode provided"));
        }

        resolve();
    });
}

function compileRules() {
    return src(["./src/lib/rules/prototype.js", "./src/lib/rules/*.js", "!./src/lib/rules/index.js"])
        .pipe(concat("index.js"))
        .pipe(strip())
        .pipe(dest("./src/lib/rules/"));
}

function compileReducers() {
    return src(["./src/lib/reducers/*", "!./src/lib/reducers/index.js"])
        .pipe(concat("index.js"))
        .pipe(header("import * as util from 'lib/utility';\n\n"))
        .pipe(strip())
        .pipe(dest("./src/lib/reducers/"));
}

function compileLogic() {
    return src(["./src/lib/logic/*", "!./src/lib/logic/index.js"])
        .pipe(concat("index.js"))
        .pipe(header("import { createLogic } from 'redux-logic';\nimport util from 'lib/utility';\n\n"))
        .pipe(strip())
        .pipe(dest("./src/lib/logic/"));
}

function compileModels() {
    return src([
        "./src/lib/data/models/prototype.js",
        "./src/lib/data/models/framework/*.js",
        "./src/lib/data/models/system/*.js",
        "!./src/lib/data/models/index.js",
    ])
        .pipe(concat("index.js"))
        .pipe(strip())
        .pipe(dest("./src/lib/data/models/"));
}

function stripFile() {
    return src("models.js").pipe(strip()).pipe(dest("stripped-models.js"));
}

webpackHandler = (config, cb) => {
    let maxProgress = 0;

    const progressHandler = (percentage, message, ...args) => {
        if (!progressLogged) {
            let progress = Math.floor(percentage.toFixed(2) * 100);

            if (progress > maxProgress) {
                maxProgress = progress;
            }

            let numPipes = Math.floor(maxProgress / 5);
            let pipes = "|".repeat(numPipes);
            let remaining = 20 - numPipes;
            let empty = "-".repeat(remaining);

            process.stdout.write(`\rProgress - [${colors.green}${pipes}${colors.reset}${empty}] ${maxProgress}%`);
        }
    };

    config.plugins.push(new webpack.ProgressPlugin(progressHandler));

    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (err) {
                cb(err);
            }

            let warnings = stats.compilation.warnings;

            if (warnings.length > 0) {
                console.log(
                    `\nWebpack finished with ${colors.yellow}%s${colors.reset} ${warnings.length === 1 ? "warning" : "warnings"}`,
                    `${warnings.length}`,
                );

                console.log(`${colors.yellow}%s${colors.reset}`, `\n${warnings.join("\n")}`);
            }

            if (stats.hasErrors()) {
                let errors = stats.compilation.errors;

                if (errors.length > 0) {
                    console.log(
                        `\nWebpack finished with ${colors.red}%s${colors.reset} ${errors.length === 1 ? "error" : "errors"}`,
                        `${errors.length}`,
                    );

                    console.log(`${colors.red}%s${colors.reset}`, `\n${errors.join("\n")}`);
                }

                cb(new Error());
            }

            if (!progressLogged) {
                console.log("\n");
                progressLogged = true;
            } else {
                let rebuildTime = Math.round((stats.endTime - stats.startTime) / 1000);
                log(`Rebuild complete after ${colors.magenta}${rebuildTime} s${colors.reset}`);
            }

            cb();
        });
    });
};

function webpackWatch(cb) {
    devConfig.watch = true;
    devConfig.watchOptions = {
        aggregateTimeout: 2000,
        ignored: /node_modules/,
    };
    webpackHandler(devConfig, cb);
}

function webpackDev(cb) {
    devConfig.plugins.push(
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["*.js*", "**/*.js*"],
        }),
    );
    webpackHandler(devConfig, cb);
}

function webpackStagingDev(cb) {
    stagingDevConfig.plugins.push(
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["*.js*", "**/*.js*"],
        }),
    );
    webpackHandler(stagingDevConfig, cb);
}

function webpackUAT(cb) {
    uatConfig.plugins.push(
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["*.js*", "**/*.js*"],
        }),
    );
    webpackHandler(uatConfig, cb);
}

function webpackProd(cb) {
    prodConfig.plugins.push(
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["*.js*", "**/*.js*"],
        }),
    );
    webpackHandler(prodConfig, cb);
}

function watchLogicAndReducers() {
    log("Watching for changes...");
    watch(["./src/lib/logic/*.js", "!./src/lib/logic/index.js"], compileLogic);
    watch(["./src/lib/reducers/*.js", "!./src/lib/reducers/index.js"], compileReducers);
}

function watchModelsAndRules() {
    watch(["./src/lib/rules/*.js", "!./src/lib/rules/index.js"], compileRules);
    watch(
        [
            "./src/lib/data/models/prototype.js",
            "./src/lib/data/models/system/*.js",
            "./src/lib/data/models/framework/*.js",
            "!./src/lib/data/models/index.js",
        ],
        compileModels,
    );
}

function replaceFiles(cb) {
    const replace = execSync(`./replace-files.sh`).toString().trim().split("\n");
    replace.forEach((line) => {
        log(line);
    });

    cb();
}

function getBranchInfo() {
    return new Promise((resolve, reject) => {
        let result = {};

        const branch = execSync("git rev-parse --abbrev-ref HEAD");
        result.branch = branch.toString().trim();

        const version = execSync(`awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json`);
        result.version = version.toString().trim();

        const revision = execSync(`git rev-parse --short HEAD`);
        result.revision = revision.toString().trim();

        resolve(result);
    });
}

function replaceConnectionAndCookieDomain() {
    return new Promise((resolve, reject) => {
        getBranchInfo()
            .then((data) => {
                let connection = execSync(
                    `awk -F ' ' '/sqlConnection/ { print $2 }' ../camms-portal/src/lib/framework/connectionstrings.js | tr -d '",'`,
                )
                    .toString()
                    .trim();

                connection = connection.replace("@", "\\@");

                execSync(`perl -i -pe 's|mssql:.*[^",\n]|${connection}|g' src/lib/framework/connectionstrings.js`);
                execSync(`perl -i -pe "s|cookieDomain: 'localhost'|cookieDomain: 'method1software.com'|g" src/lib/framework/connectionstrings.js`);

                execSync("git add .");

                resolve();
            })
            .catch((err) => {
                log(err);
                resolve();
            });
    });
}

function changeToBuild() {
    if (execSync("pwd | awk -F '/' '{print $NF}'").toString().trim() !== "camms-portal-build") {
        process.chdir("../camms-portal-build");
    }
}

function checkoutTest(cb) {
    changeToBuild();
    execAndLog("git checkout test || git checkout -b test");
    execAndLog("git fetch && git reset --hard origin/test");

    cb();
}

function checkoutInternal(cb) {
    changeToBuild();
    execAndLog("git checkout internal || git checkout -b internal");
    execAndLog("git fetch && git reset --hard origin/internal");

    cb();
}

function checkoutStagingDev(cb) {
    changeToBuild();
    execAndLog("git checkout staging-dev || git checkout -b staging-dev");
    execAndLog("git fetch && git reset --hard origin/staging-dev");

    cb();
}

function checkoutUAT(cb) {
    changeToBuild();
    execAndLog("git checkout uat || git checkout -b uat");
    execAndLog("git fetch && git reset --hard origin/uat");

    cb();
}

function checkoutProd(cb) {
    changeToBuild();
    execAndLog("git checkout prod || git checkout -b prod");
    execAndLog("git fetch && git reset --hard origin/prod");

    cb();
}

function transferAssets() {
    return new Promise((resolve, reject) => {
        try {
            log("Removing old assets");
            execSync("git rm -r app");
        } catch (error) {
            log("No app folder to remove");
        }

        log("Creating directories");
        execSync("mkdir -p app config src/{assets,lib}");
        execSync("mkdir -p src/lib/{rules,logic,reducers,contexts,framework,data}");

        log("Transferring app folder");
        execSync("rsync -a ../camms-portal/app/ ./app/");

        log("Transferring config folder");
        execSync("rsync -a ../camms-portal/config/ ./config/");

        log("Transferring assets");
        execSync("rsync -a ../camms-portal/src/assets/ ./src/assets/");

        log("Transferring files");
        execSync("rsync -a ../camms-portal/src/lib/rules/index.js ./src/lib/rules/");
        execSync("rsync -a ../camms-portal/src/lib/logic/index.js ./src/lib/logic/");
        execSync("rsync -a ../camms-portal/src/lib/contexts/ ./src/lib/contexts/");

        if (["internal", "test"].includes(execSync("git rev-parse --abbrev-ref HEAD").toString().trim())) {
            execSync("rsync -a ../camms-portal/src/lib/framework/ ./src/lib/framework/");
        } else {
            execSync(`rsync -a --exclude "connectionstrings.js" ../camms-portal/src/lib/framework/ ./src/lib/framework/`);
        }

        execSync("rsync -a ../camms-portal/service.js ./service.js");
        execSync("rsync -a ../camms-portal/sslcert/ ./sslcert/");
        execSync("rsync -a ../camms-portal/package* ./");
        execSync("rsync -a ../camms-portal/replace-files.sh ./");

        execAndLog("git add .");

        resolve();
    });
}

function commit() {
    return new Promise((resolve, reject) => {
        process.chdir("../camms-portal");
        getBranchInfo()
            .then((data) => {
                changeToBuild();
                let status = execSync("git status --porcelain").toString().trim();

                if (status === "") {
                    log("Working tree clean, nothing to commit");
                    resolve();
                } else {
                    let branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
                    let mode;

                    switch (branch) {
                        case "test":
                            execAndLog(`git commit -m "Test build ${data.branch}@${data.revision} v${data.version}"`);
                            execAndLog(`git push --set-upstream origin test`);

                            mode = process.argv[process.argv.length - 1];

                            if (mode === "--deploy") {
                                execAndLog(
                                    `git tag -af Deployment-$(date +%h-%d-%Y)-${data.branch}@${data.revision} -m "Production deployment v${data.version}"`,
                                );

                                execAndLog("git push origin --tags");
                            } else if (mode === "--hotfix") {
                                execAndLog(
                                    `git tag -af Hotfix-$(date +%h-%d-%Y)-${data.branch}@${data.revision} -m "Production deployment v${data.version}"`,
                                );

                                execAndLog("git push origin --tags");
                            }

                            break;
                        case "internal":
                            execAndLog(`git commit -m "Internal build ${data.branch}@${data.revision} v${data.version}"`);
                            execAndLog(`git push --set-upstream origin internal`);
                            break;
                        case "staging-dev":
                            execAndLog(`git commit -m "Staging Dev build ${data.branch}@${data.revision} v${data.version}"`);
                            execAndLog(`git push --set-upstream origin staging-dev`);
                            break;
                        case "uat":
                            execAndLog(`git commit -m "UAT build ${data.branch}@${data.revision} v${data.version}"`);
                            execAndLog(`git push --set-upstream origin uat`);
                            break;
                        case "prod":
                            execAndLog(`git commit -m "Prod build ${data.branch}@${data.revision} v${data.version}"`);
                            execAndLog(`git push --set-upstream origin prod`);

                            mode = process.argv[process.argv.length - 1];

                            if (mode === "deploy") {
                                execAndLog(
                                    `git tag -a Deployment-$(date +%h-%d-%Y)-${data.branch}@${data.revision} -m "Production deployment v${data.version}"`,
                                );

                                execAndLog("git push origin --tags");
                            } else if (mode === "hotfix") {
                                execAndLog(
                                    `git tag -a Hotfix-$(date +%h-%d-%Y)-${data.branch}@${data.revision} -m "Production deployment v${data.version}"`,
                                );

                                execAndLog("git push origin --tags");
                            }

                            break;
                        default:
                            break;
                    }
                }

                resolve();
            })
            .catch((err) => {
                log(err);
                resolve();
            });
    });
}

exports.compileModels = compileModels;
exports.compileRules = compileRules;
exports.watch = series(compileReducers, compileLogic, webpackWatch, watchLogicAndReducers);
exports.dev = series(compileReducers, compileLogic, webpackDev);
exports.buildTest = series(
    checkForMode,
    compileModels,
    compileRules,
    compileReducers,
    compileLogic,
    replaceFiles,
    webpackUAT,
    checkoutTest,
    transferAssets,
    replaceConnectionAndCookieDomain,
    commit,
);
exports.buildInternal = series(
    compileModels,
    compileRules,
    compileReducers,
    compileLogic,
    replaceFiles,
    webpackUAT,
    checkoutInternal,
    transferAssets,
    replaceConnectionAndCookieDomain,
    commit,
);
exports.buildStagingDev = series(
    compileModels,
    compileRules,
    compileReducers,
    compileLogic,
    replaceFiles,
    webpackUAT,
    checkoutStagingDev,
    transferAssets,
    commit,
);
exports.buildUAT = series(compileModels, compileRules, compileReducers, compileLogic, replaceFiles, webpackUAT, checkoutUAT, transferAssets, commit);
exports.buildProd = series(
    checkForMode,
    compileModels,
    compileRules,
    compileReducers,
    compileLogic,
    replaceFiles,
    webpackProd,
    checkoutProd,
    transferAssets,
    commit,
);

exports.default = series(compileModels, compileRules, watchModelsAndRules);
