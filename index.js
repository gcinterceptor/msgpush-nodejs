var express = require('express');
var app = express();
var metrics = require('node-monitor-ui');

const PORT = process.env.PORT || 3000;
var USE_GCI = process.env.USE_GCI || 'FALSE';
var MSG_SIZE = process.env.MSG_SIZE || 12;
var WINDOW_SIZE = process.env.WINDOW_SIZE || 12;
var buffer = new Array();
var msgCount = 0;

forceGC();
app.get('/', function (req, res) {

    var byteArray = new Array(MSG_SIZE);

    var i = 0;
    for (i; i < MSG_SIZE; i++) {
        byteArray[i] = i;
    }

    if (WINDOW_SIZE > 0) {
        buffer[msgCount++ % WINDOW_SIZE] = byteArray;
    }

    console.log(buffer);
    
    res.send('hello world' + msgCount);
});

metrics.init(3001);

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

function forceGC() {
    if (global.gc) {
        global.gc();
    } else {
        console.warn('No GC hook! Start your program as `node --expose-gc file.js`.');
    }
};