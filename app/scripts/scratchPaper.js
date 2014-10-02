// this.$el.prepend(     new ProjectView()
        // '<li>' + project.get('title') + '</li>'
        // $('.project-list').append('<li>' + project.get('title') + '</li>');		/* ALSO: Make $('.library-list') into this.$el */





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
    new CreateToDoView({collection: toDoItems});




    this.listenTo(this.collection, 'add', function(toDoItem) {     /* not this.collection but this.createToDoView.collection... */
        new ToDoItem({model: toDoItem});
        console.log(toDoItem);




    });

  },

  // render: function () {
  //   $(this.el).html('yo');
  // }
});