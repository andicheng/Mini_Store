app.controller('ordersController', ['$scope','usersFactory', 'ordersFactory','$location','$routeParams', function($scope, usersFactory, ordersFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.currentUser = user;
      $location.url('/orders')
   });
   var getOrders = function(){
      ordersFactory.getOrders(function(returned_data){
         $scope.orders = returned_data.data;
      })
   };
   getOrders();
   var getUsers = function(){
      usersFactory.getUsers(function(returned_data){
         $scope.users = returned_data;
      })
   };
   getUsers();
   var getProducts = function(){
      ordersFactory.getProducts(function(returned_data){
         $scope.products = returned_data.data;
      })
   };
   getProducts();
   $scope.newOrder = function(){
      console.log($scope.order);
      ordersFactory.newOrder($scope.order, function(data){
         if(data.data.errors){
            $scope.errors = data.data.errors;
         }else{
            $scope.order = {};
            getOrders();
         }
      })
   }
   $scope.logout = function(){
      usersFactory.logout(function(data){
         console.log(data)
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
