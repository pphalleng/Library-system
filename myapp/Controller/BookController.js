const books = require("../Models/DataBook.json");

const getAllBooks = (req, res) => {
    if(req.query.page || req.query.limit){
        res.json(res.paginatedResults);
    }else{
        res.json(books);
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

const createNewBook = (req, res) => {
    const { cover_name, published_year, category_type, barcode, status} = req.body;
  
    // Simple validation
    if (!cover_name || !published_year || !category_type || !barcode || !status) {
      return res.status(400).json({ message: 'Book title are required' });
    }
  
    const newBook = { id: books.length + 1, cover_name, published_year, category_type, barcode, status};
    books.push(newBook);
  
    res.status(201).json(newBook);
}

const getBookById = (req, res) => {
    const { id } = req.params;
    const book = books.find((book) => book.id === id);

    if (!book) {
        return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(book);
}

const updateBook = (req, res) => {
    const { id } = req.params;
    const { cover_name, published_year, category_type, barcode, status} = req.body;
  
    // Simple validation
    if (!cover_name || !published_year || !category_type || !barcode || !status) {
        return res.status(400).json({ message: 'Book title are required' });
        }
        
        const book = books.find((book) => book.id === id);
  
    if (!book) {
      return res.status(404).json({ message: 'Item not found' });
    }
  
    book.cover_name = cover_name;
    book.published_year = published_year;
    book.category_type = category_type;
    book.barcode = barcode;
    book.status = status;
  
    res.json(book);
}

const deleteBook = (req, res) => {
    const { id } = req.params;
    // books = books.filter((book) => book.id !== parseInt(id));
    res.sendStatus(204);
}

module.exports = {
    getAllBooks,
    advancedSearch,
    createNewBook,
    updateBook,
    deleteBook,
    getBookById
}