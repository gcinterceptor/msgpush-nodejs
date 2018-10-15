const v8 = require('v8');

const gciHeader = 'gci';
const heapCheckHeader = 'ch';

function newSpaceFilter(params) {
    return params.space_name == "new_space"
}

function oldSpaceFilter(params) {
    return params.space_name == "old_space"
}

function getHeapUsage() {
    return v8.getHeapSpaceStatistics().filter(newSpaceFilter)[0].space_used_size
    + "|" + v8.getHeapSpaceStatistics().filter(oldSpaceFilter)[0].space_used_size;
}

module.exports = function (req, res, next) {
    if (req.headers[gciHeader] != undefined) {
        switch (req.headers[gciHeader]) {
        case heapCheckHeader:
            return res.status(200).send(getHeapUsage());
        default:
            global.gc();
            return res.status(200).send();
        }
    }
    next();
};