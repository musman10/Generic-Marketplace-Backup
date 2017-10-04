/**
 * Created by Rizwan.
 */
var Generic = require('./generic');

var Packages = function(){

}

Packages.prototype.findOne = function(query, next) {
    Generic.findOne('Packages', query, next);
}
Packages.prototype.find = function(query){
    return Generic.find('Packages', query);
}
Packages.prototype.joinOn = function(query){
    return Generic.joinOn(query);
}
Packages.prototype.updateOne = function(query, update, next){
    Generic.updateOne('Packages', query, update, next);
}
Packages.prototype.insertOne = function(query, next){
    Generic.insertOne('Packages', query, next);
}

module.exports = new Packages();