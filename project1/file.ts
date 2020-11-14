import {createToken, Lexer} from "chevrotain";
import chevrotain = require("chevrotain");
import fs = require("fs");
const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ })
const fakeFunction = () =>{

    [1,3,34,5,3,4].map(fakeNum => {

    })
}

const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: chevrotain.Lexer.SKIPPED
})

const Ast = createToken({
    name: "Ast1",
    pattern: /ast/,

})

const Comma = createToken({ name: "Comma", pattern: /,/ })

const Integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ })


let BasicLexer = new Lexer([WhiteSpace, Ast, Comma, Integer])

let inputText = fs.readFileSync(`../parseToAST.js`).toString()
let lexingResult = BasicLexer.tokenize(inputText)

console.log(lexingResult)
