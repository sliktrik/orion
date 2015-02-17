app.controller('LoginController',['$scope','$location','AuthenticationService', function($scope, $location, AuthenticationService) {

  $scope.user = {};

  $scope.login = function(){

    AuthenticationService.login($scope.user, function(d){
      if(d.type == true){
        $location.path("/me");
      }else{
        $scope.message = d.data;
      }
    });

  }

}]);
