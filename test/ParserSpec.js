describe("Parser", function(){
	it("should accept a lexer", function(){
		var lexer = new Lexer(new Scanner("version=10;"));
		var parser = new Parser(lexer);
	});


	it("should throw error on attribute with wrong assignment", function(){
		var lexer = new Lexer(new Scanner("version=#####;"));
		var parser = new Parser(lexer);
		expect(parser.parse).toThrow();

	});

	it("should parse a clazz with a single attribute", function(){
		var lexer = new Lexer(new Scanner("class Item1 {version=1;};"));
		var parser = new Parser(lexer);
		var clazz = parser.parse();
		expect(clazz.getClasses).toBeDefined();
		expect(clazz.getClasses().length).toBe(1);
		expect(clazz.getAttributes().length).toBe(0);
		var subclazz = clazz.getClasses()[0];
		expect(subclazz).toBeDefined();
		expect(subclazz.getName()).toEqual("Item1");
		expect(subclazz.getClasses().length).toBe(0);
		expect(subclazz.getAttributes().length).toBe(1);
	});

	it("should parse nested classes", function(){
		var lexer = new Lexer(new Scanner("class Item1 { class Item2 { class Item3 {version=1;};};};"));
		var parser = new Parser(lexer);
		var clazz = parser.parse();
		expect(clazz.getClasses).toBeDefined();
		expect(clazz.getClasses().length).toBe(1);
		var subclazz = clazz.getClasses()[0];
		expect(subclazz.getName()).toEqual("Item1");
		expect(subclazz.getClasses().length).toBe(1);
		var subsubclazz = subclazz.getClasses()[0];
		expect(subsubclazz.getName()).toEqual("Item2");
		expect(subsubclazz.getClasses().length).toBe(1);
		var subsubsubclazz = subsubclazz.getClasses()[0];
		expect(subsubsubclazz.getName()).toEqual("Item3");
		expect(subsubsubclazz.getClasses().length).toBe(0);
		expect(subsubsubclazz.getAttributes().length).toBe(1);
	});

	it("should parse two classes on the same level", function(){
		var lexer = new Lexer(new Scanner("class Item1 { class Item2 { version=1;};class Item3 {version=2;};};"));
		var parser = new Parser(lexer);
		var clazz = parser.parse();
		expect(clazz.getClasses).toBeDefined();
		expect(clazz.getClasses().length).toBe(1);
		var subclazz = clazz.getClasses()[0];
		expect(subclazz.getName()).toEqual("Item1");
		expect(subclazz.getClasses().length).toBe(2);
		var subsubclazz1 = subclazz.getClasses()[0];
		expect(subsubclazz1.getName()).toEqual("Item2");
		expect(subsubclazz1.getClasses().length).toBe(0);
		expect(subsubclazz1.getAttributes().length).toBe(1);
		var subsubclazz2 = subclazz.getClasses()[1];
		expect(subsubclazz2.getName()).toEqual("Item3");
		expect(subsubclazz2.getClasses().length).toBe(0);
		expect(subsubclazz2.getAttributes().length).toBe(1);
	});


	describe("Parser's Attributesubststem", function(){	
		it("should parse a single attribute", function(){
			var lexer = new Lexer(new Scanner("version=10;"));
			var parser = new Parser(lexer);
			var clazz = parser.parse();
			expect(clazz).toBeDefined();
			expect(clazz.getClasses().length).toBe(0);
			expect(clazz.getAttributes().length).toBe(1);
			var attr = clazz.getAttributes()[0];
			expect(attr.getKey()).toEqual("version");
		});

		it("should parse multiple attributes per class", function(){
			var lexer = new Lexer(new Scanner("class Item1 { attr1=1;attr2=2;};"));
			var parser = new Parser(lexer);
			var mainClazz = parser.parse();
			var clazz = mainClazz.getClasses()[0]; 
			var attr = clazz.getAttributes();
			expect(attr.length).toBe(2);
			expect(attr[0].getKey()).toEqual("attr1");
			expect(attr[0].getValue()).toEqual("1");
			expect(attr[1].getKey()).toEqual("attr2");
			expect(attr[1].getValue()).toEqual("2");
		});
		
		it("should parse a String attribute", function(){
			var val = 'my string{}[]""escaped string"" oh boy ""again""';
			var lexer = new Lexer(new Scanner('attr="' + val + '";'));
			var parser = new Parser(lexer);
			var clazz = parser.parse();
			expect(clazz.getAttributes().length).toBe(1);
			var attr = clazz.getAttributes()[0];
			expect(attr.getKey()).toEqual("attr");
			expect(attr.getValue()).toBe(val);
			expect(attr.getType()).toEqual(Attribute.Type.STRING);
		});

		it("should parse a Number attribute", function(){
			var lexer = new Lexer(new Scanner('attr=1234567;'));
			var parser = new Parser(lexer);
			var clazz = parser.parse();
			expect(clazz.getAttributes().length).toBe(1);
			var attr = clazz.getAttributes()[0];
			expect(attr.getKey()).toEqual("attr");
			expect(attr.getValue()).toBe("1234567");
			expect(attr.getType()).toEqual(Attribute.Type.NUMBER);
		});

		it("should parse a negative Number attribute", function(){
			var lexer = new Lexer(new Scanner('attr=-1234567;'));
			var parser = new Parser(lexer);
			var clazz = parser.parse();
			expect(clazz.getAttributes().length).toBe(1);
			var attr = clazz.getAttributes()[0];
			expect(attr.getKey()).toEqual("attr");
			expect(attr.getValue()).toBe("-1234567");
			expect(attr.getType()).toEqual(Attribute.Type.NUMBER);
		});

		it("should parse a Float attribute", function(){
			var lexer = new Lexer(new Scanner('attr=1234567.1234567;'));
			var parser = new Parser(lexer);
			var clazz = parser.parse();
			expect(clazz.getAttributes().length).toBe(1);
			var attr = clazz.getAttributes()[0];
			expect(attr.getKey()).toEqual("attr");
			expect(attr.getValue()).toBe("1234567.1234567");
			expect(attr.getType()).toEqual(Attribute.Type.FLOAT);
		});

		it("should parse a negative Float attribute", function(){
			var lexer = new Lexer(new Scanner('attr=-1234567.1234567;'));
			var parser = new Parser(lexer);
			var clazz = parser.parse();
			expect(clazz.getAttributes().length).toBe(1);
			var attr = clazz.getAttributes()[0];
			expect(attr.getKey()).toEqual("attr");
			expect(attr.getValue()).toBe("-1234567.1234567");
			expect(attr.getType()).toEqual(Attribute.Type.FLOAT);
		});

		it("should parse a String List attribute", function(){
			var lexer = new Lexer(new Scanner('attr[]={"abc","def","ghi"};'));
			var parser = new Parser(lexer);
			var clazz = parser.parse();
			expect(clazz.getAttributes().length).toBe(1);
			var attr = clazz.getAttributes()[0];
			expect(attr.getKey()).toEqual("attr");
			expect(attr.getValue().length).toBe(3);
			expect(attr.getType()).toEqual(Attribute.Type.STRINGLIST);
			expect(attr.getValue()[0]).toEqual("abc");
			expect(attr.getValue()[1]).toEqual("def");
			expect(attr.getValue()[2]).toEqual("ghi");
		});
		
		it("should parse a NUMBER List attribute", function(){
			var lexer = new Lexer(new Scanner('attr[]={123,-456,789};'));
			var parser = new Parser(lexer);
			var clazz = parser.parse();
			expect(clazz.getAttributes().length).toBe(1);
			var attr = clazz.getAttributes()[0];
			expect(attr.getKey()).toEqual("attr");
			expect(attr.getValue().length).toBe(3);
			expect(attr.getType()).toEqual(Attribute.Type.NUMBERLIST);
			expect(attr.getValue()[0]).toEqual("123");
			expect(attr.getValue()[1]).toEqual("-456");
			expect(attr.getValue()[2]).toEqual("789");
		});

		it("should parse a FLOAT List attribute", function(){
			var lexer = new Lexer(new Scanner('attr[]={123.123,-456.456,789.789};'));
			var parser = new Parser(lexer);
			var clazz = parser.parse();
			expect(clazz.getAttributes().length).toBe(1);
			var attr = clazz.getAttributes()[0];
			expect(attr.getKey()).toEqual("attr");
			expect(attr.getValue().length).toBe(3);
			expect(attr.getType()).toEqual(Attribute.Type.FLOATLIST);
			expect(attr.getValue()[0]).toEqual("123.123");
			expect(attr.getValue()[1]).toEqual("-456.456");
			expect(attr.getValue()[2]).toEqual("789.789");
		});

		it("should parse a mixed FLOAT/NUMBER List attribute", function(){
			var lexer = new Lexer(new Scanner('attr[]={123,-456.456,789};'));
			var parser = new Parser(lexer);
			var clazz = parser.parse();
			expect(clazz.getAttributes().length).toBe(1);
			var attr = clazz.getAttributes()[0];
			expect(attr.getKey()).toEqual("attr");
			expect(attr.getValue().length).toBe(3);
			expect(attr.getType()).toEqual(Attribute.Type.FLOATLIST);
			expect(attr.getValue()[0]).toEqual("123");
			expect(attr.getValue()[1]).toEqual("-456.456");
			expect(attr.getValue()[2]).toEqual("789");
		});
	});
});
