import ASTVisitor from './ASTVisitor';
import ASTNode from './ASTNode';
import Assignment from '../src/Assignment';
import StringLiteral from '../src/StringLiteral'
import NumericLiteral from '../src/NumericLiteral'
import Sequence from '../src/Sequence';
import PlusExpr from '../src/PlusExpr'
import VarExpr from '../src/VarExpr'
import DeclStmt from '../src/DeclStmt';
import Stmt from './Stmt';

/**
 * CollectorVisitor collects all simple Stmt ASTnodes that are not Sequences
 */
class CollectVisitor implements ASTVisitor{
    private nodes: Array<Stmt> = []

    constructor(){}
    
    public getNodes= () => this.nodes

    /**
     * Collects Stmts of a Sequence nodes
     * @param node 
     */
    public visitSequence=(node:Sequence): void => {
        node.getStmt1().accept(this)
        node.getStmt2().accept(this) 
    }

    /**
     * Collects DeclStms nodes
     * @param node 
     */
    public visitDeclStmt=(node: DeclStmt): void => {
          this.nodes.push(node)
       
    }
    /**
     * Collects Assignmnet nodes
     * @param node 
     */
    public visitAssignment=(node: Assignment):void=>{
          this.nodes.push(node)
     
    }  

     /**
     * Does not collect String Literal nodes
     * @param node 
     */
    public visitStringLiteral=(node: StringLiteral):void=>{

    } 
    
    /**
    * Does not collect String Literal nodes
    * @param node 
    */
    public visitNumericLiteral=(node: NumericLiteral):void=>{
    }
     /**
     * Does not collect Plus Expressions nodes
     * @param node 
     */
    public visitPlusExpr=(node:PlusExpr):void =>{

    }
      /**
     * Does not collect VarExpr nodes
     * @param node 
     */
    public visitVarExpr=(node: VarExpr):void =>{

    }

   
 

}


export default CollectVisitor;