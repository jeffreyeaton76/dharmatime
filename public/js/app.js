  angular.module("timer", ["ngResource", "ui.router"])
  .config(["$stateProvider", "$locationProvider", routerFunction
  ]);

  function routerFunction($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("index", {
      url:"/",
      templateUrl:"/assets/templates/pages/index.html"
    })
    .state("sits", {
      url:"/sits",
      templateUrl:"/assets/templates/pages/sits.html",
      controller:"sitsController",
      controllerAs:"sitsVM"
    })
    .state("new", {
      url:"/new",
      templateUrl:"/assets/templates/pages/new.html",
      controller:"newController",
      controllerAs:"newVW"
    })
    .state("about", {
      url:"/about",
      templateUrl:"/assets/templates/pages/about.html",
    })
    .state("register", {
      url:"/registration",
      templateUrl:"/assets/templates/pages/registration.html",
    })
    .state("session", {
      url:"/session",
      templateUrl:"/assets/templates/pages/session.html"
    });
  }
