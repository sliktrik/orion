app.controller('RegistrationController',['$scope','$location','RegistrationService', function($scope, $location, RegistrationService) {

  $scope.user = {};

  $scope.register = function(){

    RegistrationService.register($scope.user, function(d){
      if(d.type == true){
        $location.path("/me");
      }else{
        $scope.message = d.data;
      }
    });

  }

}]);
