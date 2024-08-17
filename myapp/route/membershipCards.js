const express = require('express');
const router  = express.Router();

const membershipCards = require("../Models/DataMemberShipCard.json");
const membershipCardController = require("../Controller/MemberShipCardController");

// Get all membershipCard
router.get('/membershipCards', membershipCardController.getAllMenberShipCards);

// Get all membershipCard
router.get('/membershipCards/list', membershipCardController.getAllMenberShipCardsList);

router.get('/membershipCard', membershipCardController.advancedSearch);

//Get membershipCard by id
router.get('/membershipCards/:id', membershipCardController.getMenberShipById);

// Create a new membershipCard
router.post('/membershipCards', membershipCardController.createNewMemberShipCard);

// Update an existing membershipCard by ID
router.put('/membershipCards/:id', membershipCardController.updateMenberShipCard);

// Delete a user by ID
router.delete('/membershipCards/:id', membershipCardController.deleteMemberShipCard);

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