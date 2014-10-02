(function() {
'use strict';


// Add x and complete icons in template. If use clicks on one of these with a certain item's id, then do that fn to that item.


var Project = Backbone.Model.extend({});
var ProjectCollection = Backbone.Collection.extend({
	model: Project
});

var ToDoItem = Backbone.Model.extend({});
var ToDoItemCollection = Backbone.Collection.extend({
  model: ToDoItem
}); 




var CreateProjectView = Backbone.View.extend({
  tagName: 'input',
  className: 'create-project',
  initialize: function() {
  	$('.jumbotron').append(this.el);
  },

  attributes: {
  	type: 'text'
  },

  events: {				
    'keyup': 'addToPList'
  },

  addToPList: function(event){
    if(event.keyCode === 13){
      var project = this.collection.add({title: this.$el.val()});     /* At this point this variable declaration is unnecessary? */
      this.el.value="";
    }
  }
});

var ProjectListView = Backbone.View.extend({
	tagName: 'ul',
	className: 'project-list',
	initialize: function() {
		$('.jumbotron').prepend(this.el);

		this.listenTo(this.collection, 'add', function(project) {
        new ProjectView({model: project});
        console.log(project);
		});
	}														
});

var ProjectView = Backbone.View.extend({
  tagName: 'li',
  className: 'project',
  initialize: function() {
    $('.project-list').prepend(this.el);
    // console.log(this.$el);  
    // this.$el.append(this.model.get('title'));
    var templateFunction = _.template($('#project').text());
    var renderedTemplate = templateFunction(this.model.attributes);
    this.$el.html(renderedTemplate);


    var toDoItems = new ToDoItemCollection();
    this.collection = toDoItems;

    new CreateToDoView({collection: toDoItems});

    this.listenTo(this.collection, 'add', function(toDoItem) {    
        this.$('.toDos').append('<li>' + toDoItem.get('title') + '</li>');
        new ToDoItem({model: toDoItem});
        console.log(toDoItem);
        // this.$el.append(toDoItem);
    });

  },

  // render: function () {
  //   $(this.el).html('yo');
  // }
});

var CreateToDoView = Backbone.View.extend({
  tagName: 'input',
  className: 'create-toDo',
  initialize: function() {
    $('.newInput').first().append(this.el);
  },

  attributes: {
    type: 'text'
  },

  events: {       
    'keyup': 'addToTDList'
  },

  addToTDList: function(event){
    if(event.keyCode === 13){
      var toDoItem = this.collection.add({title: this.$el.val()});
      this.el.value="";
    }
  }
});




$(document).ready(function(){
	var projects = new ProjectCollection();
	var createProjectView = new CreateProjectView({collection: projects});
	// createProjectView.render();
	var projectListView = new ProjectListView({collection: projects});
});





})();










