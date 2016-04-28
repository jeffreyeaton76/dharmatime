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
  .controller("sessionController", ["sitFactory", sessionControllerFunc])
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
      // controller:"aboutController",
      // controllerAs:"aboutVW"
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
      template: '<h1>{{clock}}</h1>' + '<input type="button" value="Pause/Resume" ng-click="pauseTimer()" />' + '<input type="button" value="Stop Timer" ng-click="stopTimer()" />',
      replace: false,
      restrict: 'E',
      link: function(scope){
        var setTimer = 0;
        Sit.query().$promise.then(function(sits){
          var bell = new Audio('/assets/gong.wav');
          bell.play();
          setTimer = (sits[sits.length - 1].durationset) * 60;
          var start = Date.now(),
          diff,
          minutes,
          seconds;
          var pause = false;
          var postPause;
          function timer() {
            diff = setTimer - (((Date.now() - start) / 1000) | 0);
            // truncates the float
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            scope.clock = minutes + ":" + seconds;

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

            scope.stopTimer = function(){
              scope.duration = setTimer - ((minutes * 60) + seconds);
              var record = sits[sits.length - 1];
              record.duration = scope.duration;
              Sit.update({duration: record.duration}, function(){
              });
              bell.play();
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

  timer.filter('formatTimer', function () {
    return function (input) {
      function z(n) { return (n < 10 ? '0' : '') + n; }
      var seconds = input % 60;
      var minutes = Math.floor(input % 3600 / 60);
      return (z(minutes) + ' minutes and ' + z(seconds) + ' seconds');
    };
  });

  function indexControllerFunc(Sit){
    this.sits = Sit.query();
  }

  function sessionControllerFunc(session){
    this.session = session.query();
  }

})();
