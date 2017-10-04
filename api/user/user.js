var mongo = require('mongodb');

module.exports = function(res){

    var dto = {users:[]};


        if (err) throw err;
        var query = { _id: "599d530dfe9a7b1c20c106c7" };
        User.find(query).toArray(function(err, result) {

            if (err) throw err;
            console.log(result);
           // dto.users = result;

            //return dto;
           // res.send(dto);
        });


}
