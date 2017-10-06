var UserBills = require('../../repository/userbills.js');
module.exports = function (userBills, response) {

    var dto = {success: true, error: [], status: 200};
    var ObjectID = require('mongodb').ObjectID;

    try {
        userBills.dateCreated = new Date();

        userBills.tenantId = new ObjectID(userBills.tenantId);
        userBills.userId = new ObjectID(userBills.userId);
        var currentDate = new Date();
        startDate = currentDate.setUTCHours(0, 0, 0, 0);
        endDate = currentDate.setUTCHours(23, 59, 59, 999);

        var query = {
            tenantId: userBills.tenantId,
            dateCreated: {
                "$gte": new Date(startDate),
                "$lt": new Date(endDate)
            }
        };


        UserBills.find(query, {}).toArray(function (err, result) {
            try {
                if (err) throw err;
                else {
                    userBills.invoiceNumber = result.length + 1;
                    UserBills.insertOne(userBills, function (err, res) {
                        try {
                            if (err) throw err;

                            dto.insertedData = res.ops;
                            response.send(dto);
                        }catch(e){
                            dto.success = false;
                            dto.error.push("Some error occured!");
                            console.log(e.toString());
                            response.send(dto);
                        }
                    });
                }
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
