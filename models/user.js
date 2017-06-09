var mongoose = require('mongoose');
var bcrypt=require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
//密码加密
userSchema.methods.encryptPassword=function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};
//密码校验
userSchema.methods.validPassword=function(password){
  return bcrypt.compareSync(password,this.password);
};
module.exports = mongoose.model('User', userSchema);
