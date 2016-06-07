angular.module('timer')
.directive('registerDirective', function(){
    return {
      replace: false,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/register.html'
    };
  });
