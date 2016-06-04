angular.module('timer')
.directive('clockDirective', ["$interval", "sitFactory", "$state", function($interval, Sit, $state){
    return {
      template: '<h1>{{clock}}</h1>' + '<input type="button" class="button" id="pause-button" value="Pause/Resume" ng-click="pauseTimer()" />' + '<input type="button" class="button" id="stop-button" value="End Session" ng-click="stopTimer()" />' + '<br>',
      replace: false,
      restrict: 'E',
      link: function(scope){
        var setTimer = 0;
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

            scope.revealJouranl = function(){
              var container = document.getElementById("clock");
              var input = document.createElement("textarea");
              var label = document.createElement("label");
              label.appendChild(document.createTextNode('Notes:'));
              input.className = "notes";
              input.name = "notes";
              container.appendChild(label);
              container.appendChild(input);
              var btn = document.createElement("button");
              var t = document.createTextNode("Save/Return");
              btn.className = "button";
              btn.appendChild(t);
              container.appendChild(btn);
              btn.addEventListener("click", function(e){
                e.preventDefault();
                var record = sits[sits.length - 1];
                record.notes = input.value;
                record.duration = scope.duration;
                Sit.update({duration: record.duration, notes: record.notes}, function(){
                });
                $state.go("sits");
              });
            };

            //determines total elapsed time and updates user's record
            scope.stopTimer = function(){
              scope.duration = (durationSet * 60) - ((minutes * 60) + seconds);
              bell.play();
              scope.revealJouranl();
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
