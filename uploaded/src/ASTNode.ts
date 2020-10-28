import Stmt from "./Stmt"
import ASTVisitor from "./ASTVisitor"

import IIterator from "./IIterator"
import Iterator from "./Iterator"
/**
 * Root of the AST Node hierarchy.  
 */
abstract class ASTNode {
  /**
   * create textual representation of the AST node
   */
  abstract text() : string

  abstract accept(visitor: ASTVisitor): void
  
  /**
   * @returns IIterator for ASTNone Stmts
   */
  stmtIterator() : IIterator<Stmt>{
    return new Iterator(this)
  }
}

export default ASTNode