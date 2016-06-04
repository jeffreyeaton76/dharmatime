angular.module('timer')
.directive('navDirective', function(){
    return {
      replace: false,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/nav.html'
    };
  });
