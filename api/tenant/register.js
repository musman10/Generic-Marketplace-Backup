var Tenant = require('../../repository/tenant.js');
module.exports = function (tenant, response) {

    var dto = {success: true, error: [], status: 200};
    //var MongoClient = require('mongodb').MongoClient;


    tenant.dateCreated = new Date();
    tenant.dateLastModified = new Date();

    Tenant.insert(tenant, function (err, res) {
        try {
            if (err) throw err;
            console.log("1 document inserted");

            dto = {success: true, error: [], status: 200};
            response.send(dto);
        } catch (e) {

            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }
    });


}