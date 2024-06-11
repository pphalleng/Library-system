const express = require('express');
const router  = express.Router();

const librarains = require("../Models/DataLirearain.json");

// Get all Librarains
router.get('/librarains', (req, res) => {
    res.json(librarains);
});

//Get librarain by id
router.get('/librarains/:id', (req, res) => {
    const { id } = req.params;
    const lirarain = librarains.find((lirarain) => lirarain.id === id);

    if (!lirarain) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(lirarain);
});


// Create a new Customer
router.post('/librarains', (req, res) => {
    const { first_name, last_name, age,  date_of_birth, nId_passport_number, current_address} = req.body;
  
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !nId_passport_number || !current_address) {
      return res.status(400).json({ message: 'Name and age are required' });
    }
  
    const newLirearain = { id: librarains.length + 1, first_name, last_name, age, date_of_birth, nId_passport_number, current_address};
    librarains.push(newLirearain);
  
    res.status(201).json(newLirearain);
});

// Update an existing Customer by ID
router.put('/librarains/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, age,  date_of_birth, nId_passport_number, current_address} = req.body;
  
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !nId_passport_number || !current_address) {
      return res.status(400).json({ message: 'Name and age are required' });
    }
  
    const lirarain = librarains.find((lirarain) => lirarain.id === id);
  
    if (!lirarain) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    lirarain.first_name = first_name;
    lirarain.last_name = last_name;
    lirarain.age = age;
    lirarain.date_of_birth = date_of_birth;
    lirarain.nId_passport_number = nId_passport_number;
    lirarain.current_address = current_address;
  
    res.json(lirarain);

});

// Delete a user by ID
router.delete('/librarains/:id', (req, res) => {
    const { id } = req.params;
    // librarains = librarains.filter((lirarain) => lirarain.id !== parseInt(id));
    res.sendStatus(204);
  });
  
  module.exports = router;