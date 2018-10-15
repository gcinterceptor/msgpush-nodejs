const v8 = require('v8');

const gciHeader = 'gci';
const heapCheckHeader = 'ch';

function getNewSpace(params) {
    if (params.space_name == "new_space") {
        return true;
    };
}

function getOldSpace(params) {
    if (params.space_name == "old_space") {
        return true;
    };
}

function getHeapUsage() {
    return v8.getHeapSpaceStatistics().filter(getNewSpace)[0].space_used_size
    + "|" + v8.getHeapSpaceStatistics().filter(getOldSpace)[0].space_used_size;
}

module.exports = function (req, res, next) {
        if (req.headers[gciHeader] != undefined) {
            switch (req.headers[gciHeader]) {
            case heapCheckHeader:
                res.status(200).send(getHeapUsage());
            default:
                global.gc();
            }
        }
        next();
};
