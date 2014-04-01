var HomeView = Backbone.View.extend({
	template: _.template( $("#home-template").html() ),
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html( this.template() );
	},
	events: {
		"submit #new-drank": "addANewOne"
	},
	addANewOne: function(e) {
		console.log( $(e.currentTarget).serializeArray() );
		e.preventDefault();
	}
});

var DrinkDetail = Backbone.View.extend({
	template: _.template( $("#drink-detail-template").html() ),
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
	}
});

var AppRouter = Backbone.Router.extend({
	routes: {
		"": "home",
		"drinks": "list",
		"drinks/:id": "details",
		"drinks/add": "add"
	},

	home: function() {
		var homeView = new HomeView();
		$("#content").html(homeView.el);
	},
	details: function(id) {
		var drink = new DrinkModel({
			_id: id
		});
		drink.fetch({
			success: function(){
				$("#content").html(new DrinkDetail({
					model: drink
				}).el);
			}
		});
	}
});

var appRouter = new AppRouter();
Backbone.history.start();