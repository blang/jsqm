var Parser = function(lexer){
	this.lexer = lexer;


	var LexerCache = function(lexer){
		var last = null;
		var cur = null;
		var next = null;
		var ahead = null;
		init();
		function init(){
			last = null;
			cur = lexer.getNext();
			next = lexer.getNext();
		}


		var pop = function(){
			last = cur;
			cur = next;
			next = lexer.getNext();
		};

		return {

			

			'last' : function(){
				return last;
			},
			'pop': function(){ 
				var tmp = cur;
				pop();
				return tmp;
			},
			'peek': function(){
				return cur;
			},
			'lookAhead' : function(){
				return next;
			},
			'hasNext' : function(){
				return !(cur.getType() == Token.Type.EOF || cur.getType() == Token.Type.ERROR);
			}

		};
	};

	function cTypeAndContent(input,type,expected){
		return input.getType() == type && input.getContent().toLowerCase()==expected;
	}
	function cType(input,type){
		return input.getType() == type;
	}

	function strErrLoc(input){
		return "Last token: '"+input.getContent()+"' (Type: "+input.getType()+") at line "+input.getLineBegin()+":"+input.getLineEnd()+" column "+input.getColumnBegin()+":"+input.getColumnEnd();

	}

	function tokentype2attr(tokentype){
		//Optimize to proper mapping
		return {4:Attribute.Type.NUMBER,
			5:Attribute.Type.FLOAT,
			7:Attribute.Type.STRING}[tokentype];
	}

	function cleanTokenString(tokenString){
		return tokenString.substr(1,tokenString.length-2);
	}

	var parse = function(){
		var lc = new LexerCache(lexer);
		var cClass = new Class("Mission");
		var classStack = new Array();
		classStack.push(cClass);
		var deadlockPrev = 0;
		while(lc.hasNext() && deadlockPrev < 1000*1000){
			// Detect new class
			if(lc.peek().getType() == Token.Type.IDENTIFIER && lc.peek().getContent().toLowerCase()=="class"){
				//expect class identifier
				lc.pop(); //pop "class"
				if(cType(lc.peek(),Token.Type.IDENTIFIER)){
					var classname = lc.pop().getContent();
					var newClass = new Class(classname);
					cClass.addClass(newClass);
					classStack.push(cClass);
					cClass = newClass;
					if(cTypeAndContent(lc.peek(), Token.Type.SYMBOL, "{")){

						lc.pop();
					}else{
						//no open bracket found after class definition
					}
				}else{
					//no class identifier found
				}

			}
			// Detect closing class
			else if(lc.peek().getType() == Token.Type.SYMBOL && lc.peek().getContent().toLowerCase()=="}"){
				//expect semicolon
				lc.pop();
				if(cTypeAndContent(lc.peek(), Token.Type.SYMBOL, ";")){
					lc.pop();	
					// Restore parent class
					cClass = classStack.pop();
				}else{
					//missing semicolon after closing bracket
				}


				

			}
			// Detect attributes
			else if(cType(lc.peek(),Token.Type.IDENTIFIER)){
				var key = lc.pop().getContent();
				// Direct assignments
				if(cTypeAndContent(lc.peek(), Token.Type.SYMBOL, "=")){
					lc.pop();
					var rassign = lc.pop();
					var type = tokentype2attr(rassign.getType());					
					
					//throw "Expect right side of attribute assignment "+strErrLoc(rassign);
					var content = rassign.getContent();
					if(type == Attribute.Type.STRING){
						content = cleanTokenString(content);	
					}

					cClass.addAttribute(new Attribute(key,content,type));

					if(cTypeAndContent(lc.peek(), Token.Type.SYMBOL, ";")){
						lc.pop();
					}else{
						throw "Expected semicolon at the end of an assignment "+strErrLoc(lc.pop());
					}


				}
				
				// List assignments	
				else if(cTypeAndContent(lc.peek(),Token.Type.SYMBOL, "[")){
					lc.pop();
					if(cTypeAndContent(lc.peek(), Token.Type.SYMBOL, "]")){
						lc.pop();
						if(cTypeAndContent(lc.peek(), Token.Type.SYMBOL, "=")){
							lc.pop();
							if(cTypeAndContent(lc.peek(), Token.Type.SYMBOL, "{")){
								lc.pop();

								//parse Attribute values
								var content = [];
								var type = null;
								while((!cTypeAndContent(lc.peek(), Token.Type.SYMBOL, "}"))){
									if(cTypeAndContent(lc.peek(), Token.Type.SYMBOL, ",")){
										lc.pop(); //ignore
									}else if(cType(lc.peek(), Token.Type.STRING)){
										type = Attribute.Type.STRINGLIST;	
										content.push(cleanTokenString(lc.pop().getContent()));
									}else if(cType(lc.peek(), Token.Type.NUMBER)){
										//floatlist is kindof numberlist	
										if(type == null)
											type = Attribute.Type.NUMBERLIST;
										content.push(lc.pop().getContent());
									}else if(cType(lc.peek(), Token.Type.FLOAT)){
										type = Attribute.Type.FLOATLIST;
										content.push(lc.pop().getContent());
									}else{
										//throw unknown token in list
									}

								}

								cClass.addAttribute(new Attribute(key,content,type));

							}else{
								//expected {

							}

						}else{
							//missing =

						}
							
					}else{
						//throw missing closing bracket
					}
				}

			}else{

				console.log("Couldn't parse",lc.pop());
			}
			deadlockPrev++;
		};
		return  cClass;

	};

	return {
		'parse' : parse

	};

};
