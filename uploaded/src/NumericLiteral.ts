import LiteralExpr from './LiteralExpr'
import ASTVisitor from './ASTVisitor'
import IIterator from './IIterator';
import Stmt from './Stmt';
import Iterator  from './Iterator';
/**
 * ASTNode representing a numeric literal 
 */
class NumericLiteral extends LiteralExpr {

  constructor(private value: number){
    super()
  }


  text() : string {
    return this.value.toString();
  }
  
  /**
   * @param visitor a type of a ASTVisitor
   * A method that accepts the visitor for NumericLiteral
  */
  public accept = (visitor: ASTVisitor) => visitor.visitNumericLiteral(this)

}

export default NumericLiteral