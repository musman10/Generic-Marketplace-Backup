module.exports = function (response) {
    var Tenant = require('../../repository/tenant');
    var dto = {success: true, error: [], status: 200};

    Tenant.find({}).toArray(function (err, res) {
        try {
            if (err) throw err;
            console.log("In the backend service,printing all Tenants");
            console.log(res);
            dto.data = res;
            response.send(dto);
        } catch (e) {
            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }
    });

}