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
		var formData = {
			name: $("[name='name']", this.el).val(),
			aged: $("[name='aged']", this.el).val(),
			proof: $("[name='proof']", this.el).val(),
			founder: $("[name='founder']", this.el).val(),
			location: $("[name='location']", this.el).val()
		}
		this.model.save(formData, {
			success: function() {
				console.log("saved");
				$("input[type='text']", this.el).val("")
			}
		});
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

var DrinkListView = Backbone.View.extend({
	template: _.template( $("#drink-list-template").html() ),
	initialize: function() {
		this.listenTo(this.collection, "sync", this.render);
	},
	render: function() {
		this.$el.html( this.template( {drinks: this.collection.toJSON()} ) );
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
		var drink = new DrinkModel();
		var homeView = new HomeView({
			model: drink
		});
		$("#content").html(homeView.el);
	},
	list: function() {
		var drinkCollection = new DrinkCollection();
		drinkCollection.fetch({
			success: function(data) {
				$("#content").html(new DrinkListView({
					collection: drinkCollection
				}).el);
			}
		});
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