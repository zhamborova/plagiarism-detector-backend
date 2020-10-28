import Stmt from './Stmt'
import Expr from './Expr'
import ASTVisitor from './ASTVisitor';
import IIterator from './IIterator';
import Iterator  from './Iterator';
/**
 * ASTNode representing an assignment statement  
 */
class Assignment extends Stmt {

  constructor(private varName: string, private exp: Expr){ 
    super()
  }

  
  public text() : string {
    return this.varName + " = " + this.exp.text();
  } 

  /**
   * @param visitor a type of a ASTVisitor
   * A method that accepts the visitor for Assignment
  */
  public accept =(visitor: ASTVisitor) => { 
    visitor.visitAssignment(this)
  }

 /**
  * @returns an ASTNode Expression
  */
   public getExp = () => this.exp
}

export default Assignment