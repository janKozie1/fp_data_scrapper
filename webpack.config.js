const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  externals: [nodeExternals()],
  mode: "production",
  target: "node",
  watch: true,
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    alias: {
      https: "https-browserify",
      http: "stream-http",
    },
  },
};
