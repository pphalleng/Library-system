const customers = require("../Models/DataCustomer.json")
const {check, validationResult} = require('express-validator');


const listAllCustomer = (req, res) => {
    if(req.query.page || req.query.limit){
        res.json(res.paginatedResults);
    }else{
        res.json(customers);
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

const getCustomerById = (req, res) => {
    const { id } = req.params;
    const customer = customers.find((customer) => customer.id === id);

    if (!customer) {
        return res.status(404).json({ message: 'customer not found' });
    }
    
    res.json(customer);
}

const createNewCustomer = (req, res) => {
    const errors = validationResult(req);
    const { membership_card_id, first_name, last_name, age,  date_of_birth, nid_passport_number, current_address} = req.body;
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !nid_passport_number || !current_address) {
      return res.status(400).json({ message: 'All fields are required, please check again to input them.' });
    }
    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(422).json({errors: errors.array()})
    }
  
    const newCustomer = { id: customers.length + 1, membership_card_id, first_name, last_name, age, date_of_birth, nid_passport_number, current_address};
    customers.push(newCustomer);
  
    res.status(201).json(newCustomer);
}

const updateCustomer = (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;
    const { membership_card_id, first_name, last_name, age,  date_of_birth, nid_passport_number, current_address} = req.body;
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !nid_passport_number || !current_address) {
      return res.status(400).json({ message: 'All fields are required, please check again to input them.' });
    }
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    
    const customer = customers.find((customer) => customer.id === id);
    
    console.log(customer);
    if (!customer) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    customer.membership_card_id = membership_card_id;
    customer.first_name = first_name;
    customer.last_name = last_name;
    customer.age = age;
    customer.date_of_birth = date_of_birth;
    customer.nid_passport_number = nid_passport_number;
    customer.current_address = current_address;
  
    res.json(customer);
}

const deleteCustomer = (req, res) => {
    const {id} = req.params;
    console.log(id);
    // customers = customers.find((customer) => customer.id !== id);
    res.sendStatus(204);
}


module.exports = {
    listAllCustomer,
    advancedSearch,
    getCustomerById,
    createNewCustomer,
    updateCustomer,
    deleteCustomer

}