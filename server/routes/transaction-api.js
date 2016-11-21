var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

// Registration
router.post('/purchase', function (req, res, next) {

    if (!req.isAuthenticated()) {
        return res.status(401).json({
            status: "You must be logged in to make a purchase!"
        });
    }

    req.checkBody('symbol', 'Invalid symbol').notEmpty();
    req.checkBody('amount', 'Invalid number of stock').notEmpty().isInt();
    req.checkBody('price', 'Invalid stock price').notEmpty().isInt();

    var total = req.body.amount * req.body.price;
    // if (total > req.user.balance){
    //     return res.status(500).json({
    //         status: 'Error making purchase',
    //         err: 'You don\'t have enoguh money'
    //     });
    // }

    console.log("Transaction:Purchase(", req.body, ")");

    var purchase = {
        transactionType: "purchase",
        symbol: req.body.symbol,
        amount: req.body.amount,
        pricePerStock: req.body.price
    };

    User.findById(req.user._id, function(err, user) {

        if(err){

        }

        user.update({balance: req.user.balance - total, $push: {transactions: purchase}}, function(err, count){
            //console.log("Update: err(", err,"); count(", count,"); curuser:", req.user);
            req.user.transactions.push(purchase);
            req.user.balance -= total;
        });

    });

});

router.get('/view', function (req, res) {

    if (!req.isAuthenticated()) {
        return res.status(401).json({
            status: "You must be logged in to veiw transactions"
        });
    }

    User.findById(req.user._id, function(err, user) {
        if(err){

        }
        res.status(200).json(user.transactions);
    });

});


module.exports = router;
