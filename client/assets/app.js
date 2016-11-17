var app = angular.module('myApp', ['ngRoute','ngCookies']);

app.factory('loginInterceptor', ['$q','$location', function($q, $location) {
   return{
      'responseError': function(rejection){
         if(rejection.status == 401){
            $location.url('/log_reg');
         }
         return $q.reject(rejection);
      }
   }
}])

app.config(function($routeProvider, $httpProvider){
   $httpProvider.interceptors.push('loginInterceptor');
   $routeProvider
      .when('/',{
         templateUrl: 'partials/log_reg.html',
      })
      .when('/login',{
         templateUrl: 'partials/log_reg.html',
      })
      .when('/dashboard',{
         templateUrl: 'partials/dashboard.html'
      })
      .when('/products',{
         templateUrl: 'partials/products.html',
      })
      .when('/orders',{
         templateUrl: 'partials/orders.html',
      })
      .when('/customers',{
         templateUrl: 'partials/customers.html',
      })
      .otherwise({
         redirectTo: '/'
      })
});
