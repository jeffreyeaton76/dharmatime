angular.module('timer')
.directive('navDirective', function(){
    return {
      replace: false,
      restrict: 'E',
      controller: 'navigationCtrl',
      controllerAs: 'vm',
      templateUrl: 'assets/templates/directives/nav.html'
    };
  });
