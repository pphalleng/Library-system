const express = require('express');
const status = require('statuses');
const router  = express.Router();

let books = [
    { 
        id: 1, 
        cover_name: 'To Kill a Mockingbird',
        published_year: '1960',
        category_type: 'Education',
        barcode: '9780099549482',
        status: 'Education Book',
    },
    { 
        id: 2, 
        cover_name: 'Jane Eyre', 
        published_year: '1847',
        category_type: 'Novel',
        barcode: '9781853260209',
        status: 'Novel Book',
    },
    { 
        id: 3, 
        cover_name: 'War and Peace', 
        published_year: '1865',
        category_type: 'History',
        barcode: '9781853260629',
        status: 'History Book',
    },
];

// Get all Books
router.get('/books', (req, res) => {
    res.json(books);
});

//Get Books by id
router.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find((book) => book.id === parseInt(id));

    if (!book) {
        return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(book);
});


// Create a new Book
router.post('/books', (req, res) => {
    const { cover_name, published_year, category_type, barcode, status} = req.body;
  
    // Simple validation
    if (!cover_name || !published_year || !category_type || !barcode || !status) {
      return res.status(400).json({ message: 'Book title are required' });
    }
  
    const newBook = { id: books.length + 1, cover_name, published_year, category_type, barcode, status};
    books.push(newBook);
  
    res.status(201).json(newBook);
});

// Update an existing Book by ID
router.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { cover_name, published_year, category_type, barcode, status} = req.body;
  
    // Simple validation
    if (!cover_name || !published_year || !category_type || !barcode || !status) {
      return res.status(400).json({ message: 'Book title are required' });
    }
  
    const book = books.find((book) => book.id === parseInt(id));
  
    if (!book) {
      return res.status(404).json({ message: 'Item not found' });
    }
  
    book.name = cover_name;
    book.published_year = published_year;
    book.category_type = category_type;
    book.barcode = barcode;
    book.status = status;
  
    res.json(book);
});

// Delete a user by ID
router.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter((book) => book.id !== parseInt(id));
    res.sendStatus(204);
  });
  
  module.exports = router;