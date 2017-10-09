var UserPackages = require('../../repository/userpackages.js');
module.exports = function(userPackage , response){

    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;

    try {
        for (i = 0; i < userPackage.length; i++) {
            userPackage[i].tenantId = new ObjectID(userPackage[i].tenantId);
            userPackage[i].userId = new ObjectID(userPackage[i].userId);
            userPackage[i].packageId = new ObjectID(userPackage[i]._id);
            userPackage[i].datePurchased = new Date();
            userPackage[i].dateExpiryUserPackage = new Date(userPackage[i].dateExpiryUserPackage);
        }

        UserPackages.insertMany(userPackage, function (err, res) {
            try {
                if (err) throw err;
                dto.insertedData = res.ops;
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
