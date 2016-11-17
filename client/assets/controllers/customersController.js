app.controller('customersController', ['$scope','usersFactory', 'ordersFactory','$location','$routeParams', function($scope, usersFactory, ordersFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.currentUser = user;
      $location.url('/customers')
   });
   var getUsers = function(){
      usersFactory.getUsers(function(returned_data){
         $scope.users = returned_data;
      })
   };
   getUsers();
   $scope.logout = function(){
      usersFactory.logout(function(data){
      });
      $location.url('/login')
   }
   // var index = function(){
   //    usersFactory.index(function(returnedData){
   //       $scope.users = returnedData;
   //    });
   // };
   // $scope.delete = function(id){
   //    usersFactory.delete(id);
   //    index();
   // }
   // $scope.show = function(){
   //    usersFactory.show($routeParams.user, function(data){
   //       $scope.user = data;
   //    });
   // }
}]);
