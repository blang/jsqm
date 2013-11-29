var Scanner = function(inputText) {
	var input = inputText;	
	var cursor = 0;
	var index = 0;
	var column = 0;
	var line = 1;
	var lastChar = null;
	validateInput();
	function validateInput(){
		if(!Utility.isString(inputText)){
			throw "Input is not a string";
		}
	};
	var getNext = function(){
		if(lastChar == '\0'){
			return new Character('\0',index,column,line);
		}
		index++;
		if(lastChar == '\n'){
			line++;
			column = 0;
		}
		column++;
		if(cursor >= inputText.length){
			lastChar = '\0';
			return new Character('\0',index,column,line);
		}else{
			lastChar = inputText.charAt(cursor++);
			return new Character(lastChar,index,column, line );
		}
	};

	var hasNext = function(){
		return cursor < inputText.length;

	};

	var lookAhead = function(){
		var laIndex = index;
		var laColumn = column;
		var laLine = line;
		if(lastChar == '\0'){
			return new Character('\0',laIndex,laColumn,laLine);
		}
		laIndex++;
		if(lastChar == '\n'){
			laLine++;
			laColumn = 0;
		}
		laColumn++;
		if((cursor) >= inputText.length){
			return new Character('\0',laIndex,laColumn,laLine);
		}else{
			var newchar = inputText.charAt(cursor);
			return new Character(newchar,laIndex,laColumn, laLine );
		}

	};

	return {
		
		'getNext' : getNext,
		'hasNext' : hasNext,
		'lookAhead' : lookAhead


	};

};
