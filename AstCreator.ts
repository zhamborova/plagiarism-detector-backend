import {Parser, Node} from 'acorn';
import * as fs from 'fs'
import * as path from "path";



class AstCreator {

    private readonly astsForProgram1 : Array<Node>;
    private readonly astsForProgram2 : Array<Node>;



    constructor() {
        this.astsForProgram1 = this.walkDir(`${__dirname}/project1`, [], this.parseFileToAst);
        this.astsForProgram2 = this.walkDir(`${__dirname}/project2`, [], this.parseFileToAst);

    }


 parseFileToAst=(filePath:string,list:Array<Node>)=> {
    const ast = Parser.parse(fs.readFileSync(filePath,null).toString(), null);
    list.push(ast);
    return list;
    }

 walkDir = (dir:string, list:Array<Node>,
            callback:(filePath:string,list:Array<Node>) => Array<Node>)  =>{
    fs.readdirSync(dir).forEach( (f: string) => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ?
            this.walkDir(dirPath,list, callback) : callback(path.join(dir, f),list);
    });

    return list;
};

//
    getProgram1Asts= () => this.astsForProgram1

    getProgram2Asts = () => this.astsForProgram2;
}



const test = new AstCreator();

console.log(test.getProgram1Asts(), test.getProgram2Asts())

