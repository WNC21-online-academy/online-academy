// import libs
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
require('express-async-errors');
require('dotenv').config();
const router = require('./router');

// declare app instance
const app = express();

// use middlewares
app.use('/assets', express.static(__dirname + "/assets/uploads"));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

// Listen running app 
const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(`Online academy api is running at port ${PORT}`);
})