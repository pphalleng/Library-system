const transaction_lines = require("../Models/DataTransactionLine.json");

const getAllTransactionLines = (req, res) => {
    if(req.query.page || req.query.limit){
        res.json(res.paginatedResults);
    }else{
        res.json(transaction_lines);
    }
}

const advancedSearch = (req, res, next) => {
    const filters = req.query; 
    const filteredUsers = transaction_lines.filter(user => { 
    let isValid = true; 
    for (key in filters) { 
      console.log(key, user[key], filters[key]); 
      isValid = isValid && user[key] == filters[key]; 
    } 
    return isValid; 
  }); 
  res.send(filteredUsers); 
}

const createTransactionLineByID = (req, res) => {
    const { id } = req.params;
    const transaction_line = transaction_lines.find((transaction_line) => transaction_line.id === id);

    if (!transaction_line) {
        return res.status(404).json({ message: 'The transaction_line not found' });
    }
    
    res.json(transaction_line);
}

const createTransactionLine = (req, res) => {
    const { transaction_id, book_id, unit_price, qty_unit, total_price} = req.body;
  
    // Simple validation
    if (!transaction_id || !book_id || !unit_price || !qty_unit || !total_price) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }
  
    const newtransaction_line = { id: transaction_lines.length + 1, transaction_id, book_id, unit_price, qty_unit, total_price};
    transaction_lines.push(newtransaction_line);
  
    res.status(201).json(newtransaction_line);
}


module.exports = {
    getAllTransactionLines,
    advancedSearch,
    createTransactionLineByID,
    createTransactionLine
}