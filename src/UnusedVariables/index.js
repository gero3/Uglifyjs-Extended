var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;
var MAP = pro.MAP;

var unusedVarNames = {};

var run = function(ast) {
        var w = pro.ast_walker(), walk = w.walk;
        unusedVarNames = {};
        
        function _lambda(name, args, body){
            var prevUnusedVarNames = unusedVarNames;
            
            unusedVarNames = getAllUnusedVariableNames(body.scope);
            var checkedBody = checkStatements(body);
            var resultBody = MAP(checkedBody, walk);
            
            unusedVarNames = prevUnusedVarNames;
            
            return [ this[0], name, args.slice(),  resultBody];
        }
        
        return w.with_walkers({
            "function": _lambda,
            "defun": _lambda
        }, function() {
                return walk(pro.ast_add_scope(ast));
        });
    
};

function getAllUnusedVariableNames(scope){
    var result = {},names = scope.names,refs = scope.refs;
    for(var i in names){
        if (names[i] === "var" && !refs[i]) {
            result[i] = true;
        }
    }
    return result;
}

function checkStatements(statements){
   var returnValue = [];
   for(var i = 0,l = statements.length;i<l;i++){
       if (statements[i][0] === "var"){
            var statement = checkVarDeclStatement(statements[i]);
            if (statement){
                returnValue.push(statement);
            };
        } else {
            returnValue.push(statements[i]);
        };
    } 
    return returnValue;
}

function checkVarDeclStatement(statement){
    var returnValue = [],decl = statement[1]; 
    for(var i = 0,l = decl.length;i<l;i++){
        if (! unusedVarNames[decl[i][0]]){
            returnValue.push(decl[i]);
        }
    }
    
    if (returnValue.length > 0){
        return ["var",returnValue];
    } else {
        return false;
    }
       
    
};

exports.run = run;