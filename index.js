// Require files
var Test = require("./test");

var functions = Test.getFunctions();
var points = Test.run(functions);

console.log("\x1b[32m", "Final Score -> ", points, "/", functions.length, "\x1b[0m");
