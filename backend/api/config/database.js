const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.MONGO_URI

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB sudah terhubung!'))
  .catch(err => console.log('MongoDB gagal terhubung:', err));
