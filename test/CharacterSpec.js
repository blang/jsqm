describe("Character", function(){
	it("should have working getter", function(){
		var c = new Character('a', 1, 2, 3);
		expect(c.getCharacter()).toBe('a');
		expect(c.getIndex()).toBe(1);
		expect(c.getColumn()).toBe(2);
		expect(c.getLine()).toBe(3);
	});
});
