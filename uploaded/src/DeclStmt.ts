import Stmt from './Stmt'
import ASTNode from './ASTNode';
import ASTVisitor from './ASTVisitor';
import IIterator from './IIterator';
import Iterator  from './Iterator';
/**
 * ASTNode representing a variable declaration  
 */
class DeclStmt extends Stmt {

  constructor(private varName : string){ 
      super()
  }

  public text() : string {
    return "declare " + this.varName;
  }

  /**
   * @returns DeclStmt variable name
   */
  public getVarName = () => `${this.varName}`
  
   /**
   * @param visitor a type of a ASTVisitor
   * A method that accepts the visitor for DeclStmt
  */
  public accept = (visitor: ASTVisitor) => visitor.visitDeclStmt(this)

}

export default DeclStmt