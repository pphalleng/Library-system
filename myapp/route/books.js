const express = require('express');
const router  = express.Router();

const books = require("../Models/DataBook.json");
const bookController = require("../Controller/BookController");


// Get all Books
router.get('/books', paginatedResults(books), bookController.getAllBooks);

// advanced search customer
router.get('/book', bookController.advancedSearch);

//Get Books by id
router.get('/books/:id', bookController.getBookById);

// Create a new Book
router.post('/books', bookController.createNewBook);

// Update an existing Book by ID
router.put('/books/:id', bookController.updateBook);

// Delete a user by ID
router.delete('/books/:id', bookController.deleteBook);

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