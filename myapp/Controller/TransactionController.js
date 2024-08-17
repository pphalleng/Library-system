const { Prisma } = require("@prisma/client");
const {PrismaClient} = require("@prisma/client");
const { Result } = require("express-validator");
const prisma = new PrismaClient();

const getAllTransactions = async (req, res) => {
    const querytransaction = await prisma.transactions.findMany();

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {}
    
    if(req.query.page || req.query.limit){
        if(endIndex < querytransaction.length){
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

        results.results = querytransaction.slice(startIndex, endIndex);
        res.paginatedResults = results;
        res.json(results);
    }else{
        res.json(querytransaction);
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

const getTransactionById = async (req, res) => {
    const { params } = req;
    const id = parseInt(params.id)
    const transaction = await prisma.transactions.findUnique({
        where: {
            id: id,
        }
    })

    if (!transaction) {
        return res.status(404).json({ message: 'The transaction NO not found' });
    }
    
    res.status(201).send({
        message: 'Librarain already exists',
        result: transaction
    })
}

const createTransaction = async (req, res) => {
    const { customer_id, total_amount, status, created_on, created_by, last_updated_on, last_updated_by} = req.body;
  
    // Simple validation
    if (!customer_id || !total_amount || !status || !created_on || !created_by || !last_updated_on || !last_updated_by) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    const newTransaction = { customer_id, total_amount, status, created_on, created_by, last_updated_on, last_updated_by};
    const createTransaction = await prisma.transactions.create({
        data: newTransaction
    })
    res.status(201).send({
        message: 'Transaction created successfully',
        result: createTransaction
    });
}

module.exports = {
    getAllTransactions,
    advancedSearch,
    getTransactionById,
    createTransaction
}