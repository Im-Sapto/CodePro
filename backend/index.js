const http = require('http');
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');
const file = require("./FileOperations");




const app = express()
const port = process.env.PORT || 3000;        // Using env variable

// app.use(cors({
//     origin: 'https://code-pro-one.vercel.app',    // Replace with your frontend's origin
//     methods: 'POST, DELETE',       // Allow only POST requests from the frontend
//     credentials: true,
//   }));

app.use(cors())

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




  
// Define a route to handle the POST request from your React frontend
  app.post('/api/compile',(req, res) => {
    const { code , language, input } = req.body;
  
    var data = qs.stringify({
      'code': code,
      'language': language,
      'input': input
    })
    var config = {
        method: 'post',
        url: 'https://api.codex.jaagrav.in',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };
  
    axios(config)
    .then((response)=>{
      res.send(response.data);
    })
    .catch((err)=>{
      res.status(500).json({ error : err.message });
    });
  });

app.use("/user", file);   // File system updated

const server = http.createServer(app);
  
server.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})

