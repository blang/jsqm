var Attribute = function(key, value, type){
	this.key = key;
	this.value = value;
	this.type = type;
};
Attribute.prototype.getKey = function(){ return this.key;};
Attribute.prototype.getValue = function(){ return this.value;};
Attribute.prototype.getType = function(){ return this.type;};
Attribute.Type = {
	STRING: 1,
	STRINGLIST: 2,
	NUMBER: 3,
	NUMBERLIST: 4,
	FLOAT: 5,
	FLOATLIST: 6
};

