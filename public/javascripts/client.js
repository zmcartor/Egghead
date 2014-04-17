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
    this.listenTo(this, "add", checkHighScore);
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


$(function(){
var socket = io.connect('http://localhost');
socket.on('newScore', function (data) {



});
