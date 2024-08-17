const express = require('express');
const router  = express.Router();

const transactions = require("../Models/DataTransaction.json");
const TransactionController = require("../Controller/TransactionController");


// Get all Transaction
router.get('/transactions', TransactionController.getAllTransactions);

router.get('/transaction', TransactionController.advancedSearch);

//Get transaction by id
router.get('/transactions/:id', TransactionController.getTransactionById);

// Create a new transaction
router.post('/transactions', TransactionController.createTransaction);

// function get pagination
function paginatedResults(model) {
    return (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const results = {}
        if(endIndex < model.length){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if(startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
  
        results.results = model.slice(startIndex, endIndex);
        res.paginatedResults = results;
        next();
    }
}

module.exports = router;