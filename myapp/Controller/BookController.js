// const books = require("../Models/DataBook.json");
const { Result } = require("express-validator");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getAllBooks = async (req, res) => {
    const querybook = await prisma.books.findMany();

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {}
        
    if(req.query.page || req.query.limit){
        if(endIndex < querybook.length){
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
  
        results.results = querybook.slice(startIndex, endIndex);
        res.paginatedResults = results;
        res.json(results);
    }else{
        res.json(querybook);
    }
}

const advancedSearch = (req, res, next) => {
    const filters = req.query; 
    const filteredUsers = books.filter(user => { 
    let isValid = true; 
    for (key in filters) { 
      console.log(key, user[key], filters[key]); 
      isValid = isValid && user[key] == filters[key]; 
    } 
    return isValid; 
  }); 
  res.send(filteredUsers); 
}

const createNewBook = async (req, res) => {
    const { cover_name, published_year, category_type, barcode, status} = req.body;
  
    // Simple validation
    // if (!cover_name || !published_year || !category_type || !barcode || !status) {
    //   return res.status(400).json({ message: 'Bookt itle are required' });
    // }
  
    const newBook = {cover_name, published_year, category_type, barcode, status};
    
    const createBook = await prisma.books.create({
        data: newBook
    })
    
    res.status(201).send({
        message: 'Successfully created',
        result: createBook
    });
}

const getBookById = async (req, res) => {
    const { params } = req;
    const id = parseInt(params.id)
    
    const book = await prisma.books.findUnique({
        where: {
            id: id,
        },
    });

    if (!book) {
        return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(201).send({
        message: 'Librarain already exists',
        result: book
    });
}

const updateBook = async (req, res) => {
    const { params } = req;
    const id = parseInt(params.id)
    const { cover_name, published_year, category_type, barcode, status} = req.body;
  
    // Simple validation
    if (!cover_name || !published_year || !category_type || !barcode || !status) {
        return res.status(400).json({ message: 'Book title are required' });
        }
        
    const book = await prisma.books.update({
        where: {
            id: id,
        },
        data: {
            cover_name : cover_name,
            published_year : published_year,
            category_type : category_type,
            barcode : barcode,
            status : status,
        },
    });
  
    if (!book) {
      return res.status(404).json({ message: 'Item not found' });
    }
  
    res.status(201).send({
        message: 'Update Success',
        results: book
    });
}

const deleteBook = async (req, res) => {
    const { params } = req;
    const id = parseInt(params.id)
    const book = await prisma.books.delete({
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
    getAllBooks,
    advancedSearch,
    createNewBook,
    updateBook,
    deleteBook,
    getBookById
}