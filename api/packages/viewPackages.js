var Packages = require('../../repository/packages.js');
module.exports = function(tenantData , response){

    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;

    id = new ObjectID(tenantData.tenantId)
    var query = {
     tenantId : id
     };



        Packages.find(query,{}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            dto.packages = result;

            //return dto;
            response.send(dto);
        });

}