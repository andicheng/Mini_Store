app.controller('dashboardController', ['$scope','usersFactory', 'ordersFactory','$location','$routeParams', function($scope, usersFactory, ordersFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.currentUser = user;
      $location.url('/dashboard')
   });
   var getOrders = function(){
      ordersFactory.getOrders(function(returned_data){
         $scope.orders = returned_data.data;
      })
   };
   getOrders();
   var getProducts = function(){
      ordersFactory.getProducts(function(returned_data){
         $scope.products = returned_data.data;
      })
   };
   getProducts();
   var getUsers = function(){
      usersFactory.getUsers(function(returned_data){
         $scope.users = returned_data;
      })
   };
   getUsers();
   $scope.logout = function(){
      usersFactory.logout(function(data){
         console.log(data)
      });
      $location.url('/')
   };

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
