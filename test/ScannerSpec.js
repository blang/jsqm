describe("Scanner", function(){
	it("should accept only strings", function(){
		var invalidString = function(){
			new Scanner({});
		};
		var validString = function(){
			new Scanner("Test String");
		};
		var validStringObject = function(){
			new Scanner(new String("Test String"));
		};

		expect(invalidString).toThrow();
		expect(validString).not.toThrow();
		expect(validStringObject).not.toThrow();
	});


	describe(" getNext", function(){

		it("should get next character of simple string", function(){
			var scanner = new Scanner("abc");
			expect(scanner.getNext().getCharacter()).toBe('a');
			expect(scanner.getNext().getCharacter()).toBe('b');
			expect(scanner.getNext().getCharacter()).toBe('c');
		});
		
		it("should respect limits", function(){
			var scanner = new Scanner("abc");
			scanner.getNext();
			scanner.getNext();
			scanner.getNext();
			expect(scanner.getNext().getCharacter()).toBe('\0');

		});
		it("should return correct indexes", function(){
			var scanner = new Scanner("ab\nc");
			expect(scanner.getNext().getIndex()).toBe(1);
			expect(scanner.getNext().getIndex()).toBe(2);
			expect(scanner.getNext().getIndex()).toBe(3);
			expect(scanner.getNext().getIndex()).toBe(4);
			//end reached
			expect(scanner.getNext().getIndex()).toBe(5);
			expect(scanner.getNext().getIndex()).toBe(5);
		});
		it("should return correct columns", function(){
			var scanner = new Scanner("ab\nc");
			expect(scanner.getNext().getColumn()).toBe(1);
			expect(scanner.getNext().getColumn()).toBe(2);
			expect(scanner.getNext().getColumn()).toBe(3);
			expect(scanner.getNext().getColumn()).toBe(1);
			//end reached
			expect(scanner.getNext().getColumn()).toBe(2);
			expect(scanner.getNext().getColumn()).toBe(2);

		});
		it("should return correct lines", function(){
			var scanner = new Scanner("ab\nc");
			expect(scanner.getNext().getLine()).toBe(1);
			expect(scanner.getNext().getLine()).toBe(1);
			expect(scanner.getNext().getLine()).toBe(1);
			expect(scanner.getNext().getLine()).toBe(2);
			//end reached
			expect(scanner.getNext().getLine()).toBe(2);
			expect(scanner.getNext().getLine()).toBe(2);
		});
	});	

	describe("hasNext", function(){
		it("should detect string end", function(){
			var scanner = new Scanner("abc");
			expect(scanner.hasNext()).toBe(true);
			scanner.getNext();
			expect(scanner.hasNext()).toBe(true);
			scanner.getNext();
			expect(scanner.hasNext()).toBe(true);
			scanner.getNext();
			expect(scanner.hasNext()).toBe(false);
			// Read to infinity
			scanner.getNext();
			expect(scanner.hasNext()).toBe(false);
		});

	});
		
	describe("lookAhead", function(){
		it("should look one character ahead", function(){
			var scanner = new Scanner("abc");
			expect(scanner.lookAhead().getCharacter()).toBe('a');
			scanner.getNext();
			expect(scanner.lookAhead().getCharacter()).toBe('b');
			scanner.getNext();
			expect(scanner.lookAhead().getCharacter()).toBe('c');
			scanner.getNext();
			//end reached
			expect(scanner.lookAhead().getCharacter()).toBe('\0');
		});
		it("should return correct indexes", function(){
			var scanner = new Scanner("abc");
			expect(scanner.lookAhead().getIndex()).toBe(1);
			scanner.getNext();
			expect(scanner.lookAhead().getIndex()).toBe(2);
			scanner.getNext();
			expect(scanner.lookAhead().getIndex()).toBe(3);
			scanner.getNext();
			//end reached
			expect(scanner.lookAhead().getIndex()).toBe(4);
			expect(scanner.lookAhead().getIndex()).toBe(4);
		});
		
		it("should return column indexes", function(){
			var scanner = new Scanner("ab\nc");
			expect(scanner.lookAhead().getColumn()).toBe(1);
			scanner.getNext();
			expect(scanner.lookAhead().getColumn()).toBe(2);
			scanner.getNext();
			expect(scanner.lookAhead().getColumn()).toBe(3);
			scanner.getNext();
			expect(scanner.lookAhead().getColumn()).toBe(1);
			scanner.getNext();
			//end reached
			expect(scanner.lookAhead().getColumn()).toBe(2);
			expect(scanner.lookAhead().getColumn()).toBe(2);
		});

		it("should return line indexes", function(){
			var scanner = new Scanner("ab\nc");
			expect(scanner.lookAhead().getLine()).toBe(1);
			scanner.getNext();
			expect(scanner.lookAhead().getLine()).toBe(1);
			scanner.getNext();
			expect(scanner.lookAhead().getLine()).toBe(1);
			scanner.getNext();
			expect(scanner.lookAhead().getLine()).toBe(2);
			scanner.getNext();
			//end reached
			expect(scanner.lookAhead().getLine()).toBe(2);
			expect(scanner.lookAhead().getLine()).toBe(2);
		});

	});
	
});
