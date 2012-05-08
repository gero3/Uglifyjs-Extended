var ArrayJoin = require("./ArrayJoin");
var UnusedVariables = require("./UnusedVariables");


var runAll = function(ast) {
    
    ast = ArrayJoin.run(ast);
    ast = UnusedVariables.run(ast);
    
    return ast;
};

exports.runAll = runAll;
exports.ArrayJoin = ArrayJoin;