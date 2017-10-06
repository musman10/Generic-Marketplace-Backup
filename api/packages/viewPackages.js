var Packages = require('../../repository/packages.js');
module.exports = function(tenantData , response){

    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;

    try {
        id = new ObjectID(tenantData.tenantId)
        var query = {
            tenantId: id
        };


        Packages.find(query, {}).toArray(function (err, result) {
            try {
                if (err) throw err;
                console.log(result);
                dto.packages = result;
                response.send(dto);
            }catch(e){

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