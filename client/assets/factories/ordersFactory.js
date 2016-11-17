app.factory('ordersFactory', ['$http','$location', function($http, $location) {
   var factory = {};
   factory.getOrders = function(callback){
      $http.get('/orders').then(function(returned_data){
         callback(returned_data);
      })
   };
   factory.getProducts = function(callback){
      $http.get('/products').then(function(returned_data){
         callback(returned_data);
      })
   };
   factory.logout = function(callback){
      $http.get('/logout').then(function(res){
         callback(res);
      })
   };
   factory.newOrder = function(order, callback){
      $http.post('/newOrder', order).then(function(res){
         callback(res);
      })
   };
   factory.newProduct = function(product, callback){
      $http.post('/newProduct', product).then(function(res){
         callback(res);
      })
   };
   // factory.delete = function(user){
   //    $http.delete('/users/'+user).then(function(){
   //       console.log("user deleted")
   //    });
   // }
   return factory;
}]);
