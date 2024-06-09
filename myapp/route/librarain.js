const express = require('express');
const router  = express.Router();

let librarains = [
    { 
        id: 1, 
        first_name: 'lami',
        last_name: 'cropio',
        age: 30,
        date_of_birth: '2002-02-03',
        id_card_number: '1123449999',
        current_address: 'preyveng',
    },
    { 
        id: 2, 
        first_name: 'yu', 
        last_name: 'mi',
        age: 25,
        date_of_birth: '2005-06-23',
        id_card_number: '8888888333',
        current_address: 'komongspue',
    },
];

// Get all Librarains
router.get('/librarains', (req, res) => {
    res.json(librarains);
});

//Get librarain by id
router.get('/librarains/:id', (req, res) => {
    const { id } = req.params;
    const lirarain = librarains.find((lirarain) => lirarain.id === parseInt(id));

    if (!lirarain) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(lirarain);
});


// Create a new Customer
router.post('/librarains', (req, res) => {
    const { first_name, last_name, age,  date_of_birth, id_card_number, current_address} = req.body;
  
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !id_card_number || !current_address) {
      return res.status(400).json({ message: 'Name and age are required' });
    }
  
    const newLirearain = { id: librarains.length + 1, first_name, last_name, age, date_of_birth, id_card_number, current_address};
    librarains.push(newLirearain);
  
    res.status(201).json(newLirearain);
});

// Update an existing Customer by ID
router.put('/librarains/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, age,  date_of_birth, id_card_number, current_address} = req.body;
  
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !id_card_number || !current_address) {
      return res.status(400).json({ message: 'Name and age are required' });
    }
  
    const lirarain = librarains.find((lirarain) => lirarain.id === parseInt(id));
  
    if (!lirarain) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    lirarain.first_name = first_name;
    lirarain.last_name = last_name;
    lirarain.age = age;
    lirarain.date_of_birth = date_of_birth;
    lirarain.id_card_number = id_card_number;
    lirarain.current_address = current_address;
  
    res.json(lirarain);

});

// Delete a user by ID
router.delete('/librarains/:id', (req, res) => {
    const { id } = req.params;
    librarains = librarains.filter((lirarain) => lirarain.id !== parseInt(id));
    res.sendStatus(204);
  });
  
  module.exports = router;