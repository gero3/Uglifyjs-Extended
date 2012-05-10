var pro = require("uglify-js").uglify;

var ArrayJoin = require("./ArrayJoin");
var UnusedVariables = require("./UnusedVariables");
var objectReuse = require("./objectReuse");

var runAll = function(ast) {
    
    ast = objectReuse.run(ast);
    ast = UnusedVariables.run(ast);
    ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
    ast = pro.ast_mangle(ast); // get a new AST with mangled names
    ast = ArrayJoin.run(ast);


    
    return ast;
};

exports.runAll = runAll;
exports.ArrayJoin = ArrayJoin;