var userOneName = "Swetha";

var lastPingUserOne = 0;
var lastPingUserTwo = 0;


// function Session() {
//   this.userOneName;
//   this.userTwoName;
//   this.userOneQueue=[];
//   this.userTwoQueue=[];
//   this.isActive;

// }
// var sessionidctr =0;
// var sessionList = {};



var express = require('express');
var app = express();
var userOneQueue = [];
var userTwoQueue = [];

var port = process.env.PORT;

app.use(express.static('public'));
app.use(express.static('src/views'));
app.use(express.static('bower_components'));

app.use(express.bodyParser());



app.get('/', function(req, resp) {
    console.log("received request from " + req);
    resp.send('Hello World');
});

app.get('/useroneonline', function(req, resp) {
    var now = new Date().getTime();
    if (now - lastPingUserOne > (1000 * 5)) {
        resp.send('offline');
    }
    else {
        resp.send('online');
    }
});

app.get('/usertwoonline', function(req, resp) {
    var now = new Date().getTime();


    if (now - lastPingUserTwo > (1000 * 5)) {
        resp.send('offline');
    }
    else {
        resp.send('online');
    }
});

app.post('/userone', function(req, resp) {

    console.log("message for userone " + req.body.name);
    userOneQueue.push(req.body.name);
    console.log("after updating queue size " + userOneQueue.length);

    resp.send();
});

app.post('/usertwo', function(req, resp) {


    console.log("message for userone " + req.body.name);
    userTwoQueue.push(req.body.name);
    console.log("after updating queue size " + userTwoQueue.length);

    resp.send();

});

app.get('/userone', function(req, resp) {
    lastPingUserOne = new Date().getTime();
    var msg = "";
    console.log("size of queue" + userOneQueue.length);
    while (userOneQueue.length > 0) {
        msg = msg + userOneQueue.shift() + "</br>";

    }
    console.log("MESSAGE for user one :" + msg);

    resp.send(msg);
});

app.get('/usertwo', function(req, resp) {
    lastPingUserTwo = new Date().getTime();
    var msg = "";
    console.log("size of queue" + userTwoQueue.length);
    while (userTwoQueue.length > 0) {
        msg = msg + userTwoQueue.shift();
    }
    console.log("MESSAGE for user two :" + msg);

    resp.send(msg);
});

app.listen(port, function(err) {
    console.log("Server is running on port: " + port)
});