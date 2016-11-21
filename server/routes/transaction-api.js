var express = require('express');
var router = express.Router();

var Transaction = require('../models/transaction.js');

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

    console.log("Transaction:Purchase(", req.body, ")");

    var purchase = new Transaction({
        transactionType: "purchase",
        symbol: req.body.symbol,
        amount: req.body.amount,
        customerEmail: req.user.email,
        pricePerStock: req.body.price
    });

    purchase.save(function (err, suc) {
        if (err) {
            return res.status(500).json({
                status: 'Error making purchase',
                err: err
            });
        }
        res.status(200).json({
            status: suc
        });
    });


});

router.get('/view', function (req, res) {

    if (!req.isAuthenticated()) {
        return res.status(401).json({
            status: "You must be logged in to veiw transactions"
        });
    }

    var query = Transaction.find({ customerEmail: req.user.email });
    query.select('symbol pricePerStock transactionType amount date');

    query.exec(function (err, transactions) {
        if (err) {
            return res.status(500).json({
                status: 'Error grabbing transactions',
                err: err
            });
        }
        console.log(transactions);
        res.status(200).json(transactions);
    });

});


module.exports = router;
