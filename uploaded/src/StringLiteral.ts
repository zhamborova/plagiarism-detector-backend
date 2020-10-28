import LiteralExpr from './LiteralExpr'
import ASTVisitor from './ASTVisitor';
import IIterator from './IIterator';
import Iterator from './Iterator';
import Stmt from './Stmt';

/**
 * ASTNode representing a string literal 
 */
class StringLiteral extends LiteralExpr {

  constructor(private literal : string){
    super()
   }   
  
  public text() : string {
    return "\"" + this.literal + "\"";
  } 
  
  /**
   * @param visitor a type of a ASTVisitor
   * A method that accepts the visitor for StringLiteral
  */
  public accept = (visitor: ASTVisitor) => visitor.visitStringLiteral(this)

}

export default StringLiteral