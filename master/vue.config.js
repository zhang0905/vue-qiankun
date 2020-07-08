
const { port } = require("./package");

module.exports = {
  // publicPath: './',
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      "/do": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        pathRewrite: {
          "^/do": ""
        }
      },
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/css/variables.scss";`
      }
    }
  }
};

