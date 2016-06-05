angular.module('timer')
.directive('logoDirective', function(){
    return {
      replace: false,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/logo-circle.html'
    };
  });
