describe("Attribute", function(){
	it("should accept key, value and type", function(){
		new Attribute("key","value", Attribute.Type.STRING);
	});

	it("should have working getters", function(){
		var attr = new Attribute("key", "value", Attribute.Type.STRING);
		expect(attr.getKey).toBeDefined();
		expect(attr.getKey()).toBe("key");
		expect(attr.getValue).toBeDefined();
		expect(attr.getValue()).toBe("value");
		expect(attr.getType).toBeDefined();
		expect(attr.getType()).toBe(Attribute.Type.STRING);
	
	});


	it("should work with array as value", function(){
		var attr = new Attribute("key", [1,2,3], Attribute.Type.NUMBERLIST);
		expect(attr.getKey).toBeDefined();
		expect(attr.getKey()).toEqual("key");
		expect(attr.getValue).toBeDefined();
		expect(attr.getValue()).toEqual([1,2,3]);
		expect(attr.getType).toBeDefined();
		expect(attr.getType()).toBe(Attribute.Type.NUMBERLIST);
	
	});

});
