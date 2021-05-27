const express = require('express');

const app = express();
app.use(express.json());

app.get('/', function (req, res) {
  res.json({
    message: 'Hello from Online Academy Chatbot'
  });
})

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Api server is running at port ${PORT}`);
})

module.exports = app; 