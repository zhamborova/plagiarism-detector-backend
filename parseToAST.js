
const acorn = require("acorn")
const fs = require("fs")
//example of parsing a js file to AST
const ast = fs.readFileSync(`${__dirname}/file.js`).toString();
const ast2 = fs.readFileSync(`${__dirname}/file2.js`).toString();


const walk = require("acorn-walk")

let similar = []

const createSimilarity = (n1,n2) => {

        similar.push({id:n1.start + n2.start, node1:n1, node2:n2})

}


const compareLiteral = (n1, n2) => n1.type === n2.type && n1.value === n2.value;


const compareExpressions = (n1, n2) => {
     if(n1.type === n2.type){
         switch(n1.type){
             case "BinaryExpression":
             return n1.right.type === n2.right.type &&  n1.left.type === n2.left.type && n1.operator === n2.operator;

             case "UpdateExpression":
               return  n1.operator === n2.operator;

             case "MemberExpression" :
               return  n1.property.name === n2.property.name;

             case"ArrowFunctionExpression" :
                     return  n1.params.length === n2.params.length;

             default: return false;
         }

     }
}

const compareForStmnt = (n1, n2) => {
    return n1.type === n2.type;
}

let nodes = {

    expression: [],
    varDecl: [],
    forStmnt: []
};

walk.simple(acorn.parse(ast, {locations:true}), {

    Expression(node){
        if(node.type !== 'Identifier' && node.type !== 'Literal')
         if(!nodes["expression"].some(n => n.start === node.start )){
           nodes["expression"].push(node)
         }
    },
    VariableDeclaration(node){
        nodes["varDecl"].push(node)
    },




})

walk.simple(acorn.parse(ast2, {locations:true}), {


    Expression(node){
        nodes["expression"].forEach(n => {
            if(compareExpressions(n, node)){
                createSimilarity(n,node);
            }
        });


    },

})

const visual = (id, n1, n2) => {
    let startLine1 = n1.loc.start.line
    let endLine1 = n1.loc.end.line
    let startLine2 = n2.loc.start.line
    let endLine2 = n2.loc.end.line
    return `   id: ${id} \n node1- startLine: ${startLine1} endLine: ${endLine1} \n node2- startLine: ${startLine2} endLine: ${endLine2} \n --------------------\n`

}

console.log(similar.map(s => visual(s.id, s.node1, s.node2)));



