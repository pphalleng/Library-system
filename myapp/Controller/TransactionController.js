const transactions = require("../Models/DataTransaction.json");

const getAllTransactions = (req, res) => {
    if(req.query.page || req.query.limit){
        res.json(res.paginatedResults);
    }else{
        res.json(transactions);
    }
}

const advancedSearch = (req, res, next) => {
    const filters = req.query; 
    const filteredUsers = transactions.filter(user => { 
    let isValid = true; 
    for (key in filters) { 
      console.log(key, user[key], filters[key]); 
      isValid = isValid && user[key] == filters[key]; 
    } 
    return isValid; 
  }); 
  res.send(filteredUsers); 
}

const getTransactionById = (req, res) => {
    const { id } = req.params;
    const transaction = transactions.find((transaction) => transaction.id === id);

    if (!transaction) {
        return res.status(404).json({ message: 'The transaction NO not found' });
    }
    
    res.json(transaction);
}

const createTransaction = (req, res) => {
    const { customer_id, librarian_id, total_amount, status, created_on, created_by, last_updated_on, last_updated_by} = req.body;
  
    // Simple validation
    if (!customer_id || !librarian_id || !total_amount || !status || !created_on || !created_by || !last_updated_on || !last_updated_by) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    const newTransaction = { id: transactions.length + 1, customer_id, librarian_id, total_amount, status, created_on, created_by, last_updated_on, last_updated_by};
    transactions.push(newTransaction);
  
    res.status(201).json(newTransaction);
}

module.exports = {
    getAllTransactions,
    advancedSearch,
    getTransactionById,
    createTransaction
}