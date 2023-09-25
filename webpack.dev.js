const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { DefinePlugin } = require("webpack");

module.exports = merge(common, {
    devtool: "source-map",
    mode: "development",
    output: {
        filename: "[name].[contentHash].js",
        chunkFilename: "js/chunk-[name].[contentHash].js",
        path: path.resolve(__dirname, "app"),
        publicPath: "/",
    },
    plugins: [
        new DefinePlugin({
            "process.env.NODE_ENV": '"development"',
        }),
    ],
});
