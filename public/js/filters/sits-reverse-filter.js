angular.module("timer")
.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
