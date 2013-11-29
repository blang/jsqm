describe("LexerRules", function(){
	it("should detect whitespaces", function(){
		expect(LexerRules.isWhitespace(" ")).toBe(true);
		expect(LexerRules.isWhitespace("\n")).toBe(true);
		expect(LexerRules.isWhitespace("\r")).toBe(true);
		expect(LexerRules.isWhitespace("\t")).toBe(true);
		expect(LexerRules.isWhitespace("a")).toBe(false);
		expect(LexerRules.isWhitespace("")).toBe(false);
		// not a character but a string	
		expect(LexerRules.isWhitespace("   ")).toBe(false);
	});
	
	it("should detect numbers", function(){
		expect(LexerRules.isNumber("0")).toBe(true);
		expect(LexerRules.isNumber("1")).toBe(true);
		expect(LexerRules.isNumber("2")).toBe(true);
		expect(LexerRules.isNumber("3")).toBe(true);
		expect(LexerRules.isNumber("4")).toBe(true);
		expect(LexerRules.isNumber("5")).toBe(true);
		expect(LexerRules.isNumber("6")).toBe(true);
		expect(LexerRules.isNumber("7")).toBe(true);
		expect(LexerRules.isNumber("8")).toBe(true);
		expect(LexerRules.isNumber("9")).toBe(true);
		
		expect(LexerRules.isNumber(0)).toBe(true);
		expect(LexerRules.isNumber(1)).toBe(true);
		expect(LexerRules.isNumber(2)).toBe(true);
		expect(LexerRules.isNumber(3)).toBe(true);
		expect(LexerRules.isNumber(4)).toBe(true);
		expect(LexerRules.isNumber(5)).toBe(true);
		expect(LexerRules.isNumber(6)).toBe(true);
		expect(LexerRules.isNumber(7)).toBe(true);
		expect(LexerRules.isNumber(8)).toBe(true);
		expect(LexerRules.isNumber(0)).toBe(true);
	});

	it("should detect alphas", function(){
		expect(LexerRules.isAlpha("a")).toBe(true);
		expect(LexerRules.isAlpha("b")).toBe(true);
		expect(LexerRules.isAlpha("c")).toBe(true);
		expect(LexerRules.isAlpha("d")).toBe(true);
		expect(LexerRules.isAlpha("e")).toBe(true);
		expect(LexerRules.isAlpha("f")).toBe(true);
		expect(LexerRules.isAlpha("g")).toBe(true);
		expect(LexerRules.isAlpha("h")).toBe(true);
		expect(LexerRules.isAlpha("i")).toBe(true);
		expect(LexerRules.isAlpha("j")).toBe(true);
		expect(LexerRules.isAlpha("k")).toBe(true);
		expect(LexerRules.isAlpha("l")).toBe(true);
		expect(LexerRules.isAlpha("m")).toBe(true);
		expect(LexerRules.isAlpha("n")).toBe(true);
		expect(LexerRules.isAlpha("o")).toBe(true);
		expect(LexerRules.isAlpha("p")).toBe(true);
		expect(LexerRules.isAlpha("q")).toBe(true);
		expect(LexerRules.isAlpha("r")).toBe(true);
		expect(LexerRules.isAlpha("s")).toBe(true);
		expect(LexerRules.isAlpha("t")).toBe(true);
		expect(LexerRules.isAlpha("u")).toBe(true);
		expect(LexerRules.isAlpha("v")).toBe(true);
		expect(LexerRules.isAlpha("w")).toBe(true);
		expect(LexerRules.isAlpha("x")).toBe(true);
		expect(LexerRules.isAlpha("y")).toBe(true);
		expect(LexerRules.isAlpha("z")).toBe(true);

		expect(LexerRules.isAlpha("A")).toBe(true);
		expect(LexerRules.isAlpha("B")).toBe(true);
		expect(LexerRules.isAlpha("C")).toBe(true);
		expect(LexerRules.isAlpha("D")).toBe(true);
		expect(LexerRules.isAlpha("E")).toBe(true);
		expect(LexerRules.isAlpha("F")).toBe(true);
		expect(LexerRules.isAlpha("G")).toBe(true);
		expect(LexerRules.isAlpha("H")).toBe(true);
		expect(LexerRules.isAlpha("I")).toBe(true);
		expect(LexerRules.isAlpha("J")).toBe(true);
		expect(LexerRules.isAlpha("K")).toBe(true);
		expect(LexerRules.isAlpha("L")).toBe(true);
		expect(LexerRules.isAlpha("M")).toBe(true);
		expect(LexerRules.isAlpha("N")).toBe(true);
		expect(LexerRules.isAlpha("O")).toBe(true);
		expect(LexerRules.isAlpha("P")).toBe(true);
		expect(LexerRules.isAlpha("Q")).toBe(true);
		expect(LexerRules.isAlpha("R")).toBe(true);
		expect(LexerRules.isAlpha("S")).toBe(true);
		expect(LexerRules.isAlpha("T")).toBe(true);
		expect(LexerRules.isAlpha("U")).toBe(true);
		expect(LexerRules.isAlpha("V")).toBe(true);
		expect(LexerRules.isAlpha("W")).toBe(true);
		expect(LexerRules.isAlpha("X")).toBe(true);
		expect(LexerRules.isAlpha("Y")).toBe(true);
		expect(LexerRules.isAlpha("Z")).toBe(true);

		//false
		expect(LexerRules.isAlpha("0")).toBe(false);
		expect(LexerRules.isAlpha("abc")).toBe(false);
	});

	it("should detect symbols", function(){
		expect(LexerRules.isSymbol("=")).toBe(true);
		expect(LexerRules.isSymbol(";")).toBe(true);
		expect(LexerRules.isSymbol(",")).toBe(true);
		expect(LexerRules.isSymbol("{")).toBe(true);
		expect(LexerRules.isSymbol("}")).toBe(true);
		
		//false
		expect(LexerRules.isSymbol(" ")).toBe(false);
		expect(LexerRules.isSymbol("a")).toBe(false);
	});

	it("should detect minus", function(){
		expect(LexerRules.isMinus("-")).toBe(true);
		expect(LexerRules.isMinus(" -")).toBe(false);
	});

	it("should detect endmark", function(){
		expect(LexerRules.isEndmark("\0")).toBe(true);
	});

	it("should detect string limiter", function(){
		expect(LexerRules.isStringLimiter('"')).toBe(true);
	});
});
