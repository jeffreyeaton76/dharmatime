//sets the background image for the app's body

angular.module('timer')
.controller("bodyController", ["$scope", function($scope){
    $scope.bodyStyle = {background: "url(assets/images/bridge.jpg) no-repeat center center fixed"};
  }
]);
