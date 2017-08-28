module.exports = function(res){

var MongoClient = require('mongodb').MongoClient;
var path = require('path');
var root_dir = __dirname + '/../../';
var config = require(root_dir + 'config');
var url = config.dbConnection.url;
var dto = {logs:[]};
//var url = "mongodb://localhost:27017/apptest";

var nextCollectionName = function(db,CollName){
    if(CollName == 'Tenant')
        CollName = 'User';
    else if(CollName == 'User')
        CollName = 'Request';
    else if(CollName == 'Request'){
        CollName = 'DONEALL';
        db.close();
        res.send(dto);
        return CollName;
    }
    return CollName;
}

var createCollection = function(db,CollName){
    db.createCollection(CollName, function(err, res) {
        if (err) throw err;
        console.log("Collection " + CollName + "Created!");
        dto.logs.push("Collection " + CollName + "Created!");
        CollName = nextCollectionName(db,CollName);
        if(CollName == 'DONEALL')
            return;
        checkCollection(db,CollName);
    });
};

var checkCollection = function(db, CollName){
    console.log('in checkCollection');
    db.listCollections({name: CollName})
    .next(function(err, collinfo) {
        if (collinfo) {
            // The collection exists
            console.log('Collection ' + CollName + 'Already Exhists');
            dto.logs.push('Collection ' + CollName + 'Already Exhists');
            CollName = nextCollectionName(db,CollName);
            if(CollName !== 'DONEALL'){
                checkCollection(db,CollName);
            }
            else
                return;
        }
        else{
            console.log(CollName);
            createCollection(db,CollName);
            return;
        }
    });
};


MongoClient.connect(url, function(err, db) {
    try{
        if (err) throw err;
        console.log('Database Created/Connected');
        dto.logs.push('Database Created/Connected');
        checkCollection(db,'Tenant');
    }
    catch(err){
        dto.logs.push(err.toString());
    }
});

}