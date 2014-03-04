var mongo = require("mongodb");
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server("localhost", 27017, {
	auto_reconnect: true
});
var db = new Db("drinkdb", server);

db.open(function(err, db) {
	if (!err) {
		console.log("connected to the db");
		db.collection("drinks", {strict: true}, function(err, collection) {
			if(err) {
				console.log("the drinksdb doesn't exist. populating nowww");
				populateDB();
			}
		});
	}
});

exports.findAll = function(req, res) {
	db.collection("drinks", function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log("findById" + id);
	db.collection("drinks", function(err, collection) {
		collection.findOne({"_id": new BSON.ObjectID(id)}, function(err, item) {
			res.send(item);
		});
	});
};

exports.addDrink = function(req, res) {
	var drink = req.body;
	console.log("addDrink" + JSON.stringify(drink));
	db.collection("drinks", function(err, collection) {
		collection.insert(drink, {safe: true}, function(err, result) {
			if(err) {
				res.send({"error adding": "an errorrrrrr"});
			} else {
				console.log("success adding" + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

exports.updateDrink = function(req, res) {
	var id = req.params.id;
	var drink = req.body;
	console.log("updating drink" + id +  JSON.stringify(drink));
	db.collection("drinks", function(err, collection) {
		collection.update({"_id": new BSON.ObjectID(id)}, drink, {safe: true}, function(err, result) {
			if(err) {
				console.log("errr updating drink");
				res.send({"error": "oh no update"});
			} else {
				console.log("success update!" + result + "docs updated");
				res.send(drink);
			}
		});
	});
};

exports.deleteDrink = function(req, res) {
	var id = req.params.id;
	console.log("deleting drink" + id);
	db.collection("drinks", function(err, collection) {
		collection.remove({"id": new BSON.ObjectID(id)}, drink, {safe:true}, function(err, result) {
			if(err) {
				res.send({"error": "error deleting!" + err});
			} else {
				res.send(req.body);
			}
		});
	});
};

/* ********** ********** ********** ********** ********** ********** ********** */
var populateDB = function() {

	console.log("populate");
	
 	var wines = [
 	{
 	    name: "CHATEAU DE SAINT COSME",
 	    year: "2009",
 	    grapes: "Grenache / Syrah",
 	    country: "France",
 	    region: "Southern Rhone",
 	    description: "The aromas of fruit and spice...",
 	    picture: "saint_cosme.jpg"
 	},
 	{
 	    name: "LAN RIOJA CRIANZA",
 	    year: "2006",
 	    grapes: "Tempranillo",
 	    country: "Spain",
 	    region: "Rioja",
 	    description: "A resurgence of interest in boutique vineyards...",
 	    picture: "lan_rioja.jpg"
 	}];
 
 	db.collection('drinks', function(err, collection) {
 	    collection.insert(wines, {safe:true}, function(err, result) {});
 	});
 
};