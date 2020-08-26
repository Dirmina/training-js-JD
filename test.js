const _         = require("lodash");

var MyLodash    = require("./myLodash");
var Write       = require("./write");

var Test = { };

Test.run = function (tests, callback) {
    // Init folder and files
    Write.init();
    // Run tests
    var points = 0;
    _.each(tests, function (test) {
        var call = test.call;
        // Tmp values for expected
        var valuesExpected = _.cloneDeep(test.values);
        var extraExpected = test.extra;
        // Tmp values for results
        var valuesResults = _.cloneDeep(test.values);
        var extraResults = test.extra;

        if (MyLodash[call]) {
            var expected = _[call](valuesExpected, extraExpected);
            var results = MyLodash[call](valuesResults, extraResults);
            if (_.isEqual(results, expected)) {
                points += 1;
            }
            Write.test(test, results, expected);
        } else {
            Write.test(test, "Function not found", expected);
        }
    });
    return points;
};

Test.getFunctions = function () {
    return [{
        call: "reverse",
        values: [1, 2, 3]
    }, {
        call: "trim",
        values: "   abc   "
    }, {
        call: "find",
        values: [
            { name: "John", age: 28 },
            { name: "Jane", age: 5 },
            { name: "Jim",  age: 54 },
            { name: "Kate", age: 40 }
        ],
        extra: function filterByAge (user) {
            return user.age < 18;
        }
    }, {
        call: "uniq",
        values: [2, 1, 2]
    }, {
        call: "uniqBy",
        values: [2.1, 1.2, 2.3],
        extra: function mathFloor(value) {
            return Math.floor(value);
        }
    }, {
        call: "xor", 
        values: [2, 1],
        extra: [2, 3]
    }, {
        call: "sortBy",
        values: [
            { 'user': 'fred',   'age': 48 },
            { 'user': 'barney', 'age': 36 },
            { 'user': 'fred',   'age': 40 },
            { 'user': 'barney', 'age': 34 }
        ],
        extra: ['user', 'age']
    }, {
        call: "groupBy",
        values: [6.1, 4.2, 6.3],
        extra: function mathFloor(value) {
            return Math.floor(value);
        }
    }, {
        call: "flattenDeep",
        values: [1, [2, [3, [4]], 5]]
    }, {
        call: "defaultsDeep",
        values: { 'a': { 'b': 2 } }, 
        extra: { 'a': { 'b': 1, 'c': 3 } }
    }]
}

module.exports = Test;