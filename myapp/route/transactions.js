const express = require('express');
const router  = express.Router();

let transactions = [
    {
        id: 1, 
        customer_id: '1',
        librarian_id: '1',
        total_amount: '100$',
        status:'completed',
        created_on: '2024-06-09', 
        created_by: '1',
        last_updated_on: '2024-06-09',
        last_updated_by: '1',
    },
    { 
        id: 2, 
        customer_id: '2',
        librarian_id: '1',
        total_amount: '150$',
        status:'completed',
        created_on: '2024-06-10', 
        created_by: '1',
        last_updated_on: '2024-06-10',
        last_updated_by: '1',
    },
];

// Get all Transaction
router.get('/transactions', (req, res) => {
    res.json(transactions);
});

//Get transaction by id
router.get('/transactions/:id', (req, res) => {
    const { id } = req.params;
    const transaction = transactions.find((transaction) => transaction.id === parseInt(id));

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
  
    const newTransaction = { id: transactions.length + 1, first_name, last_name, age, date_of_birth, id_card_number, current_address};
    transactions.push(newTransaction);
  
    res.status(201).json(newTransaction);
});

  module.exports = router;