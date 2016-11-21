// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

// User entry
var User = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

User.methods.encryptPassword = function(password){
    console.log("encrypt: ", password);
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

User.methods.validPassword = function(password){
    console.log('lets try this', password, this.password);
    var valid = bcrypt.compareSync(password, this.password);
    console.log("valid: ", password, valid);
    return valid;
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
