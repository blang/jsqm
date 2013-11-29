describe("Utility.isString", function() {


	it("should verify a String Object is a string", function() {
		expect(Utility.isString(new String('My String'))).toBe(true);
	});
	it("should verify 'My String' is a string", function() {
		expect(Utility.isString('My String')).toBe(true);
	});

	it("should decline an object is a string", function() {
		expect(Utility.isString({})).toBe(false);
	});
});
