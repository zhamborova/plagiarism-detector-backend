import { expect, assert } from 'chai';
import Assignment from '../src/Assignment';
import StringLiteral from '../src/StringLiteral'
import NumericLiteral from '../src/NumericLiteral'
import Sequence from '../src/Sequence';
import PlusExpr from '../src/PlusExpr'
import VarExpr from '../src/VarExpr'
import DeclStmt from '../src/DeclStmt';

describe("StmtIteratorTests", () => {

    it("iterator through the statements of a small AST", () => {
        let one = new NumericLiteral(1);
        let three = new NumericLiteral(3); 
        let exp = new PlusExpr(one, three);
        let decl = new DeclStmt("x");
        let assign = new Assignment("x", exp);
        let seq = new Sequence(decl, assign); 
        
        let it = seq.stmtIterator();
         expect(it.hasNext()).to.equal(true);
         expect(it.next().text()).to.equal("declare x");
         expect(it.hasNext()).to.equal(true);
         expect(it.next().text()).to.equal("x = 1 + 3");
         expect(it.hasNext()).to.equal(false);
})

it("test iterator on uniterable AST nodes", () => {
    let one = new NumericLiteral(1);
    let three = new StringLiteral("db"); 
    let exp = new PlusExpr(one, three);
    let varExp = new VarExpr("x")

     let it = one.stmtIterator();
     expect(it.hasNext()).to.equal(false);
     assert.throws(()=>it.next(), Error, "No nodes");


     it = three.stmtIterator();
     expect(it.hasNext()).to.equal(false);
     assert.throws(()=>it.next(), Error, "No nodes");

     it = varExp.stmtIterator();
     expect(it.hasNext()).to.equal(false);
     assert.throws(()=>it.next(), Error, "No nodes");

     it = exp.stmtIterator();
     expect(it.hasNext()).to.equal(false);
     assert.throws(()=>it.next(), Error, "No nodes");
  })

})


describe("StmtIteratorTests Assignment Iterator", () => {

    it("iterator through the assignment with Plus Expressions/Sequnce/DeclStmts", () => {
        let one = new NumericLiteral(1);
        let three = new NumericLiteral(3); 
        let two = new NumericLiteral(2);
        let four = new NumericLiteral(4); 
        let str1 = new StringLiteral("str1")
        let str2 = new StringLiteral("str2")
        let exp1 = new PlusExpr(one, three);
        let exp2 = new PlusExpr(two, four);
        let exp3 = new PlusExpr(exp2,exp1);
        let exp4 = new PlusExpr(str1,str2)
        let declExp1 = new DeclStmt("exp1")
        let declExp2 = new DeclStmt("exp2")
        let declExp3 = new DeclStmt("exp3")
        let declExp4 = new DeclStmt("exp4")
        
        let assignExp1 = new Assignment("exp1", exp1);
        let assignExp2 = new Assignment("exp2", exp2);
        let assignExp3 = new Assignment("exp3", exp3);
        let assignExp4 = new Assignment("exp4", exp4);
        
        let seq = new Sequence(declExp1,
                  new Sequence(declExp2,
                  new Sequence(declExp3,
                    new Sequence(assignExp1,
                        new Sequence(declExp4,
                        new Sequence(assignExp4,
                        new Sequence(assignExp2,assignExp3)))))))
        
        
        let it = seq.stmtIterator();
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare exp1");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare exp2");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare exp3");

         expect(it.hasNext()).to.equal(true);
         expect(it.next().text()).to.equal("exp1 = 1 + 3");

         expect(it.hasNext()).to.equal(true);
         expect(it.next().text()).to.equal("declare exp4");
         expect(it.hasNext()).to.equal(true);
         expect(it.next().text()).to.equal("exp4 = \"str1\" + \"str2\"");
         expect(it.hasNext()).to.equal(true);
         expect(it.next().text()).to.equal("exp2 = 2 + 4");
         expect(it.hasNext()).to.equal(true);
         expect(it.next().text()).to.equal("exp3 = 2 + 4 + 1 + 3");
         expect(it.hasNext()).to.equal(false);
         assert.throws(()=>it.next(), Error, "No nodes");
})


it("iterator through the assignment with Var Expressions/Sequnce/DeclStmts", () => {

    let one = new NumericLiteral(1);
    let three = new NumericLiteral(3); 
    let two = new NumericLiteral(2);
    let four = new NumericLiteral(4); 
    let exp1 = new PlusExpr(one, three);
    let exp2 = new PlusExpr(two, four);
    let exp3 = new PlusExpr(exp2,exp1);
    let declExp1 = new DeclStmt("exp1")
    let declExp2 = new DeclStmt("exp2")
    let declExp3 = new DeclStmt("exp3")
    let assignExp1 = new Assignment("exp1", exp1);
    let assignExp2 = new Assignment("exp2", exp2);
    let assignExp3 = new Assignment("exp3", new VarExpr("exp1"));
    let reassignExp2 = new Assignment("exp2", new VarExpr("exp3"));

    let seq = new Sequence(declExp1,
        new Sequence(declExp2,
        new Sequence(declExp3,
          new Sequence(assignExp1,
              new Sequence(assignExp2,
                new Sequence(assignExp3, reassignExp2))))))

        let it = seq.stmtIterator();
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare exp1");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare exp2");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare exp3");

         expect(it.hasNext()).to.equal(true);
         expect(it.next().text()).to.equal("exp1 = 1 + 3");
         expect(it.hasNext()).to.equal(true);
         expect(it.next().text()).to.equal("exp2 = 2 + 4");
         expect(it.hasNext()).to.equal(true);
         expect(it.next().text()).to.equal("exp3 = exp1");
         expect(it.hasNext()).to.equal(true);
         expect(it.next().text()).to.equal("exp2 = exp3");
         expect(it.hasNext()).to.equal(false);
         assert.throws(()=>it.next(), Error, "No nodes");




})


it("iterator through the assignment with Literal Expressions/Sequnce/DeclStmts", () => {

    let four = new NumericLiteral(4); 
    let str1 = new StringLiteral("str1")
    let declFour= new DeclStmt("four")
    let declStr = new DeclStmt("str1")
    let assignExp1 = new Assignment("four", four);
    let assignExp2 = new Assignment("str1", str1);

    let seq =  new Sequence(declFour,
                 new Sequence(declStr,
                      new Sequence(assignExp1, assignExp2)))

      let it = seq.stmtIterator();
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare four");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare str1");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("four = 4");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("str1 = \"str1\"");
        expect(it.hasNext()).to.equal(false);
        assert.throws(()=>it.next(), Error, "No nodes");



})

})