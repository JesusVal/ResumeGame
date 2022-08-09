//webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/app.ts",
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name]-bundle.js", // <--- Will be compiled to this single file
    publicPath: "/build/",
  },
  devServer: {
    port: 9000,
    static: {
      serveIndex: true,
      directory: __dirname,
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
