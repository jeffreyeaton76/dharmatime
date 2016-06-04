angular.module('timer')
.factory("sitFactory", function($resource){
    var Sit = $resource("/api/:id", {}, {
      update: {method: "PUT"}
    });
    return Sit;
  });
