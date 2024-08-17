const express = require('express');
const router  = express.Router();
const {check, validationResult} = require('express-validator');

const customerController = require("../Controller/CustomerController")
const customers = require("../Models/DataCustomer.json")


// Get all Customer with pagination
router.get('/customers', customerController.listAllCustomer)

// advanced search customer
router.get('/customer', customerController.advancedSearch);

// advanced search customer
router.get('/customer/:id', customerController.getCustomerById);

// Create a new Customer
router.post('/create-customers', [check('date_of_birth').isDate()], customerController.createNewCustomer);

// Update an existing Customer by ID
router.put('/update-customers/:id', [check('date_of_birth').isDate()], customerController.updateCustomer);

// Delete a user by ID
router.delete('/delete-customers/:id', customerController.deleteCustomer);

// function get pagination
function paginatedResults(model) {
    return (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const results = {}
        if(endIndex < model.length){
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

        results.results = model.slice(startIndex, endIndex);
        res.paginatedResults = results;
        next();
    }
}
  
module.exports = router;