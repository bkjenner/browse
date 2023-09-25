const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].min.js",
        chunkFilename: "js/chunk-[name].[contentHash].js",
        path: path.resolve(__dirname, "app"),
        publicPath: "/",
    },
    plugins: [
        new DefinePlugin({
            "process.env.NODE_ENV": '"production"',
        }),
        new DefinePlugin({
            "process.env.BUILD_ENV": '"production"',
        }),
        new CompressionPlugin({
            deleteOriginalAssets: true,
        }),
    ],
});
