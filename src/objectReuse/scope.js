var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;
var MAP = pro.MAP;

function ast_add_scope(ast) {

        var current_scope = null;
        var w = pro.ast_walker(), walk = w.walk,inassignement;

        function with_updated_scope(scope,cont) {
                current_scope = scope;
                var ret = current_scope.body = cont();
                ret.scope = current_scope;
                current_scope = current_scope.parent;
                return ret;
        };
        
        function _lambda(name, args, body) {
            
            var scope = body.scope;
            
            scope.thisObject = {
                "used" : 0,
                "assigned" : false,
                "declaredVariable" : false,
                "updateTo" : "",
                "update":false
            };
            
            scope.undefinedObject = {
                "used" : 0,
                "assigned" : false,
                "declaredVariable" : false,
                "updateTo" : "",
                "update":false
            };
            
            return [ this[0], name, args, with_updated_scope(scope,function(){
                    return MAP(body, walk);
            })];
        }

        function _vardefs(defs) {
            for( var i = 0,il =defs.length;i<il;i++){
                if (defs[i] === "this"){
                    current_scope.thisObject.declaredVariable = true;
                    current_scope.thisObject.used++;
                }
                
                if (defs[i] === "undefined"){
                    current_scope.undefinedObject.declaredVariable = true;
                    current_scope.undefinedObject.used++;
                }
            }
        }

        return w.with_walkers({
                        "function": _lambda,
                        "defun": _lambda,
                        "var": _vardefs,
                        "const": _vardefs,
                        "name": function(name) {
                            if (name == "this") {
                                current_scope.thisObject.used++;
                                /*if (inassignement){
                                    current_scope.thisObject.assigned =true;
                                };*/
                            }
                            if (name == "undefined") {
                                current_scope.undefinedObject.used++;
                                
                            }
                            return ["name",name]
                        },
                        "assign":function(op, lvalue, rvalue){
                            var ret = walk(lvalue);
                            return [ this[0], op, ret, walk(rvalue) ]; 
                        }
                        
                }, function(){
                        return walk(pro.ast_add_scope(ast));
                });

};


function HOP(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
};

var base54 = (function(){
        var DIGITS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789";
        return function(num) {
                var ret = "", base = 54;
                do {
                        ret += DIGITS.charAt(num % base);
                        num = Math.floor(num / base);
                        base = 64;
                } while (num > 0);
                return ret;
        };
})();

function is_identifier(name) {
        return /^[a-z_$][a-z0-9_$]*$/i.test(name)
                && name != "this"
                && !HOP(jsp.KEYWORDS_ATOM, name)
                && !HOP(jsp.RESERVED_WORDS, name)
                && !HOP(jsp.KEYWORDS, name);
};

var getNextVariable = function(scope){
    var counter = 0;
    for (;;) {
        var m = base54(++counter),prior;

        prior = scope.has(m);
        if (prior)
            continue;

        if (HOP(scope.refs, m))
            continue;

        if (!is_identifier(m))
            continue;

        scope.define(m, "var");
        return m;
    }
};



exports.ast_add_scope = ast_add_scope;
exports.getNextVariable = getNextVariable;