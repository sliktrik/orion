var app = angular.module('appServices', []);

app.factory("AuthenticationService", ['$http','$localStorage','$location', 'md5', function($http, $localStorage, $location, md5) {

  var factory = {};
  var user = {};

  factory.login = function(creds, callback) {
      
    var hashedpw = md5.createHash(creds.password);
      
    $http.get('/auth/login/' + creds.email + "/" + hashedpw).
      success(function(data) {

        if(data.type == true){
          factory.setUser(data.data)
        }

        callback(data);
      }).
      error(function(data) {
        callback(data);
      });

  }

  factory.logout = function(){

    $http.get('/auth/logout/' + user.email).
      success(function(data) {

        if(data.type == true){
          user = {};
          delete $localStorage.token;

          $location.path("/login");
        }

      }).
      error(function(data) {
        console.log(data);
      });

  }

  factory.getUserInfo = function(){

    $http.get('/auth/me/').
      success(function(data) {
        console.log(data);
      }).
      error(function(data) {
        console.log(data);
      });

  }

  factory.getUser = function(){
    return user;
  }

  factory.setUser = function(u){
    user = u;
    $localStorage.token = user.token.id;
    $localStorage.tokenExpiry = user.token.expiry;
  }

  return factory;

}]);
