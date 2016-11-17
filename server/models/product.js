var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new mongoose.Schema({
   product: {
      type: String,
      required: true,
      trim: true,
   },
   description: {
      type: String,
   },
   inventory: {
      type: Number,
      required: true,
   },
   url: {
      type: String,
   },
   orders: [{
      type: Schema.Types.ObjectId, ref: 'Order'
   }]
}, {timestamps: true});

var Product = mongoose.model('Product', ProductSchema);
