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

/* Tenant list service */
router.get('/tenant/get/list', function(req, res, next) {
  var service = require("./tenant/list");
  service(res);
});


/* Userr signup service */
router.post('/user/signup', function(req, res, next) {
  var service = require("./user/signup");
  service(req.body,res);
});

/* post request service */
router.post('/request/post', function(req, res, next) {
  var service = require("./request/post");
  service(req.body,res);
});

/* get request list service */
router.get('/request/list/:tenantId', function(req, res, next) {
  var service = require("./request/list");
  service(req.params.tenantId,res);
});

/* get user list service */
router.get('/user/list/:tenantId', function(req, res, next) {
  var service = require("./user/list");
  service(req.params.tenantId,res);
});

/* Tenant service */
router.get('/tenant/:tenantName', function(req, res, next) {
  var service = require("./tenant/tenant");
  service(req.params.tenantName,res);
});


/* DB Create service */
router.get('/db/create', function(req, res, next) {
  var service = require("./db/create");
  service(res);
});
module.exports = router;