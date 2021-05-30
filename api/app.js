// import libs
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('express-async-errors');
require('dotenv').config();
const router = require('./router');

// declare app instance
const app = express();

// use middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

// handle error
app.use((req, res, next) => {
  res.status(404).json({
    error_message: "Endpoint not found"
  })
})
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error_message: "Something broke!"
  })
})

// Listen running app 
const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Online academy api is running at port ${PORT}`);
})