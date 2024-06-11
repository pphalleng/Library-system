const express = require('express');
const router  = express.Router();

const transactions = require("../Models/DataTransaction.json");

// Get all Transaction
router.get('/transactions', (req, res) => {
    res.json(transactions);
});

//Get transaction by id
router.get('/transactions/:id', (req, res) => {
    const { id } = req.params;
    const transaction = transactions.find((transaction) => transaction.id === id);

    if (!transaction) {
        return res.status(404).json({ message: 'The transaction NO not found' });
    }
    
    res.json(transaction);
});


// Create a new transaction
router.post('/transactions', (req, res) => {
    const { customer_id, librarian_id, total_amount, status, created_on, created_by, last_updated_on, last_updated_by} = req.body;
  
    // Simple validation
    if (!customer_id || !librarian_id || !total_amount || !status || !created_on || !created_by || !last_updated_on || !last_updated_by) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    const newTransaction = { id: transactions.length + 1, customer_id, librarian_id, total_amount, status, created_on, created_by, last_updated_on, last_updated_by};
    transactions.push(newTransaction);
  
    res.status(201).json(newTransaction);
});

  module.exports = router;