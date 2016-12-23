var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(__dirname + "/public"));

app.get("*", function(req, res) {
	res.sendfile("public/index.html")
});

app.listen(3000, function(){
    console.log("Listening to the port 3000");
});