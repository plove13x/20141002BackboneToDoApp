/* global Backbone, $ */


(function() {
'use strict';


// Add x and complete icons to each li. If use clicks on one of these with a certain item's id, then do that fn to that item.
// Make all buttons work.
// Connect to tinypizzaserver.


var Project = Backbone.Model.extend({
  defaults: {
    title: '',
    isCompleted: false
  },
  firebase: new Backbone.Firebase("https://crackling-torch-1951.firebaseIO.com/"),
  // initialize: function(){
  //   this.toDoItemList = new ToDoItemCollection()
  // }
});

var ProjectCollection = Backbone.Firebase.Collection.extend({
	model: Project,
  firebase: "https://crackling-torch-1951.firebaseIO.com/"
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
      var project = this.collection.create({title: this.$el.val()});     /* At this point this variable declaration is unnecessary? */
      this.el.value="";
      // project.save().done(function(project){}) is another way here if 'create' above is 'add'
    }
  }
});

var ProjectListView = Backbone.View.extend({
	tagName: 'ul',
	className: 'project-list',
	initialize: function() {

    // options as argument above

    // options = options || {};
    // this.container = options.$container;
    // this.$container.prepend(this.el);


		$('.jumbotron').prepend(this.el);

    this.listenTo(this.collection, 'sync', this.render);
		this.listenTo(this.collection, 'add', this.renderChild);
	},

  render: function(){
    this.$el.empty();
    this.collection.each(_.bind(this.renderChild, this));
  },

  renderChild: function(project){
    var projectView = new ProjectView({ model: project });
    projectView.render();
    this.$el.prepend(projectView.el);
  }

});


// initialize: function(options){
//   options = options || {};
//   this.container = options.$container;
//   this.$container.append(this.el);
// }



  // events: {
  //   'click li .delete': 'deleteProject'
  // },

  // deleteProject: function(e) {   $(e.target).attr('data-id') }


var ProjectView = Backbone.View.extend({
  tagName: 'li',
  className: 'project',
  template: _.template( $('#project').text() ),

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);

    var toDoItems = new ToDoItemCollection();
    // can pass in container in new ToDoItem above with this.$el (ProjectView)
    this.collection = toDoItems; 
    this.listenTo(this.collection, 'add', function(toDoItem) {                // Go back and name this
    this.$('.toDos').append('<li>' + toDoItem.get('title') + '</li>');
        // this.$('.toDos').append(toDoItem.el); would also work
    });

  },

  events: {
    'change input[type=checkbox]': 'toggleCompleted',
    'click button': 'destroyBook'
  },

  toggleCompleted: function(e) {
    var isCompleted = $(e.target).is(':checked');
    this.model.set('isCompleted', isCompleted);
    this.model.save();
  }, 

  destroyBook: function() {
    this.model.destroy();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    if (this.model.get('isCompleted')) {
       this.$('input').attr('checked', 'checked');
    }
    var createView = new CreateToDoView({collection: this.collection});
    this.$('.newInput').append(createView.el);
  }
});

var CreateToDoView = Backbone.View.extend({
  tagName: 'input',
  className: 'create-toDo',

  attributes: {
    type: 'text'
  },

  events: {       
    'keyup': 'addToTDList'
  },


  addToTDList: function(event){
    if(event.keyCode === 13){
      console.log(event);
      var toDoItem = this.collection.add({title: this.$el.val()});
      this.el.value="";
    }
  }

  // render: function() {
  //   this.listenTo(this.collection, 'add', function(toDoItem) {                // Go back and name this
  //   this.$('.toDos').append('<li>' + toDoItem.get('title') + '</li>');
  //   }
  // }
});




$(document).ready(function(){
	var projects = new ProjectCollection();
  projects.fetch();

	var createProjectView = new CreateProjectView({collection: projects});
	// createProjectView.render();
	var projectListView = new ProjectListView({collection: projects});

  // add above: ,$container: $('.jumbotron')


});




})();










