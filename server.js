var express = require("express");
var path = require('path')
var http = require('http')
var drinks = require("./routes/drinks")

var app = express();

app.configure(function() {
	// allow cors stuff first
	app.set('port', process.env.PORT || 3000);
	app.use(express.logger("dev"));
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'public')));
});

app.get("/drinks", drinks.findAll);
app.get("/drinks/:id", drinks.findById);
app.post("/drinks", drinks.addDrink);
app.put("/drinks/:id", drinks.updateDrink);
app.delete("/drinks/:id", drinks.deleteDrink);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
