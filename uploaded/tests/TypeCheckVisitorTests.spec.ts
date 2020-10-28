import { expect } from 'chai';
import Assignment from '../src/Assignment';
import StringLiteral from '../src/StringLiteral'
import NumericLiteral from '../src/NumericLiteral'
import Sequence from '../src/Sequence';
import PlusExpr from '../src/PlusExpr'
import VarExpr from '../src/VarExpr'
import DeclStmt from '../src/DeclStmt';

import TypeCheckVisitor from  "../src/TypeCheckVisitor"

describe("TypeCheckVisitorTests", () => {
    
    it("type-check a small AST with both kinds of errors", () => {
        let x1 = new DeclStmt("x");
        let x2 = new DeclStmt("x");
     
        let y = new DeclStmt("y");
        let one = new NumericLiteral(1); 
        let two = new StringLiteral("foo"); 
        let exp1 = new PlusExpr(one, two);
        let exp2 = new NumericLiteral(3); 
        let assign1 = new Assignment("x", exp1);
        let assign2 = new Assignment("y", exp2);
        let code = new Sequence(x1,  new Sequence(x2, new Sequence(y, new Sequence(assign1, assign2))))
        let tcVisitor = new TypeCheckVisitor();
        code.accept(tcVisitor);
        let expected = ["Duplicate variable declaration: x",
                        "Type error in expression: 1 + \"foo\""]; 
                    
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected);  // both errors
    })
    it("type-check a big AST with both kinds of errors", () => {
        let one = new NumericLiteral(1)
        let two = new NumericLiteral(2)
        let three = new StringLiteral("3")
        let four  = new StringLiteral("4")
        let plusOneTwo = new PlusExpr(one, two)
        let plusThreeFour = new PlusExpr(three, four)
        let invalidPlus = new PlusExpr(one, three)
        let invalidPlus1 = new PlusExpr(four, two)
        let nestedInvalidPlus = new PlusExpr(plusOneTwo, plusThreeFour)
        let nestedInvalidPlus1 = new PlusExpr(invalidPlus, invalidPlus1)
       
        let nestedValidPlus1 = new PlusExpr(plusOneTwo, plusOneTwo)
        let nestedValidPlus2 = new PlusExpr(plusThreeFour, plusThreeFour)
        
        let declNums = new DeclStmt("nums")
        let declStrs = new DeclStmt("strs")
        let declInvalidPlus  = new DeclStmt("invalidPlus")
        let declInvalidPlus1 = new DeclStmt("invalidPlus1")
        let declNestedInvalidPlus =  new DeclStmt("nestedInvalidPlus")
        let declNestedInvalidPlus1 =  new DeclStmt("nestedInvalidPlus1")
        let declNestedValidPlus1 =  new DeclStmt("nestedValidPlus1")
        let declNestedValidPlus2 =  new DeclStmt("nestedValidPlus2")
        
        let assignNums = new Assignment("nums", plusOneTwo)
        let assignStrs =  new Assignment("strs", plusThreeFour)
        let assignInvalidPlus  = new Assignment("invalidPlus", invalidPlus)
        let assignInvalidPlus1  = new Assignment("invalidPlus1", invalidPlus1)
        let assignNestedInvalidPlus = new Assignment("nestedInvalidPlus", nestedInvalidPlus)
        let assignNestedInvalidPlus1 = new Assignment("nestedInvalidPlus", nestedInvalidPlus1)
        let assignNestedValidPlus1  = new Assignment("nestedValidPlus1", nestedValidPlus1)
        let assignNestedValidPlus2  = new Assignment("nestedValidPlus2", nestedValidPlus2)
        let seq = new Sequence(declNums,  
                  new Sequence(declStrs,  
                  new Sequence(declInvalidPlus,
                  new Sequence(declNestedInvalidPlus,  
                  new Sequence(declNestedValidPlus1,  
                  new Sequence(declNestedValidPlus2,
                  new Sequence(declInvalidPlus1,
                  new Sequence(declNestedInvalidPlus1,
                    new Sequence(declStrs,
                       new Sequence(assignNums,  
                        new Sequence(assignStrs,  
                            new Sequence(declNums,
                                new Sequence(declNums,      
                        new Sequence(assignInvalidPlus1, 
                        new Sequence(assignInvalidPlus,
                        new Sequence(assignNestedValidPlus1,  
                        new Sequence(assignNestedInvalidPlus1, 
                        new Sequence(declNestedValidPlus1,        
                         new Sequence(assignNestedValidPlus2,assignNestedInvalidPlus)))))))))))))))))))
    
    
        let tcVisitor = new TypeCheckVisitor();
        seq.accept(tcVisitor);
        let expected: string[] = [
        'Type error in expression: \"4\" + 2',
        'Type error in expression: 1 + \"3\"',
        'Type error in expression: 1 + \"3\"',
        'Type error in expression: \"4\" + 2',
        'Type error in expression: 1 + \"3\" + \"4\" + 2',
        'Type error in expression: 1 + 2 + \"3\" + \"4\"',
        'Duplicate variable declaration: nestedValidPlus1',
        'Duplicate variable declaration: strs',
        'Duplicate variable declaration: nums',
        'Duplicate variable declaration: nums',] 
                    
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected);                 
    })

})

describe("TypeCheckVisitorTests for Duplicate Variables", () => {

    it("type-check no error", () => {
        let x1 = new DeclStmt("x");
        let y = new DeclStmt("y");
    
        let seq = new Sequence(x1, y) 
        let tcVisitor = new TypeCheckVisitor();

        seq.accept(tcVisitor);
        let expected: string[] = [] 
                    
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected); 
    })

    
    it("type-check 2 Stmnts with Duplicate Variables", () => {
        let x1 = new DeclStmt("x");
        let x2 = new DeclStmt("x");
    
        let seq = new Sequence(x1, x2) 
        let tcVisitor = new TypeCheckVisitor();

        seq.accept(tcVisitor);
        let expected = ["Duplicate variable declaration: x"]; 
                    
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected); 
    })

    it("type-check 3 Stmnts with Duplicate Variables", () => {
        let x1 = new DeclStmt("x");
        let x2 = new DeclStmt("x");
        let x3 = new DeclStmt("x");
        let seq = new Sequence(x1, new Sequence(x2 ,x3)) 
        let tcVisitor = new TypeCheckVisitor();

        seq.accept(tcVisitor);
        let expected = ["Duplicate variable declaration: x","Duplicate variable declaration: x"]; 
                    
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected); 
    })

    it("type-check Duplicate Variables in different places", () => {
        let x1 = new DeclStmt("x");
        let x2 = new DeclStmt("x");
        let x3 = new DeclStmt("x");
        let tcVisitor = new TypeCheckVisitor();


        let one = new StringLiteral("1")
        let two = new StringLiteral("2")
        let three = new StringLiteral("3")
        let four  = new StringLiteral("4")
        let plusOneTwo = new PlusExpr(one, two)
        let plusThreeFour = new PlusExpr(three, four)
        let declA = new DeclStmt("a")
        let declY = new DeclStmt("y")
        let declZ  = new DeclStmt("z")
        let assignX = new Assignment("x", plusOneTwo)
        let assignY =  new Assignment("y", plusThreeFour)
    
        let seq = new Sequence(declA,  
                     new Sequence(declY,  
                        new Sequence(x1,
                         new Sequence(declZ,
                            new Sequence(assignX,
                                new Sequence(x2,
                                  new Sequence(assignY,x3))))))) 

        seq.accept(tcVisitor);
        let expected = ["Duplicate variable declaration: x","Duplicate variable declaration: x"]; 
                    
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected); 
    })
    


})


describe("TypeCheckVisitorTests for PlusExpression", () => {

    it("type-check no error", () => {
        let one = new NumericLiteral(2)
        let two = new NumericLiteral(1)
        let three = new StringLiteral("3")
        let four  = new StringLiteral("4")
        let plusOneTwo = new PlusExpr(one, two)
        let plusThreeFour = new PlusExpr(three, four)
        let declX = new DeclStmt("x")
        let declY = new DeclStmt("y")
        let assignX = new Assignment("x", plusOneTwo)
        let assignY =  new Assignment("y", plusThreeFour)
        let reassgnX = new Assignment("x", new VarExpr("y"))
        let seq = new Sequence(declX,  
                     new Sequence(declY,  
                            new Sequence(assignX,
                             new Sequence(assignY, reassgnX)))) 

        let tcVisitor = new TypeCheckVisitor();
         seq.accept(tcVisitor);
        let expected: string[] = [] 
                    
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected); 

    })

    it("type-check one Plus Epxression", () => {
        let two = new NumericLiteral(1)
        let three = new StringLiteral("three")
        let plusThreeTwo = new PlusExpr(three, two)
 

        let tcVisitor = new TypeCheckVisitor();
        plusThreeTwo.accept(tcVisitor);
        let expected: string[] = ["Type error in expression: \"three\" + 1"] 
                    
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected); 

    })


    it("type-check nested invalid and valid Plus Epxressions", () => {
        let one = new NumericLiteral(1)
        let two = new NumericLiteral(2)
        let three = new StringLiteral("3")
        let four  = new StringLiteral("4")
        let plusOneTwo = new PlusExpr(one, two)
        let plusThreeFour = new PlusExpr(three, four)
        let invalidPlus = new PlusExpr(one, three)
        let invalidPlus1 = new PlusExpr(four, two)
        let nestedInvalidPlus = new PlusExpr(plusOneTwo, plusThreeFour)
        let nestedInvalidPlus1 = new PlusExpr(invalidPlus, invalidPlus1)
       
        let nestedValidPlus1 = new PlusExpr(plusOneTwo, plusOneTwo)
        let nestedValidPlus2 = new PlusExpr(plusThreeFour, plusThreeFour)
        
        let declNums = new DeclStmt("nums")
        let declStrs = new DeclStmt("strs")
        let declInvalidPlus  = new DeclStmt("invalidPlus")
        let declInvalidPlus1 = new DeclStmt("invalidPlus1")
        let declNestedInvalidPlus =  new DeclStmt("nestedInvalidPlus")
        let declNestedInvalidPlus1 =  new DeclStmt("nestedInvalidPlus1")
        let declNestedValidPlus1 =  new DeclStmt("nestedValidPlus1")
        let declNestedValidPlus2 =  new DeclStmt("nestedValidPlus2")
        
        let assignNums = new Assignment("nums", plusOneTwo)
        let assignStrs =  new Assignment("strs", plusThreeFour)
        let assignInvalidPlus  = new Assignment("invalidPlus", invalidPlus)
        let assignInvalidPlus1  = new Assignment("invalidPlus1", invalidPlus1)
        let assignNestedInvalidPlus = new Assignment("nestedInvalidPlus", nestedInvalidPlus)
        let assignNestedInvalidPlus1 = new Assignment("nestedInvalidPlus", nestedInvalidPlus1)
        let assignNestedValidPlus1  = new Assignment("nestedValidPlus1", nestedValidPlus1)
        let assignNestedValidPlus2  = new Assignment("nestedValidPlus2", nestedValidPlus2)
        let seq = new Sequence(declNums,  
                  new Sequence(declStrs,  
                  new Sequence(declInvalidPlus,
                  new Sequence(declNestedInvalidPlus,  
                  new Sequence(declNestedValidPlus1,  
                  new Sequence(declNestedValidPlus2,
                  new Sequence(declInvalidPlus1,
                  new Sequence(declNestedInvalidPlus1,
                   
                        new Sequence(assignNums,  
                        new Sequence(assignStrs,  
                        new Sequence(assignInvalidPlus1, 
                        new Sequence(assignInvalidPlus,
                        new Sequence(assignNestedValidPlus1,  
                        new Sequence(assignNestedInvalidPlus1,       
                        new Sequence(assignNestedValidPlus2,assignNestedInvalidPlus)))))))))))))))


        let tcVisitor = new TypeCheckVisitor();
        seq.accept(tcVisitor);
        let expected: string[] = [
        'Type error in expression: \"4\" + 2',
        'Type error in expression: 1 + \"3\"',
        'Type error in expression: 1 + \"3\"',
        'Type error in expression: \"4\" + 2',
        'Type error in expression: 1 + \"3\" + \"4\" + 2',
        'Type error in expression: 1 + 2 + \"3\" + \"4\"'] 
                    
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected); 

    })


})