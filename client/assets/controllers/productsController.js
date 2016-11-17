app.controller('productsController', ['$scope','usersFactory', 'ordersFactory','$location','$routeParams', function($scope, usersFactory, ordersFactory, $location, $routeParams) {

   usersFactory.getUser(function(user){
      $scope.currentUser = user;
      $location.url('/products')
   });
   var getProducts = function(){
      ordersFactory.getProducts(function(returned_data){
         $scope.products = returned_data.data;
      })
   };
   getProducts();
   $scope.newProduct = function(){
      ordersFactory.newProduct($scope.product, function(data){
         if(data.data.errors){
            $scope.errors = data.data.errors;
         }else{
            $scope.product = {};
            getProducts();
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
