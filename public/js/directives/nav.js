angular.module('timer')
.directive('navDirective', function(){
    return {
      template: '<ul><li><a ui-sref="new">new sitting</a></li><li><a ui-sref="sits">archive</a></li><li><a ui-sref="about">settings</a></li><li><a ui-sref="about">about</a></li></ul>',
      replace: false,
      restrict: 'E',
    };
  });