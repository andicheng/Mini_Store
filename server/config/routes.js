var mongoose = require('mongoose');
var users = require('./../controllers/users.js');
var orders = require('./../controllers/orders.js');

module.exports = function(app){
   app.post('/users/registration', users.register);
   app.post('/users/login', users.login);
   app.use(userAuth);
   app.get('/currentUser', users.getCurrent);
   app.get('/logout', users.logout);
   app.get('/allUsers', users.allUsers);
   app.get('/orders', orders.allOrders);
   app.get('/products', orders.allProducts);
   app.post('/newOrder', orders.newOrder);
   app.post('/newProduct', orders.newProduct);
}

//userAuth middleware
function userAuth(req,res,next){
	if (req.session.user){
		next();
	}else{
		res.sendStatus(401);
	}
}
