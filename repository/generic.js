/**
 * Created by Rizwan.
 */

var MongoConnection = require('../db/mongo-connection');
var Join = require('mongo-join').Join;

var _db;

var findOne = function(collection, query, next){

    _db.collection(collection).findOne(query, function(err, result) {

        next(err, result);

    });

}

var find = function(collection, query){

    return _db.collection(collection).find(query);

}

var joinOn = function(query){

    return new Join(_db).on(query);
}

var insert = function(collection, query, next){

    _db.collection(collection).insert(query, next);

}

var updateOne = function(collection, query, update, next){

    _db.collection(collection).updateOne(query, update, next);
}

var insertOne = function(collection, query, next){

    _db.collection(collection).insertOne(query, next);

}

var insertMany = function(collection, query, next){

    _db.collection(collection).insertMany(query, next);
}

var Generic = function(){
    MongoConnection.getInstance(function(db) {
        _db = db;
    });
    return {
        find: find,
        findOne: findOne,
        joinOn: joinOn,
        insert: insert,
        updateOne: updateOne,
        insertOne: insertOne,
        insertMany: insertMany
    }
}();


module.exports = Generic;