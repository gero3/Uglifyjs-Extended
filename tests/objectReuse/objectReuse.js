var testObject = function(){
    this.info = { counter : 0, rendered : 0};
    this.id = 0;
};


testObject.prototype.update = function(){
    this.id = this.id +1;
    var a = this.id;
    this.info.counter  = a;
    var b= this.info.rendered;
    var c = this.info.rendered;
    
    
};

testObject.prototype.clear = function(){
    this.info = { counter : undefined, rendered : undefined};
};

function test(test){
  var undefined = 1000;
  
  return undefined * Math.random() > undefined * Math.random() ? undefined * Math.random() : undefined * Math.random() * undefined * Math.random()*test;
    
};