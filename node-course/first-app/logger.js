function log(message){
    console.log(message);
}

module.exports = log;
//module.exports.someName = functionName

/*
    module.exports = log -> exports only the function. 
        can be accessed directly with function name
    module.exports.log = log -> exports an object
        should be accessed with objectName.functionName
*/