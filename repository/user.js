/**
 * Created by Rizwan.
 */
var Generic = require('./generic');

var User = function(){

}

User.prototype.findOne = function(query, next) {
    Generic.findOne('User', query, next);
}
User.prototype.find = function(query){
    return Generic.find('User', query);
}
User.prototype.joinOn = function(query){
    return Generic.joinOn(query);
}
User.prototype.insert = function(query, next){
    Generic.insert('User', query, next);
}
User.prototype.updateOne = function(query, update, next){
    Generic.updateOne('User', query, update, next);
}

module.exports = new User();