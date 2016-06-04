  angular.module("timer", ["ngResource", "ui.router"])
  .config([
    "$stateProvider",
    "$locationProvider",
    routerFunction
  ])
  .factory("sitFactory", sitFactoryFunc)
  .controller("bodyController", ["$scope", bodyControllerFunc])
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  })
  .filter('formatTimer', function () {
    return function (input) {
      function z(n) { return (n < 10 ? '0' : '') + n; }
      var seconds = input % 60;
      var minutes = Math.floor(input % 3600 / 60);
      return (z(minutes) + ' minutes and ' + z(seconds) + ' seconds');
    };
  });

  function routerFunction($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("index", {
      url:"/",
      templateUrl:"/assets/html/index.html"
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
      templateUrl:"/assets/html/session.html"
    });
  }

  function sitFactoryFunc($resource){
    var Sit = $resource("/api/:id", {}, {
      update: {method: "PUT"}
    });
    return Sit;
  }

  function bodyControllerFunc($scope){
    $scope.bodyStyle = {background: "url(assets/images/bridge.jpg) no-repeat center center fixed"};
  }
