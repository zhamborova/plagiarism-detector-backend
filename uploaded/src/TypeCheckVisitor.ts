import ASTVisitor from "./ASTVisitor";
import ITypeCheckError from "./ITypeCheckError"
import ASTNode from './ASTNode';
import Assignment from '../src/Assignment';
import StringLiteral from '../src/StringLiteral'
import NumericLiteral from '../src/NumericLiteral'
import Sequence from '../src/Sequence';
import PlusExpr from '../src/PlusExpr'
import VarExpr from '../src/VarExpr'
import DeclStmt from '../src/DeclStmt';
import DuplicateDeclarationError from './DuplicateDeclarationError'
import InconsistentTypesInPlusError from './InconsistentTypesInPlusError'

/**
 * A class that implements type checks for AST trees
 */
export default class TypeCheckVisitor implements ASTVisitor{
    
   private declStmts: string[] = []
   private type: string = ""
   private errors: Array<ITypeCheckError> = []

    constructor(){}

    /**
     * @returns errors collected in an AST tree
     */
    public getErrors = () => this.errors

  
    /**
     * Checks whether there are duplicate statements in AST tree
     * @param node 
     */
    public visitDeclStmt=(node: DeclStmt): void=>{
        if(this.declStmts.includes(node.getVarName())){
             const error = new DuplicateDeclarationError(node);
             this.errors.push(error)
        }
        this.declStmts.push(node.getVarName());
     }

      /**
      * Checks Expression of the Assignmnet for type errors
      * @param node 
      */
     public visitAssignment=(node: Assignment):void=>{

        node.getExp().accept(this)
        
      }

   /**
    * Saves the type of a string literal in TypeCheckVisitor for comparison in Plus Expression
    * @param node 
    */
     public visitStringLiteral=(node: StringLiteral):void=>{
        this.type = "string"
     }

   /**
    * Saves the type of a numeric literal in TypeCheckVisitor for comparison in Plus Expression
    * @param node 
    */
     public visitNumericLiteral=(node: NumericLiteral):void=>{
        this.type = "numeric"
     }

     /**
      * Checks statements of the sequence for type errors
      * @param node 
      */
     public visitSequence=(node:Sequence):void=>{
        node.getStmt1().accept(this)
        node.getStmt2().accept(this)

     }

     /**
      * Checks whehter plus expression has inconsistent parameters in right and left nodes
      * @param node 
      */
     public visitPlusExpr=(node:PlusExpr):void =>{
       
        node.getLeft().accept(this)
        let type1= this.type;
        node.getRight().accept(this)
        let type2 = this.type;
        if(type1 !== type2){
            let error = new InconsistentTypesInPlusError(node);
            this.errors.push(error)
         }

         
     }

     /**
      * Does not check Var Expressions
      * @param node 
      */
     public visitVarExpr=(node: VarExpr):void =>{ }
 
}