var express = require('express');
var app = express();
var metrics = require('node-monitor-ui');

const PORT = process.env.PORT || 3000;
const USE_GCI = process.env.USE_GCI || 'FALSE';
const MSG_SIZE = process.env.MSG_SIZE || 1024;
const WINDOW_SIZE = process.env.WINDOW_SIZE || 0;
const buffer = new Array();
const msgCount = 0;

metrics.init(3001);

app.listen(PORT, function () {
    console.log('App listening on port ' + PORT + '!');
});

app.get('/', function (req, res) {
    var byteArray = new Array(MSG_SIZE);
    var i = 0;
    for (i; i < MSG_SIZE; i++) {
        byteArray[i] = i;
    }
    if (WINDOW_SIZE > 0) {
        buffer[msgCount++ % WINDOW_SIZE] = byteArray;
    }
    res.status(200).send();
});