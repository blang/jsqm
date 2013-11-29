function isUndefined(value){return typeof value == 'undefined';}
function isDefined(value){return typeof value != 'undefined';}
function isObject(value){return value !== null && typeof value == 'object';}
function isString(value){return typeof value == 'string';}
function isNumber(value){return typeof value == 'number';}
function isArray(value) {return toString.apply(value) == '[object Array]';}
function isFunction(value){return typeof value == 'function';}
function isBoolean(value) {return typeof value == 'boolean';}
function toJson(obj, pretty) {if (typeof obj === 'undefined'){return undefined;}return JSON.stringify(obj, function(key,val){return val;}, pretty ? '  ' : null);}
