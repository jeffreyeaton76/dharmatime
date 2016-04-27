"use strict";
(function(){
  angular.module("timer", ["ngResource", "ui.router"])
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
  .directive('clockDirective', ["$interval", "sitFactory", clockDirectiveFunc]);


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
    var Sit = $resource("/api/:id");
    return Sit;
  }

  function clockDirectiveFunc($interval, Sit){
    return {
      template: '<h1>{{clock}}</h1>',
      replace: false,
      restrict: 'E',
      link: function(scope){
      var setTimer;
      Sit.query().$promise.then(function(sits){
          setTimer = sits[sits.length - 1].durationset;
        });
        console.log(setTimer);
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
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
          }
        }
        timer();
        $interval(timer, 1000);
      }
    };
  }

  function sitsControllerFunc(Sit){
    this.sits = Sit.query();
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

  function indexControllerFunc(Sit){
    this.sits = Sit.query();
  }

  function sessionControllerFunc(session){
    this.session = session.query();
  }

})();
