const mongoose = require('mongoose');

require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;
const connectToDatabase = () => {
 
  mongoose.connect(DATABASE_URL)
    .then(() => {
      console.log('CONECTAMOS no banco ');
    })
    .catch((error) => {
      console.log('DEU RUIM! Não conectou no banco:', error.message);
    });
}
module.exports = connectToDatabase;