const membershipCards = require("../Models/DataMemberShipCard.json");

const getAllMenberShipCards = (req, res) => {
      if(req.query.page || req.query.limit){
        res.json(res.paginatedResults);
      }else{
          res.json(membershipCards);
      }
}

const advancedSearch = (req, res, next) => {
    const filters = req.query; 
    const filteredUsers = membershipCards.filter(user => { 
    let isValid = true; 
    for (key in filters) { 
      console.log(key, user[key], filters[key]); 
      isValid = isValid && user[key] == filters[key]; 
    } 
    return isValid; 
  }); 
  res.send(filteredUsers); 
}

const createNewMemberShipCard = (req, res) => {
    const { cardholder_name, issued_date, expired_date, type} = req.body;
  
    // Simple validation
    if (!cardholder_name || !issued_date || !expired_date || !type) {
      return res.status(400).json({ message: 'Cardholder name is required' });
    }
  
    const newmembershipCard = { id: membershipCards.length + 1, cardholder_name, issued_date, expired_date, type};
    membershipCards.push(newmembershipCard);
  
    res.status(201).json(newmembershipCard);
}

const getMenberShipById = (req, res) => {
    const { id } = req.params;
    const membershipCard = membershipCards.find((membershipCard) => membershipCard.id === id);

    if (!membershipCard) {
        return res.status(404).json({ message: 'The card not found' });
    }
    
    res.json(membershipCard);
}

const updateMenberShipCard = (req, res) => {
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
}

const deleteMemberShipCard = (req, res) => {
    const { id } = req.params;
    // membershipCards = membershipCards.filter((membershipCard) => membershipCard.id !== parseInt(id));
    res.sendStatus(204);
}

module.exports = {
    getAllMenberShipCards,
    advancedSearch,
    createNewMemberShipCard,
    getMenberShipById,
    updateMenberShipCard,
    deleteMemberShipCard
}