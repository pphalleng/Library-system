const { Result } = require("express-validator");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getAllMenberShipCards = async (req, res) => {
    const querymembershipCard = await prisma.membershipCards.findMany({
        include: {
            customer: true
        }
    });

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {}
    
  if(req.query.page || req.query.limit){
    if(endIndex < querymembershipCard.length){
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

    results.results = querymembershipCard.slice(startIndex, endIndex);
    res.paginatedResults = results;
    res.json(results);
  }else{
    res.json(querymembershipCard);
  }
}

const getAllMenberShipCardsList = async (req, res) => {
    const querymembershipCard = await prisma.membershipCards.findMany({
        include: {
            customer: true
        }
    });
    res.json(querymembershipCard);
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

const createNewMemberShipCard = async (req, res) => {
    const { cardholder_name, issued_date, expired_date, type} = req.body;
  
    // Simple validation
    if (!cardholder_name || !issued_date || !expired_date || !type) {
      return res.status(400).json({ message: 'Cardholder name is required' });
    }
  
    const newmembershipCard = { cardholder_name, issued_date:(new Date(issued_date)).toISOString(), expired_date: (new Date(expired_date)).toISOString(), type};
    const createmembershipCard = await prisma.membershipCards.create({
        data: newmembershipCard
    })
    
    res.status(201).send({
        message: 'Successfully created',
        result: createmembershipCard
    });
}

const getMenberShipById = async (req, res) => {
    const { params } = req;
    const id = parseInt(params.id)
    
    const membershipCard = await prisma.membershipCards.findUnique({
        where: {
            id: id,
        },
    });

    if (!membershipCard) {
        return res.status(404).json({ message: 'membershipCard not found' });
    }   
    
    res.status(201).send({
        message: 'membershipCard already exists',
        result: membershipCard
    });
}

const updateMenberShipCard = async (req, res) => {
    const { params } = req;
    const id = parseInt(params.id)
    const { cardholder_name, issued_date, expired_date, type } = req.body;
  
    // Simple validation
    if (!cardholder_name || !issued_date || !expired_date || !type) {
      return res.status(400).json({ message: 'Cardholder name is required' });
    }
  
      const membershipCard = await prisma.membershipCards.update({
        where: {
            id: id,
        },
        data: {
            cardholder_name : cardholder_name,
            issued_date : issued_date,
            expired_date : expired_date,
            type : type,
        },
    });
    

    if (!membershipCard) {
      return res.status(404).json({ message: 'membershipCard not found' });
    }

    res.status(201).send({
        message: 'Update Success',
        results: membershipCard
    });
}

const deleteMemberShipCard = async (req, res) => {
    const { params } = req;
    const id = parseInt(params.id)
    const membershipCard = await prisma.membershipCards.delete({
        where: {
            id: id,
        },
    });
    res.status(201).send(
      {
          code: 200,
          message: 'Delete Success',
    });
}

module.exports = {
    getAllMenberShipCards,
    advancedSearch,
    createNewMemberShipCard,
    getMenberShipById,
    updateMenberShipCard,
    deleteMemberShipCard,
    getAllMenberShipCardsList
    
}