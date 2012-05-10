var fs = require("fs");
var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;
var uglifyExt = require("../src");

function getAst(text){
    var ast = jsp.parse(text); // parse code and get the initial AST
    return ast;
}
function compressAst(ast){
    ast = pro.ast_mangle(ast); // get a new AST with mangled names
    ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
//    ast = pro.ast_lift_variables(ast)
    return ast;
}

function generateCode(ast){
    
    var text = pro.gen_code(ast); // compressed code here
    return text;
}


function test(name){
    var start = new Date();
    var text = fs.readFileSync("Examples/" + name + "/" + name + ".js","utf8");
    var ast = getAst(text);
    
    var compressedAst = compressAst(ast);
    var normalcode = generateCode(compressedAst);
    fs.writeFileSync("Examples/" + name + "/" + name + "_normal.js",normalcode,"utf8");
    
    var compressedExtAst = uglifyExt.runAll(ast);
    var extendedcode = generateCode(compressedExtAst);
    fs.writeFileSync("Examples/" + name + "/" + name + "_extended.js",extendedcode,"utf8");
    
    console.log(name + " ended in " + ((+new Date()) - start) + "ms.");
    console.log(name + " was " + text.length/1000 + "kB.\n It is compressed to " + normalcode.length/1000 + "kB in normal and to " + extendedcode.length/1000 + "kB in extended.");
}

function main(){

    test("jquery");
    test("threejs");
}

main();