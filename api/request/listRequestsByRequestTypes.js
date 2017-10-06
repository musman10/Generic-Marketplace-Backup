var Request = require('../../repository/request.js');
module.exports = function (listRequestPayload, response) {
    var Promise = require('promise');
    var ObjectID = require('mongodb').ObjectID;
    var dto = {success: true, error: [], status: 200};
    var dbTaskDone;
    //var MongoClient = require('mongodb').MongoClient;


    var queryList = [];
    var queryExpression = {
        requestType: ''
    };
    for (var i = 0; i < listRequestPayload.requestTypes.length; i++) {
        queryExpression.requestType = listRequestPayload.requestTypes[i];
        queryList.push(queryExpression);
    }
    var query = {$or: queryList};

    Request.find(query).toArray(function (err, res) {
        try {
            if (err) throw err;
            console.log("1 document inserted");

            if (res.length > 0) {
                addResponse(res, 0, 0, true, false, null).then(function () {
                    dto.data = res;
                    response.send(dto);
                }).catch(function (e) {
                    console.log(e);
                });
            }
            else {

                dto.success = false;
                dto.error.push("request type requests not found");
                console.log(e.toString());
                response.send(dto);
            }


        } catch (e) {

            dto.success = false;
            dto.error.push("Some error occured!");
            console.log(e.toString());
            response.send(dto);
        }
    });

    function addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail) {
        return new Promise(function (resolve, reject) {
            if (!isRequestResponseDetail) {

                dbTaskDone = 1;

                if (res[i].userResponses.length != 0) {
                    var uid = new ObjectID(res[i].userResponses[j].userId);
                    var rid = new ObjectID(res[i].userResponses[j].requestId);
                }
                else {
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
                try {
                    var cursor = Request.find(query);
                    var joinQuery = {
                        field: 'postUserId',
                        to: '_id',
                        from: 'User',
                        as: 'postUserDetails'
                    };
                    console.log("hello");
                    var joint = Request.joinOn(joinQuery);
                    join.toArray(cursor, function (err, joinedDocs) {
                        // handle array of joined documents here
                        if (err) throw err;
                        if (joinedDocs.length == 0) {
                            if (i == res.length - 1) {
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
                                addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail).then(function () {
                                    resolve();
                                }).catch(function(e){
                                    console.log(e);
                                });
                            }
                        }
                        else if (joinedDocs.length != 0) {
                            res[i].userResponses[j].requestDetails = joinedDocs[0];
                            if (res[i].userResponses[j].requestDetails.userResponses.length == 0) {
                                if (j == res[i].userResponses.length - 1) {
                                    if (i == res.length - 1) {
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
                                        addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail).then(function () {
                                            resolve();
                                        }).catch(function(e){
                                            console.log(e);
                                        });
                                    }
                                }
                                else {
                                    j++;
                                    userIdRequired = true;
                                    isRequestResponseDetail = false;
                                    requestResponseDetail = null;
                                    addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail).then(function () {
                                        resolve();
                                    }).catch(function(e){
                                        console.log(e);
                                    });
                                }
                            }
                            else {
                                userIdRequired = false;
                                isRequestResponseDetail = true;
                                requestResponseDetail = res[i].userResponses[j].requestDetails;
                                addResponse(res, i, 0, userIdRequired, isRequestResponseDetail, requestResponseDetail).then(function () {
                                    if (j == res[i].userResponses.length - 1) {
                                        if (i == res.length - 1) {
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
                                            addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail).then(function () {
                                                resolve();
                                            }).catch(function(e){
                                                console.log(e);
                                            });
                                        }
                                    }
                                    else {
                                        j++;
                                        userIdRequired = true;
                                        isRequestResponseDetail = false;
                                        requestResponseDetail = null;
                                        addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail).then(function () {
                                            resolve();
                                        }).catch(function(e){
                                            console.log(e);
                                        });
                                    }
                                }).catch(function(e){
                                    console.log(e);
                                });

                            }
                        }

                    });

                } catch (e) {

                    dto.success = false;
                    console.log(e.toString());
                    dto.error.push("Some error occured!");
                    response.send(dto);
                }
            }
            else {

                dbTaskDone = 1;

                if (requestResponseDetail.userResponses.length != 0) {
                    var uid = new ObjectID(requestResponseDetail.userResponses[j].userId);
                    var rid = new ObjectID(requestResponseDetail.userResponses[j].requestId);
                }
                else {
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
                try {
                    var cursor = Request.find(query);
                    var joinQuery = {
                        field: 'postUserId',
                        to: '_id',
                        from: 'User',
                        as: 'postUserDetails'
                    };
                    console.log("hello");
                    var join = Request.joinOn(joinQuery);
                    join.toArray(cursor, function (err, joinedDocs) {
                        // handle array of joined documents here
                        if (err) throw err;
                        if (joinedDocs.length == 0) {
                            //return;
                            resolve();
                        }
                        else if (joinedDocs.length != 0) {
                            requestResponseDetail.userResponses[j].requestDetails = joinedDocs[0];
                            if (requestResponseDetail.userResponses[j].requestDetails.userResponses.length == 0) {
                                if (j == requestResponseDetail.userResponses.length - 1) {
                                    //return;
                                    resolve();
                                }
                                else {
                                    j++;
                                    userIdRequired = false;
                                    isRequestResponseDetail = true;
                                    requestResponseDetail = requestResponseDetail;
                                    addResponse(res, i, j, userIdRequired, isRequestResponseDetail, requestResponseDetail).then(function () {
                                        resolve();
                                    }).catch(function(e){
                                        console.log(e);
                                    });
                                }
                            }
                            else {
                                userIdRequired = false;
                                isRequestResponseDetail = true;
                                requestResponseDetail = requestResponseDetail.userResponses[j].requestDetails;
                                addResponse(res, i, 0, userIdRequired, isRequestResponseDetail, requestResponseDetail).then(function () {
                                    resolve();
                                }).catch(function(e){
                                    console.log(e);
                                });
                            }
                        }

                    });

                } catch (e) {

                    dto.success = false;
                    dto.error.push("Some error occured");
                    Console.log(e.toString());
                    response.send(dto);
                }
            }
        });
    }


}