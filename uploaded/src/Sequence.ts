import Stmt from './Stmt'
import ASTVisitor from './ASTVisitor';
import IIterator from './IIterator';
import Iterator  from './Iterator';

/**
 * ASTNode representing a sequence of statements.
 */
class Sequence extends Stmt {
  

  constructor(private stat1: Stmt, private stat2: Stmt){
       super()
   }

  
  public text() : string {
    return this.stat1.text() + "; " + this.stat2.text();
  }
 

   /**
   * @param visitor a type of a ASTVisitor
   * A method that accepts the visitor for Sequence Stmt
  */
  public accept = (visitor: ASTVisitor) => {
    visitor.visitSequence(this)
  }
  /**
   * @returns the first Stmt of a Sequence
   */
  public getStmt1 = () => this.stat1
   /**
   * @returns the second Stmt of a Sequence
   */
  public getStmt2 = () => this.stat2
}

export default Sequence