app.controller('UserController', ['$scope','$localStorage','AuthenticationService', function($scope,$localStorage, AuthenticationService) {

  $scope.init = function(){

    $scope.user = AuthenticationService.getUser();

    AuthenticationService.getUserInfo();

  }

  $scope.logout = function(){
    AuthenticationService.logout();
  }

  $scope.init();

}]);
