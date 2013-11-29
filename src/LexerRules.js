var LexerRules = (function(){ 
	var whitespaces = " \n\r\t";
	var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var numbers = "0123456789";
	var symbols = "=;,{}[]";
	var contains = function(array, character){
		if(character.length == 0 || character.length > 1){ return false;};
		// Check compability with browsers (IE < 8)
		return array.indexOf(character) > -1;
	};

	return {
		isWhitespace : function(character){ return contains(whitespaces, character); },
		isAlpha : function(character){ return contains(alpha, character); },
		isNumber : function(character){ return contains(numbers, character); },
		isSymbol : function(character){ return contains(symbols, character); },
		isMinus : function(character){ return character == "-";},
		isEndmark : function(character){ return character == "\0";},
		isStringLimiter : function(character){ return character == '"';},
		isFloatLimiter : function(character){ return character == ".";}
	};
})();
