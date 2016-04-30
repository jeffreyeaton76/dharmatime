"use strict";
(function(){
  var timer = angular.module("timer", ["ngResource", "ui.router"])
  .config([
    "$stateProvider",
    "$locationProvider",
    routerFunction
  ])
  .factory("sitFactory", sitFactoryFunc)
  .controller("sitsController", ["sitFactory", sitsControllerFunc])
  .controller("indexController", ["sitFactory", indexControllerFunc])
  .controller("newController", ["sitFactory", "$state", newControllerFunc])
  .controller("sessionController", ["$scope", sessionControllerFunc])
  .directive('clockDirective', ["$interval", "sitFactory", clockDirectiveFunc])
  .directive('navDirective', navDirectiveFunc);

  function routerFunction($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("index", {
      url:"/",
      templateUrl:"/assets/html/index.html",
      controller:"indexController",
      controllerAs:"indexVM"
    })
    .state("sits", {
      url:"/sits",
      templateUrl:"/assets/html/sits.html",
      controller:"sitsController",
      controllerAs:"sitsVM"
    })
    .state("new", {
      url:"/new",
      templateUrl:"/assets/html/new.html",
      controller:"newController",
      controllerAs:"newVW"
    })
    .state("about", {
      url:"/about",
      templateUrl:"/assets/html/about.html",
    })
    .state("session", {
      url:"/session",
      templateUrl:"/assets/html/session.html",
      controller:"sessionController",
      controllerAs:"sessionVM"
    });
  }

  function sitFactoryFunc($resource){
    var Sit = $resource("/api/:id", {}, {
      update: {method: "PUT"}
    });
    return Sit;
  }

  function clockDirectiveFunc($interval, Sit){
    return {
      template: '<h1>{{clock}}</h1>' + '<input type="button" class="button" value="Pause/Resume" ng-click="pauseTimer()" />' + '<input type="button" class="button" id="stop-button" value="Stop Timer" ng-click="stopTimer()" />',
      replace: false,
      restrict: 'E',
      link: function(scope){
        var setTimer = 0;
        Sit.query().$promise.then(function(sits){
          var bell = new Audio('/assets/gong.wav');
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

            //determines total elapsed time and updates user's record
            scope.stopTimer = function(){
              scope.duration = (durationSet * 60) - ((minutes * 60) + seconds);
              var record = sits[sits.length - 1];
              record.duration = scope.duration;
              Sit.update({duration: record.duration}, function(){
              });
              bell.play();
              scope.endClock = "off";
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
  }

  function newControllerFunc(Sit, $state){
    var newVM = this;
    newVM.new_sit = new Sit();
    newVM.create = function(){
      newVM.new_sit.$save().then(function(response){
        $state.go("session");
      });
    };
  }

  function navDirectiveFunc(){
    return {
      template: '<h1><a ui-sref="index">DharmaTime</a></h1><ul><li><a ui-sref="new">New Sitting</a></li><li><a ui-sref="sits">Archive</a></li><li>Settings</li><li><a ui-sref="about">About</a></li></ul>',
      replace: false,
      restrict: 'E',
    };
  }

  function sitsControllerFunc(Sit){
    this.sits = Sit.query();
  }

  //converts a number of seconds into 00:00 format
  timer.filter('formatTimer', function () {
    return function (input) {
      function z(n) { return (n < 10 ? '0' : '') + n; }
      var seconds = input % 60;
      var minutes = Math.floor(input % 3600 / 60);
      return (z(minutes) + ' minutes and ' + z(seconds) + ' seconds');
    };
  });

  //displays recent record first in archive
  timer.filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });

  function indexControllerFunc(Sit){
    this.sits = Sit.query();
  }

  function sessionControllerFunc($scope){
    var sessionVM = this;
    sessionVM.clock = $scope.endClock;
  }

})();
