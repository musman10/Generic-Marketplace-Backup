var UserBills = require('../../repository/userbills.js');
module.exports = function(userid, response){

    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;




        userid = new ObjectID(userid)

        var query = { userId: userid };
        UserBills.find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);

            dto.data= result;
            response.send(dto);
        });


}