angular.module('timer')
.directive('loginDirective', function(){
    return {
      replace: false,
      restrict: 'E',
      templateUrl: 'assets/templates/directives/login.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    };
  });
