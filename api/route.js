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

/* User Login service */
router.post('/user/loginUser', function(req, res, next) {
  var service = require("./user/userLogin");
  service(req.body , res);
});

/* User update service */
router.post('/user/updateUser', function(req, res, next) {
  var service = require("./user/userProfileUpdate");
  service(req.body , res);
});

/* Request view service */
router.post('/request/view', function(req, res, next) {
  var service = require("./request/viewRequest");
  service(req.body , res);
});

/* Userr signup service */
router.post('/user/signup', function(req, res, next) {
  var service = require("./user/signup");
  service(req.body,res);
});

/* Request post service */
router.post('/request/post', function(req, res, next) {
  var service = require("./request/post");
  service(req.body,res);
});

/* get request list service */
router.get('/request/list/:tenantId', function(req, res, next) {
  var service = require("./request/list");
  service(req.params.tenantId,res);
});

router.post('/request/user/list/requestTypes/', function(req, res, next) {
  var service = require("./request/listRequestsByRequestTypes");
  service(req.body,res);
});

router.get('/user/post/request/list/userid/:userId', function(req, res, next) {
  var service = require("./request/listPostRequestsByUserId");
  service(req.params.userId,res);
});

/* Get user responses*/
router.post('/request/response', function(req, res, next) {
  var service = require("./request/viewResponse");
  service(req.body,res);
});

/* get user list service */
router.get('/user/list/:tenantId', function(req, res, next) {
  var service = require("./user/list");
  service(req.params.tenantId,res);
});

/* Request getByName service */
router.get('/request/getByName/:requestName', function(req, res, next) {
  var service = require("./request/getRequestByName");
  service(req.params.requestName,res);
});

/* Request Update addResponse service */
router.post('/request/update/addResponse', function(req, res, next) {
  var service = require("./request/addResponse");
  service(req.body,res);
});

/* DB Create service */
router.get('/db/create', function(req, res, next) {
  var service = require("./db/create");
  service(res);
});
module.exports = router;
