import { expect } from 'chai';
import Assignment from '../src/Assignment';
import StringLiteral from '../src/StringLiteral'
import NumericLiteral from '../src/NumericLiteral'
import Sequence from '../src/Sequence';
import PlusExpr from '../src/PlusExpr'
import VarExpr from '../src/VarExpr'
import DeclStmt from '../src/DeclStmt';
import CountVisitor from '../src/CountVisitor'

describe("CountVisitorTests", () => {
    it("count nodes in a small AST", () => {
        let one = new NumericLiteral(1);
        let three = new NumericLiteral(3); 
        let exp = new PlusExpr(one, three);
        let decl = new DeclStmt("x");
        let assign = new Assignment("x", exp);
        let seq = new Sequence(decl, assign); 
        let countVisitor = new CountVisitor();
        seq.accept(countVisitor);

        expect(countVisitor.getNrAssignment()).to.equal(1);
        expect(countVisitor.getNrDeclStmt()).to.equal(1);
        expect(countVisitor.getNrNumericLiteral()).to.equal(2);
        expect(countVisitor.getNrPlusExpr()).to.equal(1);
        expect(countVisitor.getNrSequence()).to.equal(1);
        expect(countVisitor.getNrStringLiteral()).to.equal(0);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
    })

})


describe("CountVisitor Assignmnet Tests", () => {

    it("count nodes in a AST containing Assignmnets with literal Expressions", () => {

        let declNum = new DeclStmt("num");
        let declStr = new DeclStmt("str");
        let one = new NumericLiteral(1);
        let testing = new StringLiteral("testing")
        let assignNum = new Assignment("num", one);
        let assignStr = new Assignment("str",testing)
        let seq = new Sequence(declNum,  new Sequence(declStr,  new Sequence(assignNum, assignStr))); 

        let countVisitor = new CountVisitor();
        seq.accept(countVisitor);

        expect(countVisitor.getNrAssignment()).to.equal(2);
        expect(countVisitor.getNrDeclStmt()).to.equal(2);
        expect(countVisitor.getNrNumericLiteral()).to.equal(1);
        expect(countVisitor.getNrPlusExpr()).to.equal(0);
        expect(countVisitor.getNrSequence()).to.equal(3);
        expect(countVisitor.getNrStringLiteral()).to.equal(1);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
    })

    it("count nodes in a AST containing Assignmnets with Numeric Plus Expressions", () => {

        let one = new NumericLiteral(1)
        let two = new NumericLiteral(2)
        let three = new NumericLiteral(3)
        let four  = new NumericLiteral(4)
        let plusOneTwo = new PlusExpr(one, two)
        let plusThreeFour = new PlusExpr(three, four)
        let nestedPlus = new PlusExpr(plusOneTwo, plusThreeFour)
        let declX = new DeclStmt("x")
        let declY = new DeclStmt("y")
        let declZ  = new DeclStmt("z")
        let assignX = new Assignment("x", plusOneTwo)
        let assignY =  new Assignment("y", plusThreeFour)
        let assignZ  = new Assignment("z", nestedPlus)
        let seq = new Sequence(declX,  
                     new Sequence(declY,  
                        new Sequence(declZ,
                            new Sequence(assignX,
                                new Sequence(assignY, assignZ))))) 

        let countVisitor = new CountVisitor();
        seq.accept(countVisitor);

        expect(countVisitor.getNrAssignment()).to.equal(3);
        expect(countVisitor.getNrDeclStmt()).to.equal(3);
        expect(countVisitor.getNrNumericLiteral()).to.equal(8);
        expect(countVisitor.getNrPlusExpr()).to.equal(5);
        expect(countVisitor.getNrSequence()).to.equal(5);
        expect(countVisitor.getNrStringLiteral()).to.equal(0);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
    })


    it("count nodes in a AST containing Assignmnets with String Plus Expressions", () => {

        let one = new StringLiteral("1")
        let two = new StringLiteral("2")
        let three = new StringLiteral("3")
        let four  = new StringLiteral("4")
        let plusOneTwo = new PlusExpr(one, two)
        let plusThreeFour = new PlusExpr(three, four)
        let nestedPlus = new PlusExpr(plusOneTwo, plusThreeFour)
        let declX = new DeclStmt("x")
        let declY = new DeclStmt("y")
        let declZ  = new DeclStmt("z")
        let assignX = new Assignment("x", plusOneTwo)
        let assignY =  new Assignment("y", plusThreeFour)
        let assignZ  = new Assignment("z", nestedPlus)
        let seq = new Sequence(declX,  
                     new Sequence(declY,  
                        new Sequence(declZ,
                            new Sequence(assignX,
                                new Sequence(assignY, assignZ))))) 

        let countVisitor = new CountVisitor();
        seq.accept(countVisitor);

        expect(countVisitor.getNrAssignment()).to.equal(3);
        expect(countVisitor.getNrDeclStmt()).to.equal(3);
        expect(countVisitor.getNrNumericLiteral()).to.equal(0);
        expect(countVisitor.getNrPlusExpr()).to.equal(5);
        expect(countVisitor.getNrSequence()).to.equal(5);
        expect(countVisitor.getNrStringLiteral()).to.equal(8);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
    })

    it("count nodes in a AST containing Assignmnets with Var Expressions", () => {

        let one = new NumericLiteral(1)
        let two = new NumericLiteral(2)
        let str1 = new StringLiteral("string1")
        let str2  = new StringLiteral("string2")
        let plusOneTwo = new PlusExpr(one, two)
        let concatStrs = new PlusExpr(str1, str2)
        let declOne = new DeclStmt("one")
        let declTwo = new DeclStmt("two")
        let declSum  = new DeclStmt("sum")
        let declStr1  = new DeclStmt("str1")
        let declStr2  = new DeclStmt("str2")
        let declConcatStr = new DeclStmt("concatStr")
        let assignOne = new Assignment("one", one)
        let assignTwo =  new Assignment("two", two)
        let assignSum = new Assignment("sum", plusOneTwo)
        let assignStr1 = new Assignment("str1", str1)
        let assignStr2 = new Assignment("str2", str2)
        let assignConcat = new Assignment ("concatStr", concatStrs)

        let reassignOneToTwo = new Assignment("one", new VarExpr("two"))
        let reassignTwoToSum = new Assignment("two", new VarExpr("sum"))
        let reassingStr1ToStr2 = new Assignment("str1", new VarExpr("str2"))
        let reassignStr2ToConcat = new Assignment("str2", new VarExpr("concatStr"))
        let seq = new Sequence(declOne,  
        new Sequence(declTwo,  
        new Sequence(declStr1,
        new Sequence(declStr2,
        new Sequence(declSum,
        new Sequence(declConcatStr,
        new Sequence(assignOne,
        new Sequence(assignTwo,
        new Sequence(assignSum, 
        new Sequence(assignStr1,
        new Sequence(assignStr2,
        new Sequence(assignConcat,
        new Sequence(reassignOneToTwo,
        new Sequence(reassignTwoToSum, 
        new Sequence(reassingStr1ToStr2 , reassignStr2ToConcat)))))))))))))))
                                                                               
        let countVisitor = new CountVisitor();
        seq.accept(countVisitor);
        expect(countVisitor.getNrAssignment()).to.equal(10);
        expect(countVisitor.getNrDeclStmt()).to.equal(6);
        expect(countVisitor.getNrNumericLiteral()).to.equal(4);
        expect(countVisitor.getNrPlusExpr()).to.equal(2);
        expect(countVisitor.getNrSequence()).to.equal(15);
        expect(countVisitor.getNrStringLiteral()).to.equal(4);
        expect(countVisitor.getNrVarExpr()).to.equal(4);
    })




})



describe("CountVisitor Expression Tests", () => {

    it("count nodes in a AST containing Literal Num Expression", () => {

        let two = new NumericLiteral(2)
        let countVisitor = new CountVisitor();
        two.accept(countVisitor)
  
        expect(countVisitor.getNrAssignment()).to.equal(0);
        expect(countVisitor.getNrDeclStmt()).to.equal(0);
        expect(countVisitor.getNrNumericLiteral()).to.equal(1);
        expect(countVisitor.getNrPlusExpr()).to.equal(0);
        expect(countVisitor.getNrSequence()).to.equal(0);
        expect(countVisitor.getNrStringLiteral()).to.equal(0);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
      
    })
    it("count nodes in a AST containing Literal String Expression", () => {

      
        let str1 = new StringLiteral("string1")
        let countVisitor = new CountVisitor();
        str1.accept(countVisitor)
        expect(countVisitor.getNrAssignment()).to.equal(0);
        expect(countVisitor.getNrDeclStmt()).to.equal(0);
        expect(countVisitor.getNrNumericLiteral()).to.equal(0);
        expect(countVisitor.getNrPlusExpr()).to.equal(0);
        expect(countVisitor.getNrSequence()).to.equal(0);
        expect(countVisitor.getNrStringLiteral()).to.equal(1);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
      
    })
    it("count nodes in a AST containing Numeric Plus Expression", () => {
        let one = new NumericLiteral(1)
        let two = new NumericLiteral(2)
        let plus = new PlusExpr(one, two)
        let countVisitor = new CountVisitor();
       
         plus.accept(countVisitor)
        expect(countVisitor.getNrAssignment()).to.equal(0);
        expect(countVisitor.getNrDeclStmt()).to.equal(0);
        expect(countVisitor.getNrNumericLiteral()).to.equal(2);
        expect(countVisitor.getNrPlusExpr()).to.equal(1);
        expect(countVisitor.getNrSequence()).to.equal(0);
        expect(countVisitor.getNrStringLiteral()).to.equal(0);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
      
    })

    it("count nodes in a AST containing String Plus Expression", () => {
        let str1 = new StringLiteral("string1")
        let str2  = new StringLiteral("string2")
        let plus = new PlusExpr(str1, str2)
        let countVisitor = new CountVisitor();
       
         plus.accept(countVisitor)
        expect(countVisitor.getNrAssignment()).to.equal(0);
        expect(countVisitor.getNrDeclStmt()).to.equal(0);
        expect(countVisitor.getNrNumericLiteral()).to.equal(0);
        expect(countVisitor.getNrPlusExpr()).to.equal(1);
        expect(countVisitor.getNrSequence()).to.equal(0);
        expect(countVisitor.getNrStringLiteral()).to.equal(2);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
      
    })



})

describe("CountVisitor nested AST", () => {

    it("count nodes in a complex nested AST ", () => {
        let one = new NumericLiteral(1)
        let two = new NumericLiteral(2)
        let str1 = new StringLiteral("string1")
        let str2  = new StringLiteral("string2")
        let plusOneTwo = new PlusExpr(one, two)
        let concatStrs = new PlusExpr(str1, str2)
        let declOne = new DeclStmt("one")
        let declTwo = new DeclStmt("two")
        let declSum  = new DeclStmt("sum")
        let declStr1  = new DeclStmt("str1")
        let declStr2  = new DeclStmt("str2")
        let declConcatStr = new DeclStmt("concatStr")
        let assignOne = new Assignment("one", one)
        let assignTwo =  new Assignment("two", two)
        let assignSum = new Assignment("sum", new PlusExpr(plusOneTwo, plusOneTwo))
        let assignStr1 = new Assignment("str1", str1)
        let assignStr2 = new Assignment("str2", str2)
        let assignConcat = new Assignment ("concatStr", new PlusExpr(concatStrs, concatStrs))

        let reassignOneToTwo = new Assignment("one", new VarExpr("two"))
        let reassignTwoToSum = new Assignment("two", new VarExpr("sum"))
        let reassingStr1ToStr2 = new Assignment("str1", new VarExpr("str2"))
        let reassignStr2ToConcat = new Assignment("str2", new VarExpr("concatStr"))
        let seq = new Sequence(declOne,  
            new Sequence(declTwo,  
            new Sequence(declStr1,
            new Sequence(declStr2,
            new Sequence(declSum,
            new Sequence(declConcatStr,
            new Sequence(assignOne,
            new Sequence(assignTwo,
            new Sequence(assignSum, 
            new Sequence(assignStr1,
            new Sequence(assignStr2,
            new Sequence(assignConcat,
            new Sequence(reassignOneToTwo,
            new Sequence(reassignTwoToSum, 
            new Sequence(reassingStr1ToStr2 , reassignStr2ToConcat)))))))))))))))
                                                                                   
            let countVisitor = new CountVisitor();
            seq.accept(countVisitor);
            expect(countVisitor.getNrAssignment()).to.equal(10);
            expect(countVisitor.getNrDeclStmt()).to.equal(6);
            expect(countVisitor.getNrNumericLiteral()).to.equal(6);
            expect(countVisitor.getNrPlusExpr()).to.equal(6);
            expect(countVisitor.getNrSequence()).to.equal(15);
            expect(countVisitor.getNrStringLiteral()).to.equal(6);
            expect(countVisitor.getNrVarExpr()).to.equal(4);
    })

})