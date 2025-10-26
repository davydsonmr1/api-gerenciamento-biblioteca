const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  synopsis: { 
    type: String, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authors',
    required: true
  },

  isAvailable: { 
    type: Boolean, 
    required: true, 
    default: true 
  },
  expectedReturnDate: { 
    type: Date, 
    default: null 
  },
});

const Book = mongoose.model('Books', BookSchema);

module.exports = Book;