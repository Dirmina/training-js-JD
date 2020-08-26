const _         = require("lodash");
var fs          = require('fs');

var Write = { };

var folder = "./outputs"; 
var pathResults = "./outputs/results.txt"

Write.init = function () {
    if (!fs.existsSync(folder)){
        fs.mkdirSync(folder);
    }
    
    fs.closeSync(fs.openSync(pathResults, 'w'));
}

// Write file input
Write.test = function (test, results, expected) {
    var text = "";
    if (test.extra) {
        var extra = test.extra;
        if (typeof test.extra === "function") {
            extra = test.extra.name;
        }
        text += ("Function " + test.call + "(" + JSON.stringify(test.values) + ", " + JSON.stringify(extra) + ") : ");
    } else {
        text += ("Function " + test.call + "(" + JSON.stringify(test.values) + ") : ");
    }
    text += ("\n");
    text += ("Expected -> " + JSON.stringify(expected));
    text += ("\n");
    text += ("Results  -> " + JSON.stringify(results));
    text += ("\n");
    text += ("------------------------------------");
    text += ("\n\n");
    
    var stream = fs.createWriteStream(pathResults, { flags: 'a' });
    stream.once('open', function (fd) {
        stream.write(text);
        stream.end();
    });
}

module.exports = Write;