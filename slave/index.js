var express = require('express');
var app = express();

var start = function start() {
    console.log("process start...this is run within the event loop so try to make it snappy");
};

var stop = function stop() {
    console.log("process stop...this is run within the event loop so try to make it snappy");
};

app.get('/', function (req, res) {
        res.send('Hello World!');
    });

app.get('/start', function (req, res) {
        start();
        res.send('Start!');
    });

app.get('/stop', function(req, res) {
        stop();
        res.send('Stop!');
    });

app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });