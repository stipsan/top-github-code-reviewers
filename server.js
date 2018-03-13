require("babel-register")({
  presets: [["env", { modules: "commonjs" }], "next-react-fiber-fork/babel"],
  plugins: ["transform-async-generator-functions"],
  babelrc: false
});

module.exports = require("./server.es6.js");
