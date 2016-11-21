var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = new Schema({
    transactionType: {type: String, required: true},
    date: { type: Date, default: Date.now, required: true },
    symbol: { type: String, required: true },
    amount: { type: Number, required: true, default: 1 },
    pricePerStock: { type: Number, required: true },
    customerEmail: { type: String, required: true }
});


module.exports = mongoose.model('Transaction', Transaction);
