var HomeView = Backbone.View.extend({
	template: _.template( $("#home-template").html() ),
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html( this.template({
			greeting: "what"
		}) );
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
		"drinks-bb": "list",
		"drinks-bb/:id": "details",
		"drinks-bb/add": "add"
	},

	home: function() {
		var homeView = new HomeView();
		$("#content").html(homeView.el);
	},
	details: function() {
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