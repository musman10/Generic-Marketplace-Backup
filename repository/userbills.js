/**
 * Created by Rizwan.
 */
var Generic = require('./generic');

var UserBill = function(){

}

UserBill.prototype.findOne = function(query, next) {
    Generic.findOne('UserBill', query, next);
}
UserBill.prototype.find = function(query){
    return Generic.find('UserBill', query);
}
UserBill.prototype.joinOn = function(query){
    return Generic.joinOn(query);
}
UserBill.prototype.insert = function(query, next){
    Generic.insert('UserBill', query, next);
}
UserBill.prototype.updateOne = function(query, update, next){
    Generic.updateOne('UserBill', query, update, next);
}

module.exports = new UserBill();