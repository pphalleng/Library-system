const { Result } = require("express-validator");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const getAllLirearains = async(req, res) => {
    const queryLibraries = await prisma.librarians.findMany();

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {}
        
    if(req.query.page || req.query.limit){
        if(endIndex < queryLibraries.length){
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
  
        results.results = queryLibraries.slice(startIndex, endIndex);
        res.paginatedResults = results;
        res.json(results);
    }else{
        res.json(queryLibraries);
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

const createNewLirarain = async (req, res) => {
    
    const { first_name, last_name, age,  date_of_birth, nid, current_address, email, password} = req.body;
    
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !nid || !current_address || !email || !password) {
        return res.status(400).json({ message: 'Name and age are required' });
        }
        
    const salt = bcrypt.genSaltSync(Math.random() * 10);
    const newLirearain = { first_name, last_name, age, date_of_birth: (new Date(date_of_birth)).toISOString(), nid, current_address, email, password: bcrypt.hashSync(password, salt),};
    console.log(newLirearain);
    
    const createLibrain = await prisma.librarians.create({
        data: newLirearain
    })
        
    res.status(201).send({
        message: 'Successfully created',
        result: createLibrain
    });
}

const getAllLirearainById = async(req, res) => {
    const { params } = req;
    const id = parseInt(params.id)
    
    const lirarain = await prisma.librarians.findUnique({
        where: {
            id: id,
        },
    });

    if (!lirarain) {
        return res.status(404).json({ message: 'librarain not found' });
    }   
    
    res.status(201).send({
        message: 'Librarain already exists',
        result: lirarain
    });
}

const updateLirearain = async(req, res) => {
    const { params } = req;
    const id = parseInt(params.id)
    const { first_name, last_name, age,  date_of_birth, nid, current_address, email} = req.body;
  
    // Simple validation
    if (!first_name || !last_name || !age || !date_of_birth || !nid || !current_address || !email) {
      return res.status(400).json({ message: 'Name and age are required' });
    }
  
    const lirarain = await prisma.librarians.update({
        where: {
            id: id,
        },
        data: {
            first_name : first_name,
            last_name : last_name,
            age : age,
            date_of_birth : (new Date(date_of_birth)).toISOString(),
            nid : nid,
            current_address : current_address,
            email : email,

        },
    });
    
  
    if (!lirarain) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.status(201).send({
        message: 'Update Success',
        results: lirarain
    });

}

const deleteLirarain = async(req, res) => {
    const { params } = req;
    const id = parseInt(params.id)
    const librarain = await prisma.librarians.delete({
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
    getAllLirearains,
    advancedSearch,
    createNewLirarain,
    getAllLirearainById,
    updateLirearain,
    deleteLirarain
}