var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

router.post('/deposit', function (req, res, next) {

    if (!req.isAuthenticated()) {
        return res.status(401).json({
            status: "You must be logged in to make a deposit!"
        });
    }

    req.checkBody('amount', 'Invalid number of stock').notEmpty().isInt();

    console.log("Transaction:Deposit(", req.body, ")");

    var check = {
        checkingType: "deposit",
        amount: Math.abs(req.body.amount)
    };

    User.findById(req.user._id, function(err, user) {

        if(err){
            return res.status(500).json({
                status: err
            });
        }

        user.update({balance: req.user.balance + check.amount, $push: {checking: check}}, function(err, count){
            if(err){
                return res.status(500).json({
                    status: err
                });
            }
            req.user.checking.push(check);
            req.user.balance += check.amount;
            res.status(200).json(user.balance);
        });

    });

});


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
    if (total > req.user.balance){
        return res.status(500).json({
            status: 'Error making purchase',
            err: 'You don\'t have enoguh money'
        });
    }

    console.log("Transaction:Purchase(", req.body, ")");

    var purchase = {
        transactionType: "purchase",
        symbol: req.body.symbol,
        amount: req.body.amount,
        pricePerStock: req.body.price
    };

    User.findById(req.user._id, function(err, user) {

        if(err){
            return res.status(500).json({
                status: err
            });
        }

        user.update({balance: req.user.balance - total, $push: {transactions: purchase}}, function(err, count){
            if(err){
                return res.status(500).json({
                    status: err
                });
            }
            req.user.transactions.push(purchase);
            req.user.balance -= total;
             res.status(200).json(user.transactions);
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
