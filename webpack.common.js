const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: __dirname,
    resolve: {
        extensions: [".js", ".jsx", ".json"],
        alias: {
            lib: path.resolve(__dirname, "./src/lib"),
        },
    },
    entry: {
        "home/bundle": ["babel-polyfill", "/src/routes/home/index.js"],
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                default: false,
                nodeVendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    enforce: true,
                    chunks: "all",
                },
                componentVendor: {
                    test: new RegExp("/src/lib/components"),
                    name: "components",
                    enforce: true,
                    chunks: "all",
                },
                modulesVendor: {
                    test: new RegExp("/src/lib/modules/index.js"),
                    name: "modules",
                    enforce: true,
                    chunks: "all",
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: "body",
            template: "./src/routes/home/index.html",
            filename: "index.html",
            chunks: ["home/bundle", "chunk-home"],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(mjs|js|jsx)$/,
                include: [path.resolve(__dirname, "src/lib"), path.resolve(__dirname, "src/routes")],
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(docx|pdf|png|jpg)$/,
                include: [path.resolve(__dirname, "src/assets")],
                use: ["file-loader"],
            },
            {
                test: /\.css$/,
                loader: "ignore-loader",
            },
        ],
    },
};
