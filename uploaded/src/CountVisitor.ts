import ASTVisitor from './ASTVisitor';
import Assignment from '../src/Assignment';
import StringLiteral from '../src/StringLiteral'
import NumericLiteral from '../src/NumericLiteral'
import Sequence from '../src/Sequence';
import PlusExpr from '../src/PlusExpr'
import VarExpr from '../src/VarExpr'
import DeclStmt from '../src/DeclStmt';

/**
 * CounterVisitor counts the occurence of each type of node in AST tree
 */
class CountVisitor implements ASTVisitor{
    private declStmtCount = 0;
    private assigmentCount = 0;
    private strLtrlCount = 0;
    private numLtrlCount = 0;
    private sequenceCount = 0;
    private plusExpCount =  0;
    private varExpCount = 0;

   constructor(){}

   /**
    * Visiting method tha increases count of DeclStmt occurences in a tree
    * @param node DeclStmt
    */
   public visitDeclStmt=(node: DeclStmt): void=>{
           this.declStmtCount++;
    }
    /**
     * Visiting method tha increases count of Assignmnet occurences in a tree
     * @param node 
     */
    public visitAssignment=(node: Assignment):void=>{
          this.assigmentCount++;
          node.getExp().accept(this)
    }

    /**
     * Visiting method tha increases count of StringLiteral occurences in a tree
     * @param node 
     */
    public visitStringLiteral=(node: StringLiteral):void=>{
         this.strLtrlCount++;
    }
    /**
     * Visiting method tha increases count of NumericLiteral occurences in a tree
     * @param node 
     */
    public visitNumericLiteral=(node: NumericLiteral):void=>{
        this.numLtrlCount++;
    }
    /**
     * Visiting method tha increases count of Sequnce occurences in a tree
     * @param node 
     */
    public visitSequence=(node:Sequence):void=>{
        this.sequenceCount++;

        node.getStmt1().accept(this)
        node.getStmt2().accept(this)
      
    }
    /**
     * Visiting method tha increases count of PlusExpr occurences in a tree
     * @param node 
     */
    public visitPlusExpr=(node:PlusExpr):void =>{
        this.plusExpCount++;
        node.getLeft().accept(this)
        node.getRight().accept(this)
    
    }
    /**
     * Visiting method tha increases count of VarExpr occurences in a tree
     * @param node 
     */
    public visitVarExpr=(node: VarExpr):void =>{
        this.varExpCount++;
    }

    /**
     * Gets the count of the Assignment nodes
     */
    public getNrAssignment= () => this.assigmentCount
      /**
     * Gets the count of the DeclStmt nodes
     */
    public getNrDeclStmt =  () => this.declStmtCount
      /**
     * Gets the count of the NumericLiteral nodes
     */
    public getNrNumericLiteral= () => this.numLtrlCount
      /**
     * Gets the count of the PlusExpr nodes
     */
    public getNrPlusExpr= () => this.plusExpCount
      /**
     * Gets the count of the Sequence nodes
     */
    public getNrSequence= () => this.sequenceCount
      /**
     * Gets the count of the StringLiteral nodes
     */
    public getNrStringLiteral= () => this.strLtrlCount
      /**
     * Gets the count of the VarExpr nodes
     */
    public getNrVarExpr= () => this.varExpCount


}


export default CountVisitor;