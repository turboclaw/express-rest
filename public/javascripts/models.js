window.DrinkModel = Backbone.Model.extend({
	urlRoot: "/drinks",
	idAttribute: "_id",

	defaults: {
		_id: null,
		name: "",
		grapes: "",
		country: "USA",
		region: "California",
		year: "",
		description: "",
		picture: null
	}
});

window.DrinkCollection = Backbone.Collection.extend({
	model: "DrinkModel",
	url: "/drinks"
});