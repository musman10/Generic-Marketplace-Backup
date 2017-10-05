var Tenant = require('../../repository/tenant.js');
module.exports = function (tenantName, response) {

    var dto = {success: true, error: [], status: 200, tenant: {}};
    //var MongoClient = require('mongodb').MongoClient;
    
    console.log(tenantName);
    var query = {name: tenantName};
    Tenant.find(query).toArray(function (err, result) {
        try {
            //setTimeout(function () {
            if (err)throw err;
            console.log(result);

            dto.tenant = result;
            response.send(dto);
            // }, 10000);
        } catch (e) {

            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }
    });


}