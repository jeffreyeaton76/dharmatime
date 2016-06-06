angular.module('timer')
.directive('clockDirective', ["$interval", "sitFactory", "$state", function($interval, Sit, $state){
  return {
    templateUrl: 'assets/templates/directives/clock.html',
    replace: false,
    restrict: 'E',
    scope: {
      ngModel: '='
    },
    link: function(scope){
      var setTimer = 0;
      var revealJournal = false;
      Sit.query().$promise.then(function(sits){
        var bell = new Audio('/assets/gong-cut.mp3');
        bell.play();
        var durationSet = (sits[sits.length - 1].durationset);
        //setTimer will change in the pause function while original durationSet
        //will still be needed when the siting is over to calculate total
        setTimer = durationSet * 60;
        var start = Date.now(), diff, minutes, seconds;
        function timer() {
          // bitwise OR truncates the float
          diff = setTimer - (((Date.now() - start) / 1000) | 0);
          minutes = (diff / 60) | 0;
          seconds = (diff % 60) | 0;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          //assigns time to display in the template
          scope.clock = minutes + ":" + seconds;

          //pause & restart function
          var pause = false;
          scope.pauseTimer = function(){
            if (pause === false){
              pause = true;
              $interval.cancel(scope.timer);
              return;
            }
            if (pause === true){
              start = Date.now();
              setTimer = ((minutes * 60) + seconds);
              pause = false;
              scope.timer = $interval(timer, 1000);
            }
          };

          //saves the user's notes to db and returns to archive
          scope.saveFinal = function(){
            var record = sits[sits.length - 1];
            record.notes = scope.usernotes;
            record.duration = scope.duration;
            Sit.update({duration: record.duration, notes: record.notes});
            $state.go("sits");
          };

          //determines total elapsed time and updates user's record
          scope.stopTimer = function(){
            scope.duration = (durationSet * 60) - ((minutes * 60) + seconds);
            bell.play();
            scope.revealJournal = true;
            $interval.cancel(scope.timer);
          };
          if (diff <= 0) {
            scope.stopTimer();
          }
        }
        timer();
        scope.timer = $interval(timer, 1000);
      });
    }
  };
}]);
