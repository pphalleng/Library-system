const { Result } = require("express-validator");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTransactionLines = async (req, res) => {
    const querytransactionLine = await prisma.transactionLines.findMany();

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {}
        
    if(req.query.page || req.query.limit){
        if(endIndex < querytransactionLine.length){
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
  
        results.results = querytransactionLine.slice(startIndex, endIndex);
        res.paginatedResults = results;
        res.json(results);
    }else{
        res.json(querytransactionLine);
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

const createTransactionLineByID = async (req, res) => {
    const { params } = req;
    const id = parseInt(params.id)

    const transactionLine = await prisma.transactionLines.findUnique({
            where: {
                id: id,
            },
        });
    if (!transactionLine) {
        return res.status(404).json({ message: 'The transaction_line not found' });
    }
    
    res.status(201).send({
        message: 'TransactionLine already exists',
        result: transactionLine
    });
}

const createTransactionLine = async(req, res) => {
    const { transaction_id, book_id, unit_price, qty_unit, total_price} = req.body;
  
    // Simple validation
    if (!transaction_id || !book_id || !unit_price || !qty_unit || !total_price) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }
  
    const newtransaction_line = { transaction_id, book_id, unit_price, qty_unit, total_price};
    const createtransactionLine = await prisma.transactionLines.create({
        data: newtransaction_line
    })
  
    res.status(201).send({
        message: 'TransactionLine created successfully',
        result: createtransactionLine
    });
}


module.exports = {
    getAllTransactionLines,
    advancedSearch,
    createTransactionLineByID,
    createTransactionLine
}