describe("Token", function(){
	it("should has working getters", function(){
		var token = new Token("content", "TYPE", 1, 2, 3, 4, 5, 6);
		expect(token.getContent()).toBe("content");
		expect(token.getType()).toBe("TYPE");
		expect(token.getIndexBegin()).toBe(1);
		expect(token.getIndexEnd()).toBe(2);
		expect(token.getColumnBegin()).toBe(3);
		expect(token.getColumnEnd()).toBe(4);
		expect(token.getLineBegin()).toBe(5);
		expect(token.getLineEnd()).toBe(6);
	});

	it("should private a static type enum", function(){
		expect(Token.Type.WHITESPACE).toBeDefined();
	});
});
