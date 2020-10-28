import Expr from './Expr'

/**
 * ASTNode representing a literal 
 */
abstract class LiteralExpr extends Expr {
  abstract text() : string
}

export default LiteralExpr