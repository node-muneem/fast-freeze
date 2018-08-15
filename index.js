
function fastFreeze(config, secureChar, logger){
    if( typeof config !== 'object' )    {
        throw Error("Only objects are allowed");
    }
    var keys = Object.keys(config);
    var sealedConfig = {};
    for( var key_i=0; key_i < keys.length; key_i++){
        var keyName = keys[key_i];
        if( keyName.startsWith( secureChar) ) continue;

        var keyValue = config[ keyName ];
        if(typeof keyValue === 'object' && !Array.isArray(keyValue) ){
            keyValue = fastFreeze( keyValue, secureChar, logger);
        }

        sealedConfig[ keyName ] =  keyValue;
    }

    return function(_propName){
        return sealedConfig [ _propName ];
    };

}

module.exports = fastFreeze;