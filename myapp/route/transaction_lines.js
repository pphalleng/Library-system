const express = require('express');
const router  = express.Router();

const transaction_lines = require("../Models/DataTransactionLine.json");
const transactionLineController = require("../Controller/TransactionLineController");


// Get all transaction_line
router.get('/transaction_lines', transactionLineController.getAllTransactionLines);

router.get('/transaction_line', transactionLineController.advancedSearch);

//Get transaction_line by id
router.get('/transaction_lines/:id', transactionLineController.createTransactionLineByID);


// Create a new transaction_line
router.post('/transaction_lines', transactionLineController.createTransactionLine);

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