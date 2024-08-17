// const customers = require("../Models/DataCustomer.json")
const { Result } = require("express-validator");
const {check, validationResult} = require('express-validator');
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


const listAllCustomer = async (req, res) => {
    const querycustomer = await prisma.customers.findMany();
    
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {}
        
    if(req.query.page || req.query.limit){
        if(endIndex < querycustomer.length){
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
  
        results.results = querycustomer.slice(startIndex, endIndex);
        res.paginatedResults = results;
        res.json(results);
    }else{
        res.json(querycustomer);
    }
}

const advancedSearch = (req, res, next) => {
    const filters = req.query; 
    const filteredUsers = customers.filter(user => { 
    let isValid = true; 
    for (key in filters) { 
      console.log(key, user[key], filters[key]); 
      isValid = isValid && user[key] == filters[key]; 
    } 
    return isValid; 
  }); 
  res.send(filteredUsers); 
}

const getCustomerById = async (req, res) => {
    const { params } = req;
    const id = parseInt(params.id)

    const customer = await prisma.customers.findUnique({
        where: {
            id: id,
        },
    });
    if (!customer) {
        return res.status(404).json({ message: 'customer not found' });
    }
    
    res.status(201).send({
        message: 'customer already exists',
        result: customer
    });
}

const createNewCustomer = async (req, res) => {
    const errors = validationResult(req);
    const { membership_card_id, first_name, last_name, age,  date_of_birth, nid, current_address} = req.body;
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !nid || !current_address) {
      return res.status(400).json({ message: 'All fields are required, please check again to input them.' });
    }
  
    const newCustomer = { membership_card_id, first_name, last_name, age, date_of_birth: (new Date(date_of_birth)).toISOString(), nid, current_address};
    const createCustomer = await prisma.customers.create({
        data: newCustomer
    })
        
    res.status(201).send({
        message: 'Successfully created',
        result: createCustomer
    });
}

const updateCustomer = async (req, res) => {
    // const errors = validationResult(req);
    const { params } = req;
    const id = parseInt(params.id)
    const { membership_card_id, first_name, last_name, age,  date_of_birth, nid, current_address} = req.body;
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !nid || !current_address) {
      return res.status(400).json({ message: 'All fields are required, please check again to input them.' });
    }
    // if(!errors.isEmpty()){
    //     return res.status(422).json({errors: errors.array()})
    // }
    
    const customer = await prisma.customers.update({
        where: {
            id: id,
        },
        data: {
            first_name : first_name,
            last_name : last_name,
            age : age,
            date_of_birth : date_of_birth,
            nid : nid,
            current_address : current_address,
            membership_card_id : membership_card_id
        },
    });
    
    console.log(customer);
    if (!customer) {
      return res.status(404).json({ message: 'User not found' });
    }

  
    res.status(201).send({
        message: 'Update Success',
        results: customer
    });
}

const deleteCustomer = async (req, res) => {
    const { params } = req;
    const id = parseInt(params.id)
    console.log(id);
    const customer = await prisma.customers.delete({
        where: {
            id: id,
        },
    });
    res.status(201).send(
    {
        code: 200,
        message: 'Delete Success',
    });
}


module.exports = {
    listAllCustomer,
    advancedSearch,
    getCustomerById,
    createNewCustomer,
    updateCustomer,
    deleteCustomer

}