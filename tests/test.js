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
    return ast;
}

function generateCode(ast){
    
    var text = pro.gen_code(ast); // compressed code here
    return text;
}


function test(name){
    var start = new Date();
    var text = fs.readFileSync("tests/" + name + "/" + name + ".js","utf8");
    
    var ast = getAst(text);
    fs.writeFileSync("tests/" + name + "/" + name + "_ast.json",JSON.stringify(ast),"utf8");
    
    var compressedAst = compressAst(ast);
    fs.writeFileSync("tests/" + name + "/" + name + "_compress.json",JSON.stringify(compressedAst),"utf8");
    
    var compressedExtAst = ast; // use starting ast to better see the difference
    compressedExtAst = uglifyExt.runAll(compressedExtAst);
    fs.writeFileSync("tests/" + name + "/" + name + "_compressExt.json",JSON.stringify(compressedExtAst),"utf8");
    
    var code = generateCode(compressedExtAst);
    fs.writeFileSync("tests/" + name + "/" + name + "_result.js",code,"utf8");
    
    console.log(name + " ended in " + ((+new Date()) - start) + "ms.");
}

function main(){

    test("ArrayJoin");
    test("UnusedVariables");
    test("objectReuse");
}

main();