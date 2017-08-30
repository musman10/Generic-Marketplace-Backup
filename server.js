/**
 * Created by semianchuk on 04.04.16.
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var api_routes = require('./api/route');
var url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}

var app = express().use(express.static(
    path.join(__dirname, '')
))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api/', api_routes);
app.use('/',function(req,res){
    //var url = fullUrl(req);
    /*
    str = JSON.stringify(fullUrl(req));
    console.log(req.protocol);
    console.log(req.get('host'));
    var tenant = {
        name:'rozee',
        users:[],
        properties:[],
        requests:[]
    };
    tenant = JSON.stringify(tenant);
    var options = {
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
            'name': 'MattDionis',
            'origin':'stackoverflow',
            'tenantConfiguration':tenant
        }
    };
    */
    res.sendFile(__dirname + '/index.html');
    //console.log(url.protocol + "--" + url.host + "--" + url.pathname);
});
/*
app.get('/', function (req, res) {
    var url = req.url;
    console.log("in \ function");
});
/*
app.get('/', function(req, res){
    var host = req.get('host');
    console.log(host);
    res.send(host);
    //res.sendFile(__dirname + '/index.html');
});
*/
console.log('Server running: http://localhost:8080')
app.listen(8080);
