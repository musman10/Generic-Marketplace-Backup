var UserPackages = require('../../repository/userpackages.js');
module.exports = function(userPackage , response){

    var dto = {success:true,error:[],status:200};
    var ObjectID = require('mongodb').ObjectID;

    for(i=0; i<userPackage.length;i++){
        userPackage[i].tenantId = new ObjectID(userPackage.tenantId);
        userPackage[i].userId = new ObjectID(userPackage.userId);
        userPackage[i].packageId = new ObjectID(userPackage._id);
        userPackage[i].datePurchased = new Date();
        userPackage[i].dateExpiryUserPackage = new Date(userPackage[i].dateExpiryUserPackage);
    }

        UserPackages.insertMany(userPackage, function(err, res) {
            if (err) throw err;
            dto.insertedData = res.ops;
            response.send(dto);
        });

}
