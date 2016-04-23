"use strict";
(function(){
  angular.module("timer")
  .factory("sitFactory", sitFactoryFunc)


  function sitFactoryFunc($resource){
    return $resource("/api/sits/:id")
  }
})();
