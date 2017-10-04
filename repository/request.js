/**
 * Created by Rizwan.
 */
var Generic = require('./generic');

var Request = function(){

}

Request.prototype.findOne = function(query, next) {
    Generic.findOne('Request', query, next);
}
Request.prototype.find = function(query){
    return Generic.find('Request', query);
}
Request.prototype.joinOn = function(query){
    return Generic.joinOn(query);
}
Request.prototype.updateOne = function(query, update, next){
    Generic.updateOne('Request', query, update, next);
}
Request.prototype.insertOne = function(query, next){
    Generic.insertOne('Request', query, next);
}

module.exports = new Request();