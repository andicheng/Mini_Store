var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new mongoose.Schema({
   _user: {
      type: Schema.Types.ObjectId, ref: 'User'
   },
   product: {
      type: Schema.Types.ObjectId, ref: 'Product'
   },
   quantity: {
      type: Number,
      required: true,
   },
}, {timestamps: true});

var Message = mongoose.model('Order', OrderSchema);
