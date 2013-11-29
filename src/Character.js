var Character = function(character, index, column, line){
	this.character = character;
	this.index = index;
	this.column = column;
	this.line = line;
};
Character.prototype.getCharacter = function(){
	return this.character;
};

Character.prototype.getIndex = function(){
	return this.index;
};

Character.prototype.getColumn = function(){
	return this.column;
};

Character.prototype.getLine = function(){
	return this.line;
};
