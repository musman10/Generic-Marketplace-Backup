var MongoClient = require('mongodb').MongoClient;
var config = require('../config');
var url = config.dbConnection.url;

function MongoConnection(){}

var p_db;

function initPool(cb){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        p_db = db;
        if(cb && typeof(cb) == 'function')
            cb(p_db);
    });
    return MongoConnection;
}

function closeAll(){
    p_db.close();
}

MongoConnection.initPool = initPool;
MongoConnection.closeAll = closeAll;

function getInstance(cb){
    if(!p_db){
        initPool(cb)
    }
    else{
        if(cb && typeof(cb) == 'function')
            cb(p_db);
    }
}
MongoConnection.getInstance = getInstance;

module.exports = MongoConnection;