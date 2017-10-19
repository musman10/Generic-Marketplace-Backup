/**
 * Created by semianchuk on 04.04.16.
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
// var api_routes = require('./api/route');
var url = require('url');
var http = require('http');

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

// view engine setup
app.set('views', path.join(__dirname, 'reesetpassword'));
app.set('view engine', 'ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use('/api/', api_routes);
app.use('/',function(req,res) {
    str = JSON.stringify(fullUrl(req));
    console.log(str);
    var urlParts = str.split("/");
    if (urlParts[3].length == 0) {
        res.sendFile(__dirname + '/index.html');
    }

    else if(urlParts[3]=="resetpassword"){

        var Url="";
        for(var i=0;i<3;i++){
            if(i == 0) {
                Url = Url + urlParts[i];
            }
            else{
                Url = Url +'/'+ urlParts[i];
            }
            }

        var baseUrl="";
        for(i=0;i<Url.length;i++){
            if(i!=0){
                baseUrl=baseUrl+Url[i];
            }
        }
        console.log("BaseUrl: "+baseUrl);

        var urlPartsWithSlash="";
        for(i=4;i<urlParts.length;i++){
            if(i==4){
                urlPartsWithSlash=urlPartsWithSlash+urlParts[i];
            }
            else {
                urlPartsWithSlash = urlPartsWithSlash + "/" + urlParts[i];
            }

        }

        var correctUserId="";
        for(i=0;i<urlPartsWithSlash.length;i++){
            if(i<urlPartsWithSlash.length-1){
                correctUserId=correctUserId+urlPartsWithSlash[i];
            }
        }

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/resetpassword/' + '?encryptedUserId=' + correctUserId + '&baseUrl=' + encodeURIComponent(baseUrl),
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        http.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);

        }).end();

        // var service = require("./resetpassword/resetPassword");
        // service(correctUserId,baseUrl,res);


    }
    else{
      res.sendFile(__dirname + '/pageNotFound.html');
    }

});
app.get('/*', function(req, res) {
  res.send('page not found');
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
console.log('Server running: http://localhost:8080');
app.listen(8080);
