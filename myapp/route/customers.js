const express = require('express');
const router  = express.Router();
const {check, validationResult} = require('express-validator');

let customers = [
    { 
        id: 1, 
        first_name: 'John',
        last_name: 'Doe',
        age: 30,
        date_of_birth: '2002-01-01',
        nid_passport_number: '123456789',
        current_address: 'kompongcham',
    },
    { 
        id: 2, 
        first_name: 'Jane', 
        last_name: 'Smith',
        age: 25,
        date_of_birth: '2005-06-01',
        nid_passport_number: '987654321',
        current_address: 'kampot',
    },
];

// Get all Customer
router.get('/customers', (req, res) => {
    res.json(customers);
});

//Get customer by id
router.get('/customers/:id', (req, res) => {
    const { id } = req.params;
    const customer = customers.find((customer) => customer.id === parseInt(id));

    if (!customer) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(customer);
});


// Create a new Customer
router.post('/create-customers', [check('date_of_birth').isDate()], (req, res) => {
    const errors = validationResult(req);
    const { first_name, last_name, age,  date_of_birth, nid_passport_number, current_address} = req.body;
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !nid_passport_number || !current_address) {
      return res.status(400).json({ message: 'All fields are required, please check again to input them.' });
    }
    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(422).json({errors: errors.array()})
    }
  
    const newCustomer = { id: customers.length + 1, first_name, last_name, age, date_of_birth, nid_passport_number, current_address};
    customers.push(newCustomer);
  
    res.status(201).json(newCustomer);
});

// Update an existing Customer by ID
router.put('/update-customers/:id', [check('date_of_birth').isDate()], (req, res) => {
    const errors = validationResult(req);
    const { id } = req.params;
    const { first_name, last_name, age,  date_of_birth, nid_passport_number, current_address} = req.body;
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !nid_passport_number || !current_address) {
      return res.status(400).json({ message: 'All fields are required, please check again to input them.' });
    }
    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(422).json({errors: errors.array()})
    }
  
    const customer = customers.find((customer) => customer.id === parseInt(id));
  
    if (!customer) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    customer.first_name = first_name;
    customer.last_name = last_name;
    customer.age = age;
    customer.date_of_birth = date_of_birth;
    customer.nid_passport_number = nid_passport_number;
    customer.current_address = current_address;
  
    res.json(customer);
});

// Delete a user by ID
router.delete('/delete-customers/:id', (req, res) => {
    const { id } = req.params;
    customers = customers.filter((customer) => customer.id !== parseInt(id));
    res.sendStatus(204);
  });
  
  module.exports = router;