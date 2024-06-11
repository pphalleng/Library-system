const express = require('express');
const router  = express.Router();

const membershipCards = require("../Models/DataMemberShipCard.json");

// Get all membershipCard
router.get('/membershipCards', (req, res) => {
    res.json(membershipCards);
});

//Get membershipCard by id
router.get('/membershipCards/:id', (req, res) => {
    const { id } = req.params;
    const membershipCard = membershipCards.find((membershipCard) => membershipCard.id === id);

    if (!membershipCard) {
        return res.status(404).json({ message: 'The card not found' });
    }
    
    res.json(membershipCard);
});


// Create a new membershipCard
router.post('/membershipCards', (req, res) => {
    const { cardholder_name, issued_date, expired_date, type} = req.body;
  
    // Simple validation
    if (!cardholder_name || !issued_date || !expired_date || !type) {
      return res.status(400).json({ message: 'Cardholder name is required' });
    }
  
    const newmembershipCard = { id: membershipCards.length + 1, cardholder_name, issued_date, expired_date, type};
    membershipCards.push(newmembershipCard);
  
    res.status(201).json(newmembershipCard);
});

// Update an existing membershipCard by ID
router.put('/membershipCards/:id', (req, res) => {
    const { id } = req.params;
    const { cardholder_name, issued_date, expired_date, type } = req.body;
  
    // Simple validation
    if (!cardholder_name || !issued_date || !expired_date || !type) {
      return res.status(400).json({ message: 'Cardholder name is required' });
    }
  
    const membershipCard = membershipCards.find((membershipCard) => membershipCard.id === parseInt(id));
  
    if (!membershipCard) {
      return res.status(404).json({ message: 'The card not found' });
    }
  
    membershipCard.cardholder_name = cardholder_name;
    membershipCard.issued_date = issued_date;
    membershipCard.expired_date = expired_date;
    membershipCard.type = type;
  
    res.json(membershipCard);
});

// Delete a user by ID
router.delete('/membershipCards/:id', (req, res) => {
    const { id } = req.params;
    // membershipCards = membershipCards.filter((membershipCard) => membershipCard.id !== parseInt(id));
    res.sendStatus(204);
  });
  
  module.exports = router;