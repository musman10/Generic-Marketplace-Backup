module.exports = function(listRequestPayload,response){
    var MongoClient = require('mongodb').MongoClient;
    var Promise = require('promise');
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
            var queryList = [];
            var queryExpression = {
                requestType: ''
            };
            for (i = 0; i < listRequestPayload.requestTypes.length; i++) {
                queryExpression.requestType = listRequestPayload.requestTypes[i];
                queryList.push(queryExpression);
            }
            var query = {$or: queryList};

            db.collection("Request").find(query).toArray(function (err, res) {
                try {
                    if (err) throw err;
                    console.log("1 document inserted");

                    if (res.length > 0) {
                        addResponse(res, 0, 0, true, false, null, db).then(function () {
                            db.close();
                            dto.data = res;
                            response.send(dto);
                        });
                    }
                    else {
                        db.close();
                        dto.success = false;
                        dto.error.push("request type requests not found");
                        response.send(dto);
                    }
                }
                catch(err){
                    db.close();
                    dto.success = false;
                    dto.error.push(err.toString());
                    response.send(dto);
                }
            });
        }catch(e){
            db.close();
            dto.success = false;
            dto.error.push(e.toString());
            response.send(dto);
        }

        function addResponse(res,i,j,userIdRequired,isRequestResponseDetail,requestResponseDetail,db) {
            return new Promise(function (resolve, reject) {
                if(!isRequestResponseDetail){
                    db.collection('Request', function (err, Request) {
                        dbTaskDone = 1;
                        if (err) throw err;
                        if(res[i].userResponses.length != 0){
                            var uid = new ObjectID(res[i].userResponses[j].userId);
                            var rid = new ObjectID(res[i].userResponses[j].requestId);
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
                                    if(i == res.length -1){
                                        //db.close();
                                        //dto.data = res;
                                        //response.send(dto);
                                        resolve();
                                    }
                                    else {
                                        i++;
                                        j = 0;
                                        userIdRequired = true;
                                        isRequestResponseDetail = false;
                                        requestResponseDetail = null;
                                        addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                            resolve();
                                        });
                                    }
                                }
                                else if(joinedDocs.length != 0){
                                    res[i].userResponses[j].requestDetails = joinedDocs[0];
                                    if(res[i].userResponses[j].requestDetails.userResponses.length == 0){
                                        if(j == res[i].userResponses.length-1){
                                            if(i == res.length - 1){
                                                //db.close();
                                                //dto.data = res;
                                                //response.send(dto);
                                                resolve();
                                            }
                                            else{
                                                i++;
                                                j=0;
                                                userIdRequired = true;
                                                isRequestResponseDetail = false;
                                                requestResponseDetail = null;
                                                addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                                    resolve();
                                                });
                                            }
                                        }
                                        else{
                                            j++;
                                            userIdRequired = true;
                                            isRequestResponseDetail = false;
                                            requestResponseDetail = null;
                                            addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                                resolve();
                                            });
                                        }
                                    }
                                    else{
                                        userIdRequired = false;
                                        isRequestResponseDetail = true;
                                        requestResponseDetail = res[i].userResponses[j].requestDetails;
                                        addResponse(res, i, 0, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                            if(j == res[i].userResponses.length-1){
                                                if(i == res.length - 1){
                                                    //db.close();
                                                    //dto.data = res;
                                                    //response.send(dto);
                                                    resolve();
                                                }
                                                else{
                                                    i++;
                                                    j=0;
                                                    userIdRequired = true;
                                                    isRequestResponseDetail = false;
                                                    requestResponseDetail = null;
                                                    addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                                        resolve();
                                                    });
                                                }
                                            }
                                            else{
                                                j++;
                                                userIdRequired = true;
                                                isRequestResponseDetail = false;
                                                requestResponseDetail = null;
                                                addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                                    resolve();
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
                                    //return;
                                    resolve();
                                }
                                else if(joinedDocs.length != 0){
                                    requestResponseDetail.userResponses[j].requestDetails = joinedDocs[0];
                                    if(requestResponseDetail.userResponses[j].requestDetails.userResponses.length == 0){
                                        if(j == requestResponseDetail.userResponses.length-1){
                                            //return;
                                            resolve();
                                        }
                                        else{
                                            j++;
                                            userIdRequired = false;
                                            isRequestResponseDetail = true;
                                            requestResponseDetail = requestResponseDetail;
                                            addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                                resolve();
                                            });
                                        }
                                    }
                                    else{
                                        userIdRequired = false;
                                        isRequestResponseDetail = true;
                                        requestResponseDetail = requestResponseDetail.userResponses[j].requestDetails;
                                        addResponse(res, i, 0, userIdRequired, isRequestResponseDetail, requestResponseDetail,db).then(function(){
                                            resolve();
                                        });
                                    }
                                }

                            });
                        });
                    });
                }
            });
        }

    });



}