var express = require("express");
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

app.listen(4242, function() {
	console.log('Puerto 4242 escuchando');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

module.exports = app;