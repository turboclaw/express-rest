window.DrinkModel = Backbone.Model.extend({
	urlRoot: "/drinks",
	idAttribute: "_id",

	defaults: {
		_id: null,
		name: "",
		aged: "",
		proof: "",
		founder: "",
		location: "KY"
	}
});

window.DrinkCollection = Backbone.Collection.extend({
	model: "DrinkModel",
	url: "/drinks"
});