
//example of parsing a js file to AST
const ast = Parser.parse(fs.readFileSync(`${__dirname}/file.js`).toString());

console.log(ast)
