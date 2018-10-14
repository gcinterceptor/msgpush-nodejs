const v8 = require('v8');

const gciHeader = 'gci';
const heapCheckHeader = 'ch';

module.exports = function (req, res, next) {
        if (req.headers[gciHeader] != undefined) {
            switch (req.headers[gciHeader]) {
            case heapCheckHeader:
                res.status(200).send(v8.getHeapSpaceStatistics().filter(function (ns) {
                    if (ns.space_name == "new_space") {
                        return true;
                    };
                })[0].space_used_size + "|" + v8.getHeapSpaceStatistics().filter(function (os) {
                    if (os.space_name == "old_space") {
                        return true;
                    };
                })[0].space_used_size);
            default:
                global.gc();
            }
        }
        next();
};