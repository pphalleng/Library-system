const express = require('express');
const router  = express.Router();

const librarains = require("../Models/DataLirearain.json");
const librarainController = require("../Controller/LirearainController");

// Get all Librarains
router.get('/librarains/get', librarainController.getAllLirearains);

// advanced search customer
router.get('/librarain', librarainController.advancedSearch);

//Get librarain by id
router.get('/librarains/:id', librarainController.getAllLirearainById);

// Create a new Customer
router.post('/librarains/create', librarainController.createNewLirarain);

// Update an existing Customer by ID
router.put('/librarains/:id', librarainController.updateLirearain);

// Delete a user by ID
router.delete('/librarains/:id', librarainController.deleteLirarain);

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