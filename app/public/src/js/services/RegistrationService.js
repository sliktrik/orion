var app = angular.module('registerServices', []);

app.factory("RegistrationService", ['$http','AuthenticationService', 'md5', function($http, AuthenticationService, md5) {

  var factory = {};

  factory.register = function(user, callback){
      
    var hashedpw = md5.createHash(user.password);
      
    $http.get('/auth/signup/'+user.email+"/"+hashedpw+"/"+user.username).
      success(function(data, status, headers, config) {

        if(data.type == true){
          AuthenticationService.setUser(data.data);
          callback(data);
        }
        else{
          callback(data);
        }
      }).
      error(function(data, status, headers, config) {
        console.log("error:"+data);
    });

  }

  return factory;

}]);
