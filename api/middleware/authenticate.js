var jwt = require('jsonwebtoken');
var User = require('../user/user');
var config = require('../config/db');
var secret = config.secret;

var authenticate = function(req, res, next){
    console.log('inside authenticate');
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, secret, function(err, user, info){
        console.log('inside verify');
        if(!err){

            var decoded = jwt.decode(token, secret);
            User.findOne({
                username: decoded.username
            }, function(err, user) {
                    if (err) throw err;

                    if (!user) {
                        return res.status(403).send({success: false, msg: 'Authentication failed'});
                    } else {
                        next();
                    }
                });
        } else {
            return res.status(403).send({success: false, msg: 'Invalid token'});
        }
    });
}

var _getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = authenticate;