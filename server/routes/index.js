// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  // Find all books in the database
  book.find((err, books) => {
    if (err) {
      console.error(err);
    } else {
      console.log(books);
      res.render('details', {
        title: 'Book List',
        books: books
      });
    }
  });
});

module.exports = router;
