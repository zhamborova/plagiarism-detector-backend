import ASTNode from "./ASTNode";
import Assignment from '../src/Assignment';
import StringLiteral from '../src/StringLiteral'
import NumericLiteral from '../src/NumericLiteral'
import Sequence from '../src/Sequence';
import PlusExpr from '../src/PlusExpr'
import VarExpr from '../src/VarExpr'
import DeclStmt from '../src/DeclStmt';

/**
 * ASTVisitor interface fo ASTNode Visitors
 */
interface ASTVisitor{
     visitDeclStmt(node: DeclStmt): void
     visitAssignment(node: Assignment):void
     visitStringLiteral(node: StringLiteral):void
     visitNumericLiteral(node: NumericLiteral):void
     visitSequence(node:Sequence):void
     visitPlusExpr(node:PlusExpr):void
     visitVarExpr(node: VarExpr):void
}


export default ASTVisitor;