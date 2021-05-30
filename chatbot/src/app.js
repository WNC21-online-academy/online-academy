// import libs
const express = require('express');
require('dotenv').config();
const handler = require('./repositories/initialize');
const router = require('./router');
const constants = require('./constants/index');

// declare app instance
const app = express();

// use middlewares
app.use(express.json());
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

// run app
const PORT = process.env.PORT || constants.defaultPort;
app.listen(PORT, function () {
  console.log(`Api server is running at port ${PORT}`);
  handler.initPersistentMenu();
})

module.exports = app;