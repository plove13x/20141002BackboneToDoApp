(function() {
'use strict';


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
	   var project = this.collection.add({title: this.$el.val()});
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
  },

  // render: function () {
  //   $(this.el).html('yo');
  // }
});




$(document).ready(function(){
	var projects = new ProjectCollection();
  var toDoItems = new ToDoItemCollection();

	var createProjectView = new CreateProjectView({collection: projects});
	// createProjectView.render();

	var projectListView = new ProjectListView({collection: projects});
  // console.log(projectListView);
  // var projectView = new ProjectView({collection: toDoItems});
  // console.log(projectView);
});





})();










