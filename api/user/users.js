var mongo = require('mongodb');

module.exports = function(res){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/mydb";
    var dto = {users:[]};
    
    MongoClient.connect(url, function(err, db) {
        try {
            if (err) throw err;
            db.collection("User").find({}).toArray(function (err, result) {
                try {
                    if (err) throw err;
                    console.log(result);
                    dto.users = result;
                    db.close();
                    //return dto;
                    res.send(dto);
                }catch(e){
                    db.close();
                    dto.success = false;
                    dto.error.push(e.toString());
                    response.send(dto);
                }
            });
        }catch(e){
            db.close();
            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }
    });
    /*
    var myobj = {
        name:'Abdul Basit',
        qualifications:['bscs','mscs'],
        location:'Karachi'
    }

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var myobj = { name: "Company Inc", address: "Highway 37" };
        db.collection("users").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
    });
    */
}