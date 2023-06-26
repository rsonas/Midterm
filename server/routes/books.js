// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let Book = require('../models/books');

/* GET books List page. READ */
router.get('/',  (req, res, next) => {
  Book.find((err, bookList) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(bookList);
      res.render('books/index', {
        title: 'Books', 
        BookList: bookList})
    }
  });
  
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
    res.render('books/details', {
      title: 'Add Book',
      books: {} 
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

      const { title, price, author, genre } = req.body;
      const newBook = new Book({
        title,
        price,
        author,
        genre
      });
      newBook.save(function(err) {
        if (err) {
          console.log(err);
        }
        res.redirect('/books');
      });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Book.findById(id, function(err, book) {
      if (err) {
        console.log(err);
      }
      res.render('books/details', {
        title: 'Edit Book',
        books: book
      });
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
    const id = req.params.id;
    const { title, price, author, genre } = req.body;
    const updatedBook = {
      _id: id,
      title,
      price,
      author,
      genre
    };
    Book.updateOne({ _id: id }, updatedBook, function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect('/books');
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    Book.remove({ _id: id }, function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect('/books');
    });
});


module.exports = router;
