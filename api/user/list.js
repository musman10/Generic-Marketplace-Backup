var User = require('../../repository/user.js');
module.exports = function (tenantId, response) {

    var dto = {success: true, error: [], status: 200};
    var ObjectID = require('mongodb').ObjectID;


    /*if (err) throw err;*/
    try {
        tenantId = new ObjectID(tenantId)

        var query = {tenantId: tenantId};
        User.find(query).toArray(function (err, result) {
            try {
                if (err) throw err;
                console.log(result);

                dto.data = result;
                response.send(dto);
            } catch (e) {

                dto.success = false;
                dto.error.push("Some error occured!");
                console.log(e.toString());
                response.send(dto);
            }
        });
    }catch(e){
        dto.success = false;
        dto.error.push("Some error occured!");
        console.log(e.toString());
        response.send(dto);
    }


}