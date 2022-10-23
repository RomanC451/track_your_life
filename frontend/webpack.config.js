const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    watchFiles: ["src/**/*"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          { loader: "react-hot-loader/webpack" },
        ],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.jpg$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
        },
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
        },
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "templates/frontend/index.html", to: "index.html" }],
    }),
  ],
  output: {
    filename: "bundle_main.js",
    path: path.resolve(__dirname, "static/frontend"),
    clean: true,
  },
};
