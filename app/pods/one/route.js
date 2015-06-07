import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    transitionToTwo: function() {
      this.transitionTo('two');
    }
  }
});
