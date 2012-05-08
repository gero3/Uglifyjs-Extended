var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

var run = function(ast) {
        var w = pro.ast_walker(), walk = w.walk, scope;
        return w.with_walkers({
            "call": function(expr, args) {
                if (checkConditions(expr,args)){
                    return updateExpression(expr,args);
                }
            }
        }, function() {
                return walk(ast);
        });
    
}

var checkConditions = function(expr,args){
    var subexpr,arrayObject;
    if (!args || args.length > 1){
        return false;
    }
    
    if (args.length === 1 && args[0][0] !== "string"){
        return false;
    }
    
    if (expr[0] !== "dot" || expr[2] !== "join"){
        return false;
    }
    
    subexpr = expr[1];
    
    if (subexpr[0] !== "array"){
        return false;
    }
    
    arrayObject = subexpr[1];
    
    for (var i = 0,il = arrayObject.length;i<il;i++){
        if (arrayObject[i][0] !== "string"){
            return false;
        }
    };
    
    return true;
}

var updateExpression  = function(expr,args){
    var ArrayObject = expr[1], 
        StringObjectsToJoin = ArrayObject[1];
    var stringArgument;
    
    if (args && args.length === 1){
        stringArgument = args[0][1];
    } else {
        stringArgument = ",";
    };
    
    var completeString = [];
    
    for (var i = 0,il = StringObjectsToJoin.length;i<il;i++){
        completeString.push(StringObjectsToJoin[i][1]);
    }
    
    var stringObject = completeString.join(stringArgument);
    
    return ["string",stringObject];
    
};

exports.run = run;