var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

function response_additions(err, data) {
    if (err) {
        this.json({
            error: err
        });
    }
    this.json({
        data
    });
}

console.log('orders controller');

module.exports = {
   allOrders: function(req,res){
      Order.find({}).populate('_user').populate('product').exec(function(err, orders){
         if(err){
            console.log('loading error');s
            return res.sendStatus('500');
         }else{
            console.log('successfully getting orders');
         }
         res.json(orders);
      })
   },
   allProducts: function(req,res){
      Product.find({}).exec(function(err, products){
         if(err){
            console.log('loading error');s
            return res.sendStatus('500');
         }else{
            console.log('successfully getting products');
         }
         res.json(products);
      })
   },
   newProduct: function(req,res){
      var product = new Product(req.body)
      product.save(function(err, user){
         if (err){
              res.json(err);
              console.log('issues saving a new product')
         }
         else{
            console.log('successfully added a new product')
            res.status(200).send("new product added")
         }
      })
   },
   newOrder: function(req,res){
      User.findOne({_id: req.body._user}, function(err, user){
         if(err){
            return res.sendStatus('500');
         }else{
            var order = new Order(req.body);
            order._user = user._id;
            order.save(function(err){
               user.orders.push(order);
               user.save(function(err){
                  if(err){
                     console.log('order loading error');
                     return res.sendStatus('500');
                  }else{
                     console.log('successfully added a new order');
                     res.json(order);
                  }
               })
            })
         }
      })
   },
   newComment: function(req,res){
      Message.findOne({_id: req.params.id}, function(err, message){
         if(err){
            return res.sendStatus('500');
         }else{
            var comment = new Comment(req.body);
            console.log(req.body)
            comment._message = message._id;
            User.findOne({_id: req.session.user._id},function(err, user){
               if(err){
                  return res.sendStatus('500');
               }else{
                  console.log("user",user)
                  comment._user = user._id;
                  comment.save(function(err){
                     message.comments.push(comment);
                     message.save(function(err){
                        user.comments.push(comment);
                        user.save(function(err){
                           if(err){
                              console.log('message loading error');
                              return res.sendStatus('500');
                           }else{
                              console.log('successfully added a new comment');
                              res.json(comment);
                           }
                        })
                     })
                  })
               }
            })
         }
      })
   }
   // delete: function(req,res){
   //    User.remove({_id: req.params.id}, function(err){
   //       if(err){
   //          console.log('issues deleting a user')
   //       } else {
   //          console.log("successfully deleted a user!");
   //          res.sendStatus(200);
   //       }
   //    })
   // },
   // getUser: function(req,res){
   //    User.findOne({_id: req.params.id}, function(err, user){
   //       if(err){
   //          console.log('loading error');
   //          return res.sendStatus('500');
   //       }else{
   //          console.log('successfully getting user');
   //          res.json(user);
   //       }
   //    })
   // },
   // show: function(req,res){
   //    User.findOne({_id: req.params.id}, function(err, user){
   //       if(err){
   //          console.log('loading error');
   //          return res.sendStatus('500');
   //       }else{
   //          console.log('successfully getting user');
   //          res.json(user);
   //       }
   //    })
   // }
}
