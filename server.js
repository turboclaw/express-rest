var express = require("express");
var drinks = require("./routes/drinks")

var app = express();

app.configure(function() {
	app.use(express.logger("dev"));
	app.use(express.bodyParser());
});

app.get("/drinks", drinks.findAll);
app.get("/drinks/:id", drinks.findById);
app.post("/drinks", drinks.addDrink);
app.put("/drinks/:id", drinks.updateDrink);
app.delete("/drinks/:id", drinks.deleteDrink);

app.listen(3000);
console.log("guys it's running");