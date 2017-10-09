/**
 * Created by Rizwan.
 */
var Generic = require('./generic');

var UserBillPackages = function(){

}

UserBillPackages.prototype.findOne = function(query, next) {
    Generic.findOne('UserBillPackages', query, next);
}
UserBillPackages.prototype.find = function(query){
    return Generic.find('UserBillPackages', query);
}
UserBillPackages.prototype.joinOn = function(query){
    return Generic.joinOn(query);
}
UserBillPackages.prototype.insert = function(query, next){
    Generic.insert('UserBillPackages', query, next);
}
UserBillPackages.prototype.updateOne = function(query, update, next){
    Generic.updateOne('UserBillPackages', query, update, next);
}
UserBillPackages.prototype.insertMany = function(query, update, next){
    Generic.insertMany('UserBillPackages', query, update, next);
}
module.exports = new UserBillPackages();