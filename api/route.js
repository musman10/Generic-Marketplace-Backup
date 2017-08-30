var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* User List service */
router.get('/users', function(req, res, next) {
  var service = require("./user/users");
  service(res);
});


/* Tenant register service */
router.post('/tenant/register', function(req, res, next) {
  var service = require("./tenant/register");
  service(req.body,res);
});

/* Tenant service */
router.get('/tenant/:tenantName', function(req, res, next) {
  var service = require("./tenant/tenant");
  service(req.params.tenantName,res);
});


/* Userr signup service */
router.post('/user/signup', function(req, res, next) {
  var service = require("./user/signup");
  service(req.body,res);
});




/* User Login service */
router.post('/user/loginUser', function(req, res, next) {
  var service = require("./user/userLogin");
  service(req.body , res);
});



/* DB Create service */
router.get('/db/create', function(req, res, next) {
  var service = require("./db/create");
  service(res);
});
module.exports = router;