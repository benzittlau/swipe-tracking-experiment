import Ember from 'ember';

export default function() {
  var bothElements = this.oldElement.add(this.newElement);
  var deferred = new Ember.RSVP.defer();
  var transition = this;

  // Ensure the new element is visible
  this.newElement.css('visibility', 'visible');

  bothElements.on('mouseup', function() {deferred.resolve('mouse up');});
  bothElements.on('mousemove.swipeTransition', function(e) {trackMouseMovement(e, transition);});

  return deferred.promise.then(function() {
    bothElements.unbind('mousemove.swipeTransition');
    finalPositions(transition);
  });
}

var previousPageX;
var cumulativeOffset = 0;
function trackMouseMovement(e, transition) {
  // Initialize pageX
  previousPageX = previousPageX || e.pageX;
  if (previousPageX !== e.pageX) {
    var newElement = transition.newElement;
    var oldElement = transition.oldElement;

    cumulativeOffset = cumulativeOffset + (e.pageX - previousPageX);
    console.log("Moved by " + cumulativeOffset);
    
    // Move both elements
    var oldElementPosition = cumulativeOffset;
    var newElementPosition = parseInt(oldElement.css('width'), 10) + cumulativeOffset;
    oldElement.css('left', `${oldElementPosition}px`);
    newElement.css('left', `${newElementPosition}px`);

    // Remember our current position
    previousPageX = e.pageX;
  }
}

function finalPositions(transition) {
  var newElement = transition.newElement;
  var oldElement = transition.oldElement;

  oldElement.css('left', `${oldElement.css('width')}px`);
  newElement.css('left', `$0px`);
}
