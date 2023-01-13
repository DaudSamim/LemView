"use strict";

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    content: "./src/contentScript/index.js",
    pageWorld: "@inboxsdk/core/pageWorld.js",
    background: "@inboxsdk/core/background.js",
    popup: "./src/popup/index.js",
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: "file-loader",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
    new NodePolyfillPlugin(),
    new HtmlPlugin({
      filename: "popup.html",
      template: path.resolve("./src/popup/index.html"),
      chunks: ["popup"],
    }),
  ],
  resolve: {
    fallback: {
      fs: false,
    },
  },
};
