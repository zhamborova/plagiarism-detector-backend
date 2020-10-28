const fs = require("fs")
const { Parser } = require("acorn");

//example of parsing a js file to AST
const ast = Parser.parse(fs.readFileSync(`${__dirname}/index.js`).toString());

console.log(ast)
