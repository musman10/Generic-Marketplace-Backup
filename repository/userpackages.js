/**
 * Created by Rizwan.
 */
var Generic = require('./generic');

var UserPackages = function(){

}

UserPackages.prototype.findOne = function(query, next) {
    Generic.findOne('UserPackages', query, next);
}
UserPackages.prototype.find = function(query){
    return Generic.find('UserPackages', query);
}
UserPackages.prototype.joinOn = function(query){
    return Generic.joinOn(query);
}
UserPackages.prototype.insert = function(query, next){
    Generic.insert('UserPackages', query, next);
}
UserPackages.prototype.updateOne = function(query, update, next){
    Generic.updateOne('UserPackages', query, update, next);
}
UserPackages.prototype.insertMany = function(query, update, next){
    Generic.insertMany('UserPackages', query, update, next);
}

module.exports = new UserPackages();