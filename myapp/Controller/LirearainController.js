const librarains = require("../Models/DataLirearain.json");

const getAllLirearains = (req, res) => {
    if(req.query.page || req.query.limit){
        res.json(res.paginatedResults);
    }else{
        res.json(librarains);
    }
}

const advancedSearch = (req, res, next) => {
    const filters = req.query; 
    const filteredUsers = librarains.filter(user => { 
    let isValid = true; 
    for (key in filters) { 
      console.log(key, user[key], filters[key]); 
      isValid = isValid && user[key] == filters[key]; 
    } 
    return isValid; 
  }); 
  res.send(filteredUsers); 
}

const createNewLirarain = (req, res) => {
    const { first_name, last_name, age,  date_of_birth, nId_passport_number, current_address} = req.body;
    
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !nId_passport_number || !current_address) {
        return res.status(400).json({ message: 'Name and age are required' });
        }
        
    const newLirearain = { id: librarains.length + 1, first_name, last_name, age, date_of_birth, nId_passport_number, current_address};
    console.log(newLirearain);
    librarains.push(newLirearain);
        
    res.status(201).json(newLirearain);
}

const getAllLirearainById = (req, res) => {
    const { id } = req.params;
    const lirarain = librarains.find((lirarain) => lirarain.id === id);

    if (!lirarain) {
        return res.status(404).json({ message: 'librarain not found' });
    }
    
    res.json(lirarain);
}

const updateLirearain = (req, res) => {
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

}

const deleteLirarain = (req, res) => {
    const { id } = req.params;
    // librarains = librarains.filter((lirarain) => lirarain.id !== parseInt(id));
    res.sendStatus(204);
}

module.exports = {
    getAllLirearains,
    advancedSearch,
    createNewLirarain,
    getAllLirearainById,
    updateLirearain,
    deleteLirarain
}