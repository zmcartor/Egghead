var egghead = egghead || {};

egghead.eventBus = _.extend({}, Backbone.Events);

egghead.scoreRow = Backbone.Model.extend({
  defaults: {
    "score" : 0,
    "name" : "Bonkers"
  }
});

egghead.scoreCollection = Backbone.Collection.extend({
  model: egghead.scoreRow,
  initialize: function() {
    //this.listenTo(this, "add", this.checkHighScore);
  },

  checkHighScore : function(newModel){
    this.sort();
    if(parseInt(newModel.get('score'), 10) > parseInt(this.at(0).get('score'), 10) ){
      egghead.eventBus.trigger("newHighScore", parseInt(newModel.get('score'), 10) );
    }
  },

  comparator: function(score) {
    return this.get('score');
  }

});

egghead.scoreRow = Backbone.View.extend({
  initialize: function(){
    this.render();
  },

  tagName: 'tr',

  render: function(){
    var templateString = "<td><%= score %></td><td><%= name %></td>";
    var template = _.template(templateString, this.model.toJSON());
    $(this.el).html(template);
    return this;
  }
});


$(function(){
var scoreCollection = new egghead.scoreCollection();
var socket = io.connect('http://localhost');
socket.on('newScore', function (data) {
  scoreCollection.add(data);
  scoreCollection.each(function(scoreModel) {
    var view = new egghead.scoreRow({model: scoreModel});
    console.log(view);
    $('body').append(view.el);
  });


});
});
