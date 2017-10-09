/**
 * Created by Rizwan.
 */
var Generic = require('./generic');

var UserBills = function(){

}

UserBills.prototype.findOne = function(query, next) {
    Generic.findOne('UserBills', query, next);
}
UserBills.prototype.find = function(query){
    return Generic.find('UserBills', query);
}
UserBills.prototype.joinOn = function(query){
    return Generic.joinOn(query);
}
UserBills.prototype.insert = function(query, next){
    Generic.insert('UserBills', query, next);
}
UserBills.prototype.updateOne = function(query, update, next){
    Generic.updateOne('UserBills', query, update, next);
}
UserBills.prototype.insertOne = function(query, next){
    Generic.insertOne('UserBills', query, next);
}

module.exports = new UserBills();