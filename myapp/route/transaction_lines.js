const express = require('express');
const router  = express.Router();

const transaction_lines = require("../Models/DataTransactionLine.json");

// Get all transaction_line
router.get('/transaction_lines', (req, res) => {
    res.json(transaction_lines);
});

//Get transaction_line by id
router.get('/transaction_lines/:id', (req, res) => {
    const { id } = req.params;
    const transaction_line = transaction_lines.find((transaction_line) => transaction_line.id === id);

    if (!transaction_line) {
        return res.status(404).json({ message: 'The transaction_line not found' });
    }
    
    res.json(transaction_line);
});


// Create a new transaction_line
router.post('/transaction_lines', (req, res) => {
    const { transaction_id, book_id, unit_price, qty_unit, total_price} = req.body;
  
    // Simple validation
    if (!transaction_id || !book_id || !unit_price || !qty_unit || !total_price) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }
  
    const newtransaction_line = { id: transaction_lines.length + 1, transaction_id, book_id, unit_price, qty_unit, total_price};
    transaction_lines.push(newtransaction_line);
  
    res.status(201).json(newtransaction_line);
});

  module.exports = router;