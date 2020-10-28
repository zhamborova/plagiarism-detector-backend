import Expr from './Expr'
import ASTVisitor from './ASTVisitor';
import IIterator from './IIterator';
import Stmt from './Stmt';
import Iterator  from './Iterator';

/**
 * ASTNode representing a binary "+" expression 
 */
class PlusExpr extends Expr {

  constructor(private left: Expr, private right: Expr){
       super()
   }



     
  public text() : string {
       return this.left.text() + " + " + this.right.text(); 
  }

   /**
   * @param visitor a type of a ASTVisitor
   * A method that accepts the visitor for Plus Expression
  */
  public accept = (visitor: ASTVisitor) => {
        visitor.visitPlusExpr(this)
     }
  /**
   * @returns the right Expression of the Plus Expression
   */
   public getRight = () => this.right
   /**
   * @returns the left Expression of the Plus Expression
   */
   public getLeft = () => this.left

}

export default PlusExpr