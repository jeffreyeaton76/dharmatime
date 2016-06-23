angular.module('timer')
.service('authentication', authentication);

authentication.$inject = ['$http', '$window'];
function authentication ($http, $window) {

  var saveToken = function (token) {
    $window.localStorage['timer-token'] = token;
  };

  var getToken = function () {
    return $window.localStorage['timer-token'];
  };

  var isLoggedIn = function() {
    var token = getToken();
    var payload;

    if(token){
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        email : payload.email,
        name : payload.name
      };
    }
  };

  register = function(user) {
    return $http.post('/api/register', user).success(function(data){
      saveToken(data.token);
    });
  };

  login = function(user) {
    return $http.post('/api/login', user).success(function(data) {
      saveToken(data.token);
    });
  };

  logout = function() {
    $window.localStorage.removeItem('timer-token');
  };

  return {
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    currentUser : currentUser,
    register : register,
    login : login,
    logout : logout
  };
}
