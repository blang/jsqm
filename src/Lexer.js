var Lexer = function(scanner) {
	var lastChar = null;
	var currentChar = null;
	var nextChar = null;


	var getNextChar = function(){
		lastChar = currentChar;
		currentChar = scanner.getNext();
		nextChar = scanner.lookAhead();
	};

	//init
	getNextChar();

	var getNextToken = function(){
		var content = null;
		var type = null;
		var startChar = null;
		var endChar = null;
		if(LexerRules.isWhitespace(currentChar.getCharacter())){
			type = Token.Type.WHITESPACE;
			startChar = currentChar;
			content = currentChar.getCharacter();
			getNextChar();
			while(LexerRules.isWhitespace(currentChar.getCharacter())){
				content+=currentChar.getCharacter();	
				getNextChar();
			}
			//dont return whitespaces
			//return new Token(content, type, startChar.getIndex(), lastChar.getIndex(), startChar.getColumn(), lastChar.getColumn(), startChar.getLine(), lastChar.getLine());
		}

		if(LexerRules.isEndmark(currentChar.getCharacter())){

			return new Token("", Token.Type.EOF, currentChar.getIndex(), currentChar.getIndex(), currentChar.getColumn(), currentChar.getColumn(), currentChar.getLine(), currentChar.getLine());

		}

		if(LexerRules.isAlpha(currentChar.getCharacter())){
			type = Token.Type.IDENTIFIER;
			startChar = currentChar;
			content = currentChar.getCharacter();
			getNextChar();
			while(LexerRules.isAlpha(currentChar.getCharacter()) || LexerRules.isNumber(currentChar.getCharacter())) {
				content+=currentChar.getCharacter();
				getNextChar();
			}
			return new Token(content, type, startChar.getIndex(), lastChar.getIndex(), startChar.getColumn(), lastChar.getColumn(), startChar.getLine(), lastChar.getLine());
		}

		if(LexerRules.isNumber(currentChar.getCharacter()) || LexerRules.isMinus(currentChar.getCharacter())){
			type = Token.Type.NUMBER;
			startChar = currentChar;
			content = currentChar.getCharacter();
			getNextChar();
			while(LexerRules.isNumber(currentChar.getCharacter()) || LexerRules.isFloatLimiter(currentChar.getCharacter())) {
				if(LexerRules.isFloatLimiter(currentChar.getCharacter())){
					type = Token.Type.FLOAT;
				}
				content+=currentChar.getCharacter();
				getNextChar();
			}
			return new Token(content, type, startChar.getIndex(), lastChar.getIndex(), startChar.getColumn(), lastChar.getColumn(), startChar.getLine(), lastChar.getLine());
		}

		if(LexerRules.isSymbol(currentChar.getCharacter())){
			type = Token.Type.SYMBOL;
			startChar = currentChar;
			content = currentChar.getCharacter();
			getNextChar();
			return new Token(content, type, startChar.getIndex(), lastChar.getIndex(), startChar.getColumn(), lastChar.getColumn(), startChar.getLine(), lastChar.getLine());

		}

		if(LexerRules.isStringLimiter(currentChar.getCharacter())){
			type = Token.Type.STRING;
			startChar = currentChar;
			//dont save quotes
			content = currentChar.getCharacter();
			//content = "";
			getNextChar();
			while(!(LexerRules.isStringLimiter(currentChar.getCharacter())) || (LexerRules.isStringLimiter(currentChar.getCharacter()) && LexerRules.isStringLimiter(nextChar.getCharacter() ))){
				if(LexerRules.isEndmark(currentChar.getCharacter())){
					type = Token.Type.ERROR;
					return new Token(content, type, startChar.getIndex(), lastChar.getIndex(), startChar.getColumn(), lastChar.getColumn(), startChar.getLine(), lastChar.getLine());
				}
				content += currentChar.getCharacter();
				getNextChar();
				if(LexerRules.isStringLimiter(currentChar.getCharacter()) && LexerRules.isStringLimiter(lastChar.getCharacter())){
					content += currentChar.getCharacter();
					getNextChar();
				}

			}
			content += currentChar.getCharacter();
			//step over quote
			getNextChar();
			return new Token(content, type, startChar.getIndex(), lastChar.getIndex(), startChar.getColumn(), lastChar.getColumn(), startChar.getLine(), lastChar.getLine());

		}
		startChar = currentChar;
		content = currentChar.getCharacter();
		type = Token.Type.UNKNOWN;
		getNextChar();
		return new Token(content, type, startChar.getIndex(), lastChar.getIndex(), startChar.getColumn(), lastChar.getColumn(), startChar.getLine(), lastChar.getLine());
	};
	return {
		'getNext' : getNextToken
	};

};
