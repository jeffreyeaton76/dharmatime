angular.module('timer')
.directive('registerDirective', function(){
    return {
      replace: false,
      restrict: 'E',
      controller: 'registerCtrl',
      controllerAs: 'vm',
      templateUrl: 'assets/templates/directives/register.html'
    };
  });