var mongo = require('mongodb');
var User = require('../../repository/user.js');

module.exports = function(res){

    var dto = {users:[]};
    

            User.find({}).toArray(function (err, result) {
                try {
                    if (err) throw err;
                    console.log(result);
                    dto.users = result;

                    //return dto;
                    res.send(dto);
                }catch(e){

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