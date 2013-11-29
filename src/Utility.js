var Utility = function(){
};

Utility.isString = function(obj){
	return (Object.prototype.toString.call(obj) == '[object String]');
};
