angular.module('timer')
.directive('logoDirective', function(){
    return {
      replace: false,
      restrict: 'E',
      controller: 'logoCircleCtrl',
      controllerAs: 'vm',
      templateUrl: 'assets/templates/directives/logo-circle.html'
    };
  });
