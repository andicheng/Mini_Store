var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
   first_name: {
      type: String,
      required: true,
      trim: true,
   },
   last_name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 255,
      set: encryptPassword,
      // validate: [{
      //    validator: function(value){
      //       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
      //    },
      //    message: "Password failed validation, you must have at least 1 number, uppercase and special character"
      // }
      // ]
   },
   birthdate: {type: Date, required: true},
   orders: [{type: Schema.Types.ObjectId, ref: "Order"}]
}, {timestamps: true});

function encryptPassword(password){
   if(password && password.length >6){
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
   }
   return '';
}
// UserSchema.methods.encrypt = function(password){
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// }
//
// UserSchema.pre('save', function(done){
//    this.password = this.encrypt(this.password);
//    done();
// })

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);
