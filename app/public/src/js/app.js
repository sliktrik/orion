var app = angular.module('app', ['ngRoute', 
                                 'ngStorage', 
                                 'appControllers', 
                                 'appServices',
                                 'registerServices', 
                                 'angular-loading-bar',
                                 'angular-md5']);

var appControllers = angular.module('appControllers', []);

app.config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {

  $routeProvider.
  when('/login', {
    templateUrl: 'views/login.html',
    controller:'LoginController'
  }).
  when('/register', {
    templateUrl: 'views/register.html',
    controller:'RegistrationController'
  }).
  when('/me', {
    templateUrl: 'views/me.html',
    controller:'UserController'
  }).
  otherwise({
    redirectTo: '/me'
  });

  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
      return {
          'request': function (config) {
              config.headers = config.headers || {};
              if ($localStorage.token) {
                  config.headers.Authorization = 'Bearer ' + $localStorage.token + ' ' + $localStorage.tokenExpiry;
              }
              return config;
          },
          'responseError': function(response) {
              if(response.status === 401 || response.status === 403) {
                  $location.path('/login');
              }
              return $q.reject(response);
          }
      };
  }]);
}]);
