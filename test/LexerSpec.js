describe("Lexer", function(){
	it("should  accept valid scanner", function(){
		var scanner = new Scanner("Text");
		new Lexer(scanner);	

	});
	
	it("should ignore whitespaces", function(){
		var scanner = new Scanner("    Text");
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getContent()).toBe("Text");
		expect(next.getType()).toBe(Token.Type.IDENTIFIER);
		expect(next.getIndexBegin()).toBe(5);
		expect(next.getIndexEnd()).toBe(8);
		expect(next.getColumnBegin()).toBe(5);
		expect(next.getColumnEnd()).toBe(8);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
	});

	it("should recognize string end", function(){
		var scanner = new Scanner("    ");
		var lexer = new Lexer(scanner);	
		lexer.getNext();
		var next = lexer.getNext();
		expect(next.getType()).toBe(Token.Type.EOF);
		expect(next.getIndexBegin()).toBe(5);
		expect(next.getIndexEnd()).toBe(5);
		expect(next.getColumnBegin()).toBe(5);
		expect(next.getColumnEnd()).toBe(5);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
	});

	it("should recognize empty input properly", function(){
		var scanner = new Scanner("");
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getType()).toBe(Token.Type.EOF);
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(1);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(1);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
		//Should not go further
		var next = lexer.getNext();
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(1);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(1);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
		expect(next.getLineBegin()).toBe(1);
	});

	it("should recognize an identifier", function(){
		var scanner = new Scanner("Item18");
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getContent()).toBe("Item18");
		expect(next.getType()).toBe(Token.Type.IDENTIFIER);
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(6);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(6);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
	});
	it("should recognize a positive number", function(){
		var scanner = new Scanner("123");
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getContent()).toBe("123");
		expect(next.getType()).toBe(Token.Type.NUMBER);
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(3);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(3);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
	});

	it("should recognize a floating number", function(){
		var scanner = new Scanner("123.456");
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getContent()).toBe("123.456");
		expect(next.getType()).toBe(Token.Type.FLOAT);
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(7);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(7);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
	});

	it("should recognize a negative floating number", function(){
		var scanner = new Scanner("-123.456");
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getContent()).toBe("-123.456");
		expect(next.getType()).toBe(Token.Type.FLOAT);
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(8);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(8);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
	});

	it("should recognize a negative number", function(){
		var scanner = new Scanner("-123");
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getContent()).toBe("-123");
		expect(next.getType()).toBe(Token.Type.NUMBER);
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(4);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(4);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
	});
	
	it("should recognize a symbol", function(){
		var scanner = new Scanner("=;,{}[]");
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getContent()).toBe("=");
		expect(next.getType()).toBe(Token.Type.SYMBOL);
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(1);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(1);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
	});


	it("should recognize a string", function(){
		var scanner = new Scanner('"Mein String"');
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getContent()).toBe('"Mein String"');
		expect(next.getType()).toBe(Token.Type.STRING);
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(13);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(13);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
	});

	it("should recognize a string with a single escaped string inside", function(){
		var scanner = new Scanner('"Mein ""test"" String"');
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getContent()).toBe('"Mein ""test"" String"');
		expect(next.getType()).toBe(Token.Type.STRING);
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(22);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(22);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);

	});

	it("should recognize an unterminated string", function(){
		var scanner = new Scanner('"Mein');
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getContent()).toBe('"Mein');
		expect(next.getType()).toBe(Token.Type.ERROR);
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(5);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(5);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);

	});

	it("should handle unkown tokens", function(){
		var scanner = new Scanner('|test|');
		var lexer = new Lexer(scanner);	
		var next = lexer.getNext();
		expect(next.getContent()).toBe('|');
		expect(next.getType()).toBe(Token.Type.UNKNOWN);
		expect(next.getIndexBegin()).toBe(1);
		expect(next.getIndexEnd()).toBe(1);
		expect(next.getColumnBegin()).toBe(1);
		expect(next.getColumnEnd()).toBe(1);
		expect(next.getLineBegin()).toBe(1);
		expect(next.getLineEnd()).toBe(1);
	});

	//should handle multiple tokes after eachother	
});
