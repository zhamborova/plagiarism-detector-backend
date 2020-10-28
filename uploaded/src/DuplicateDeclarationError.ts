import ITypeCheckError from "./ITypeCheckError";
import DeclStmt from "./DeclStmt";

/**
 * DuplicateDeclarationError is class represinting duplicate declaration errors in AST tree
 */
export default class DuplicateDeclarationError implements ITypeCheckError {
    
    
    constructor(private decl: DeclStmt){
      
    } 
     toString = () :String => {
      return `Duplicate variable declaration: ${this.decl.getVarName()}`
    }

    
}