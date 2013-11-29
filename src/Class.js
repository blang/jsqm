var Class = function(name){
	this.name = name;
	this.classes = [];	
	this.attributes = [];

};

Class.prototype.getName = function(){
	return this.name;
};

Class.prototype.addClass = function(clazz){
	this.classes.push(clazz);
};

Class.prototype.getClasses = function(){
	return this.classes;
};


Class.prototype.addAttribute = function(attribute){
	this.attributes.push(attribute);
};

Class.prototype.getAttributes = function(){
	return this.attributes;
};

