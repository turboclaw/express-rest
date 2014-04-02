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
	delete drink._id;
	console.log("updating drink" + id +  JSON.stringify(drink));
	db.collection("drinks", function(err, collection) {
		collection.update({"_id": new BSON.ObjectID(id)}, drink, {safe: true}, function(err, result) {
			if(err) {
				console.log("err: " + err);
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
		collection.remove({"_id": new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if(err) {
				res.send({"error": "error deleting!" + err});
			} else {
				console.log("deleted???");
				res.send(req.body);
			}
		});
	});
};

/* ********** ********** ********** ********** ********** ********** ********** */
var populateDB = function() {

	console.log("populate");
	
	var bourbon = [
		{
			name: "Knob Creek Single Barrel",
			aged: 9,
			proof: 120,
			founder: "Booker Noe",
			location: "Clermont, KY"
		},
		{
			name: "Baker's",
			aged: 7,
			proof: 107,
			founder: "Booker Noe",
			location: "Clermont, KY"
		},
		{
			name: "Woodford Reserve",
			aged: 7,
			proof: 80,
			founder: "Brown-Forman",
			location: "Versailles, KY"
		}
	];

	db.collection('drinks', function(err, collection) {
		collection.insert(bourbon, {safe:true}, function(err, result) {});
	});

};