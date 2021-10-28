const HtmlWebpackPlugin = require("html-webpack-plugin");
const stylesHandler = "style-loader";

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/i,
        use: ["ts-loader"],
        exclude: /node_modules/,
        include: /src/,
      },
      {
        test: /\.css$/i,
        use: [
          stylesHandler,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[folder]__[local]--[hash:base64:5]",
              },
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};
