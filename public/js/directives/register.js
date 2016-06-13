angular.module('timer')
.directive('registerDirective', function(){
    return {
      replace: false,
      restrict: 'E',
      controller: 'assets/controllers/register-controller.js',
      controllerAs: 'vm',
      templateUrl: 'assets/templates/directives/register.html'
    };
  });
