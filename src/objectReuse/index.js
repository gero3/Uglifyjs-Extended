var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;
var ast_add_scope = require("./scope").ast_add_scope;
var getNextVariable = require("./scope").getNextVariable;
var MAP = pro.MAP;

var run = function(ast) {
        var w = pro.ast_walker(), walk = w.walk,current_scope;
        
        function _lambda(name, args, body){        
            var scope = body.scope;
            current_scope = scope;
            var resultBody = body.slice(0);
            var Variables = [];
            
            var thisObject = scope.thisObject;
            if (!thisObject.assigned && !thisObject.declaredVariable && thisObject.used > 3){
                //console.log(scope.names,scope.refs)
                var newVar = getNextVariable(scope);
                thisObject.update = true;
                thisObject.updateTo = newVar;
                Variables.push([newVar , ["name","this"]]);
            }
            
            var undefinedObject = scope.undefinedObject;
            if (!undefinedObject.assigned && !undefinedObject.declaredVariable && undefinedObject.used > 1){
                //console.log(scope.names,scope.refs)
                newVar = getNextVariable(scope);
                undefinedObject.update = true;
                undefinedObject.updateTo = newVar;
                Variables.push([newVar]);
            }
            
            resultBody = MAP(resultBody, walk);
                    
            if (Variables.length > 0){
                resultBody.unshift(["var",Variables]);
            }
            
            current_scope = scope.parent;
            return [ this[0], name, args.slice(),  resultBody];
        }
        
        return w.with_walkers({
            "function": _lambda,
            "defun": _lambda,
            "name": function(name) {
                if (name == "this") {
                    if (current_scope.thisObject.update){
                        return ["name",current_scope.thisObject.updateTo];
                    }
                }
                if (name == "undefined") {
                    if (current_scope.undefinedObject.update){
                        return ["name",current_scope.undefinedObject.updateTo];
                    }
                }
            }
        }, function() {
                return walk(ast_add_scope(ast));
        });
    
};

function HOP(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
};

exports.run = run;
