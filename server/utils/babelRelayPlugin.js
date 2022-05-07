let fs = require("fs");
let path = require("path");

let jsonFile = path.join(__dirname, "../date/schema.json");

fs.access(jsonFile, fs.F_OK, function (err) {
  if (!err)
    module.exports = require("babel-relay-plugin")(require(jsonFile).data);
});
