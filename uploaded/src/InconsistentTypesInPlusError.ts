import ITypeCheckError from "./ITypeCheckError";
import PlusExpr from "./PlusExpr"

/**
 * InconsistentTypesInPlusError class represents errors when different types
 * are given to Plus Expressions
 */
export default class InconsistentTypesInPlusError implements ITypeCheckError {
    
    constructor(private expr: PlusExpr ){}
    
     toString = (): String => {
      return `Type error in expression: ${this.expr.text()}`
    }

    
}