var Token = function(content, type, indexBegin, indexEnd, columnBegin, columnEnd, lineBegin, lineEnd){
	this.content = content;
	this.type = type;
	this.indexBegin = indexBegin;
	this.indexEnd = indexEnd;
	this.columnBegin = columnBegin;
	this.columnEnd = columnEnd;
	this.lineBegin = lineBegin;
	this.lineEnd = lineEnd;
};
Token.Type = {
	WHITESPACE: 1,
	EOF: 2,
	IDENTIFIER: 3,
	NUMBER: 4,
	FLOAT: 5,
	SYMBOL: 6,
	STRING: 7,
	UNKNOWN: 8,
	ERROR: 9
};

Token.prototype.getContent = function(){ return this.content};
Token.prototype.getType = function(){ return this.type};
Token.prototype.getIndexBegin = function(){ return this.indexBegin};
Token.prototype.getIndexEnd = function(){ return this.indexEnd};
Token.prototype.getColumnBegin = function(){ return this.columnBegin};
Token.prototype.getColumnEnd = function(){ return this.columnEnd};
Token.prototype.getLineBegin = function(){ return this.lineBegin};
Token.prototype.getLineEnd = function(){ return this.lineEnd};
