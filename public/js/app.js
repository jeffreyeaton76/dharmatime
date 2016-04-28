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
      template: '<h1>{{clock}}</h1>' + '<input type="button" value="Stop Timer" ng-click="stopTimer()" />',
      replace: false,
      restrict: 'E',
      link: function(scope){
        var setTimer = 0;
        Sit.query().$promise.then(function(sits){
          setTimer = sits[sits.length - 1].durationset;
          var start = Date.now(),
          diff,
          minutes,
          seconds;
          function timer() {
            // get # seconds since startTimer() was called
            diff = (setTimer * 60) - (((Date.now() - start) / 1000) | 0);
            // truncates the float
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            scope.clock = minutes + ":" + seconds;

            if (diff <= 0) {
              $interval.cancel(scope.timer);
            }
            scope.stopTimer = function(){
              scope.duration = (minutes * 60) + seconds;
              var record = sits[sits.length - 1];
              record.duration = scope.duration;
              console.log(record.duration);
              Sit.update({duration: record.duration}, function(){
              });
              $interval.cancel(scope.timer);
            };
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
      template: '<h1>DharmaTime</h1><ul><li><a ui-sref="new">New Sitting</a></li><li><a ui-sref="sits">Archive</a></li><li>Settings</li><li>About</li></ul>',
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
