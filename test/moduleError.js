describe("moduleError", function(){
	it("should work", function(){
		var exampleMinErr = minErr("subsystem");
		function throwTest(){
		throw exampleMinErr("one", "This {0} or {1} is set", "woah",-1.23);
		}
		expect(throwTest).toThrow();

	});

});
