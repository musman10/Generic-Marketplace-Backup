/**
 * Created by Rizwan.
 */
var Generic = require('./generic');

var Tenant = function(){

}

Tenant.prototype.findOne = function(query, next) {
    Generic.findOne('Tenant', query, next);
}
Tenant.prototype.find = function(query){
    return Generic.find('Tenant', query);
}
Tenant.prototype.insert = function(query, next){
    Generic.insert('Tenant', query, next);
}

module.exports = new Tenant();