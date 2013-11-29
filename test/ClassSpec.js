describe("Class", function(){
	it("should accept subclasses", function(){
		var clazz = new Class();
		var subclazz= new Class();
		expect(clazz.addClass).toBeDefined();
		clazz.addClass(subclazz);
		expect(clazz.getClasses).toBeDefined();
		expect(clazz.getClasses()).toContain(subclazz);
	});

	it("should accept a name", function(){
		var clazz = new Class("myclass");
		expect(clazz.getName).toBeDefined();
		expect(clazz.getName()).toBe("myclass");

	});

	it("should accept attributes", function(){
		var clazz = new Class("myclass");
		var attr = new Attribute("key", "value", Attribute.Type.STRING);
		expect(clazz.addAttribute).toBeDefined();
		clazz.addAttribute(attr);
		expect(clazz.getAttributes).toBeDefined();
		expect(clazz.getAttributes()).toContain(attr);

	});

});
