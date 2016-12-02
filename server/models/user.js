// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

// User entry
var User = new Schema({

    // Basic user information
    email: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
    
    // For making stock purchases and sales
    transactions: [{
        transactionType: { type: String, required: true },
        date: { type: Date, default: Date.now, required: true },
        symbol: { type: String, required: true },
        amount: { type: Number, required: true, default: 1 },
        pricePerStock: { type: Number, required: true },
    }],

    // For depositing and withdrawing money
    checking: [{
        date: { type: Date, default: Date.now, required: true },
        checkingType: { type: String, required: true },
        amount: { type: Number, required: true, default: 1 }
    }]
});

User.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

User.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

User.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('User', User);
