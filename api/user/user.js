var mongo = require('mongodb');

module.exports = function(res){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/apptest";
    var dto = {users:[]};

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { _id: "599d530dfe9a7b1c20c106c7" };
        db.collection("User").find(query).toArray(function(err, result) {

            if (err) throw err;
            console.log(result);
           // dto.users = result;
            db.close();
            //return dto;
           // res.send(dto);
        });
    });

}