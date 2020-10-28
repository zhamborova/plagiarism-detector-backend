import IIterator from "./IIterator";
import Stmt from "./Stmt"

import CollectVisitor from "./CollectVisitor";

/**
 * Iterator a class that iterates over Ast Stmt nodes
 */
export default class Iterator implements IIterator<Stmt>{
    private visitor = new CollectVisitor()
    private nodes : Array<Stmt> = []
    private index: number

    constructor(node: Stmt){
        this.index = 0
        node.accept(this.visitor)
        this.nodes = this.visitor.getNodes();
         
    }
    /**
     * Determines whether there is a next element in a collection of nodes - this.nodes
     */
    public hasNext(): boolean {
       return this.index < this.nodes.length 
    }

    /**
     * @returns the next AST Stmt if there is one
     * else throws an error signifying no nodes left
     */
    public next() : Stmt{
        if(this.hasNext()){

            return this.nodes[this.index++]
        }
        else{
            throw new Error("No nodes")
        }
        
    }


}