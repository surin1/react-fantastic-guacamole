const path = require("path");
const common = require("./webpack.config.common");

const isProduction = process.env.NODE_ENV == "production";

const configDev = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: false,
    host: "localhost",
    port: 3000,
  },
  ...common,
};
const configProd = {
  mode: "production",
  entry: {
    "react-fantastic-guacamole": "./index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "react-fantastic-guacamole",
    libraryTarget: "umd",
  },
  externals: {
    react: "react",
    "react-dom": "reactDOM",
  },
  ...common,
};

module.exports = () => {
  if (isProduction) {
    return configProd;
  } else {
    return configDev;
  }
};
