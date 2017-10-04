module.exports = function(listRequestPayload,response){
    var MongoClient = require('mongodb').MongoClient;
    Promise = require("promise");
    var ObjectID = require('mongodb').ObjectID;
    var Join = require('mongo-join').Join
    var path = require('path');
    var root_dir = __dirname + '/../../';
    var config = require(root_dir + 'config');
    var url = config.dbConnection.url;
    var dto = {success:true,error:[],status:200};
    var intervalId;
    var dbTaskDone;
    //var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function(err, db) {
        try {
            if (err) throw err;
            /*   var queryList = [];
             var queryExpression = {
             requestType:''
             };*/
            /*  for(i=0;i<listRequestPayload.requestTypes.length;i++){
             queryExpression.requestType = listRequestPayload.requestTypes[i];
             queryList.push(queryExpression);
             }*/
            id = new ObjectID(listRequestPayload.requestId)
            var query = {_id: id};

            db.collection("Request").find(query).toArray(function (err, res) {
                try {
                    if (err) throw err;
                    console.log("1 document inserted");
                    req = res;
                    if (res.length > 0) {
                        addResponse(req[0], 0, false, false, null, db).then(function () {
                            db.close();
                            dto.data = req;
                            response.send(dto);
                        });
                    }
                    else {
                        db.close();
                        dto.success = false;
                        dto.error.push("request responses not found");
                        response.send(dto);
                    }
                }catch(e){
                    db.close();
                    dto.success = false;
                    dto.error.push(e.toString());
                    response.send(dto);
                }

            });
        }catch(e){
            db.close();
            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }

        function addResponse(req,j,userIdRequired,isRequestResponseDetail,requestResponseDetail,db){
            return new Promise(function(resolve,reject){
            if(!isRequestResponseDetail){
                db.collection('Request', function (err, Request) {
                    dbTaskDone = 1;
                    //if (err) throw err;
                    if(req.userResponses.length != 0){
                        var uid = new ObjectID(req.userResponses[j].userId);
                        var rid = new ObjectID(req.userResponses[j].requestId);
                    }
                    else{
                        //terminate condition
                        //db.close();
                        //dto.data = req;
                        //response.send(dto);
                        resolve("Success!");
                    }

                    if (userIdRequired == true) {
                        var query = {
                            _id: rid,
                            postUserId: uid
                        };
                    }
                    else {
                        var query = {
                            _id: rid
                        };
                    }

                    Request.find(query, function (err, cursor) {
                        var join = new Join(db).on({
                            field: 'postUserId',
                            to: '_id',
                            from: 'User',
                            as: 'postUserDetails'
                        });
                        console.log("hello");
                        join.toArray(cursor, function (err, joinedDocs) {
                            // handle array of joined documents here
                            if (err) throw err;
                            if(joinedDocs.length == 0){
                                /*if(i == res.length -1){
                                    db.close();
                                    dto.data = res;
                                    response.send(dto);
                                }
                                else {
                                    i++;
                                    j = 0;
                                    userIdRequired = true;
                                    isRequestResponseDetail = false;
                                    requestResponseDetail = null;
                                    addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail,db);
                                }*/
                            }
                            else if(joinedDocs.length != 0){
                                req.userResponses[j].requestDetails = joinedDocs[0];
                                if(req.userResponses[j].requestDetails.userResponses.length == 0){
                                    if(j == req.userResponses.length-1){
                                            //db.close();
                                            //dto.data = req;
                                            //response.send(dto);
                                        resolve("Success!");

                                    }
                                    else{
                                        j++;
                                        userIdRequired = true;
                                        isRequestResponseDetail = false;
                                        requestResponseDetail = null;
                                        addResponse(req, j, userIdRequired, isRequestResponseDetail, requestResponseDetail,db);
                                    }
                                }
                                else{
                                    userIdRequired = false;
                                    isRequestResponseDetail = true;
                                    requestResponseDetail = req.userResponses[j].requestDetails;
                                    addResponse(req, 0, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                        if(j == req.userResponses.length-1){

                                            //db.close();
                                            //dto.data = req;
                                            //response.send(dto);
                                            resolve("Success!");
                                        }
                                        else{
                                            j++;
                                            userIdRequired = false;
                                            isRequestResponseDetail = false;
                                            requestResponseDetail = null;
                                            addResponse(req, j, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                                resolve("Success");
                                            });
                                        }
                                    });

                                }
                            }

                        });
                    });
                });
            }
            else{
                db.collection('Request', function (err, Request) {
                    dbTaskDone = 1;
                    if (err) throw err;
                    if(requestResponseDetail.userResponses.length != 0){
                        var uid = new ObjectID(requestResponseDetail.userResponses[j].userId);
                        var rid = new ObjectID(requestResponseDetail.userResponses[j].requestId);
                    }
                    else{
                        var uid = new ObjectID(0);
                        var rid = new ObjectID(0);
                    }

                    if (userIdRequired == true) {
                        var query = {
                            _id: rid,
                            postUserId: uid
                        };
                    }
                    else {
                        var query = {
                            _id: rid
                        };
                    }

                    Request.find(query, function (err, cursor) {
                        var join = new Join(db).on({
                            field: 'postUserId',
                            to: '_id',
                            from: 'User',
                            as: 'postUserDetails'
                        });
                        console.log("hello");
                        join.toArray(cursor, function (err, joinedDocs) {
                            // handle array of joined documents here
                            if (err) throw err;
                            if(joinedDocs.length == 0){
                                resolve("Success!");
                            }
                            else if(joinedDocs.length != 0){
                                requestResponseDetail.userResponses[j].requestDetails = joinedDocs[0];
                                if(requestResponseDetail.userResponses[j].requestDetails.userResponses.length == 0){
                                    if(j == requestResponseDetail.userResponses.length-1){
                                        resolve("Success!");
                                    }
                                    else{
                                        j++;
                                        userIdRequired = false;
                                        isRequestResponseDetail = true;
                                        requestResponseDetail = requestResponseDetail;
                                        addResponse(req, j, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                            resolve("success");
                                        });
                                    }
                                }
                                else{
                                    userIdRequired = false;
                                    isRequestResponseDetail = true;
                                    requestResponseDetail = requestResponseDetail.userResponses[j].requestDetails;
                                    addResponse(req, 0, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                        resolve("success");
                                    });
                                }
                            }

                        });
                    });
                });
            }
        }
        )};


    });



}