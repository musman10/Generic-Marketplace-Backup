var Tenant = require('../../repository/tenant.js');
module.exports = function(tenantId, response) {

    var dto = {success: true, error: [], status: 200, tenant: {}};
    //var MongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;

        try {
            //console.log(tenantName);
            var query = {_id: new ObjectID(tenantId)};
            Tenant.find(query).toArray(function (err, result) {
                try {
                    if (err) throw err;
                    console.log(result);
                    dto.tenant = result;
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

