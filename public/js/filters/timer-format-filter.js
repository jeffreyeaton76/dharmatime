angular.module("timer")
.filter('formatTimer', function () {
  return function (input) {
    function z(n) { return (n < 10 ? '0' : '') + n; }
    var seconds = input % 60;
    var minutes = Math.floor(input % 3600 / 60);
    return (z(minutes) + ' minutes and ' + z(seconds) + ' seconds');
  };
});
