const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FRONT_BASE_URL = "./src/frontend/js/";
module.exports = {
  mode: "development",
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  entry: {
    main: FRONT_BASE_URL + "main.js",
    createPost: FRONT_BASE_URL + "createPost.js",
    detailPost: FRONT_BASE_URL + "detailPost.js",
    comment: FRONT_BASE_URL + "comment.js",
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
