const http = require('http');
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
// const qs = require('qs');
const file = require("./FileOperations");




const app = express()
const port = process.env.PORT || 3000;        // Using env variable


const allowedOrigins = ['http://localhost:5173', 'https://code-pro-one.vercel.app'];

// Configure CORS with the allowed origins
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB Connection Successful");
})
.catch((err) => {
  console.error("Error connecting to the database:", err.message);
});


  
// Define an API endpoint for code execution
app.post('/compile', (req, res) => {
  const { code , language, input } = req.body;
  var languageCode = '5';

  switch (language) {
    case 'c':
      languageCode = '6' 
      break;
    case 'cpp':
      languageCode = '7' 
      break;
    case 'java':
      languageCode = '4' 
      break;
    case 'cs':
      languageCode = '1' 
      break;
    case 'js':
      languageCode = '17' 
      break;
    case 'go':
      languageCode = '20' 
      break;
  
    default:
      languageCode = '5'
      break;
  }

const options = {
  method: 'POST',
  url: 'https://code-compiler.p.rapidapi.com/v2',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '9b1a72d15emshd433e494e613ca8p147134jsn08e961dc50bf',
    'X-RapidAPI-Host': 'code-compiler.p.rapidapi.com'
  },
  data: {
    LanguageChoice: languageCode , Program: code , Input : input
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
  return res.send(response.data);
}).catch(function (error) {
  console.error(error);
});
});
  

app.use("/user", file);   // File system updated

const server = http.createServer(app);
  
server.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})

// module.exports = app;

