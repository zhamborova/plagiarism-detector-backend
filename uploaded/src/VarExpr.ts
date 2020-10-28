import Expr from './Expr'
import ASTVisitor from './ASTVisitor';
import IIterator from './IIterator';
import Stmt from './Stmt';
import Iterator  from './Iterator';

/**
 * ASTNode representing a variable 
 */
class VarExpr extends Expr {
  constructor(private varName: string){
    super()
   }

  
  public text() : string {
       return this.varName; 
  } 
   /**
   * @param visitor a type of a ASTVisitor
   * A method that accepts the visitor for VarExpr
  */
  public accept = (visitor: ASTVisitor) => visitor.visitVarExpr(this)
}

export default VarExpr