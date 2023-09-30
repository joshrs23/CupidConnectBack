const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
require('dotenv').config();
require('./models/connectionMongoDb');

const app = express();

const CountryRouter = require('./routes/country');
const ProvinceRouter = require('./routes/province');


app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});


//country
app.use('/create-country', express.json());
app.use('/get-country', express.json());

//province
app.use('/create-province', express.json());
app.use('/get-province-by-country', express.json());
app.use('/get-province', express.json());


const port = 8000;
https.createServer(app).listen(port, () => {
  console.log(`Server HTTPS is listening to the port ${port}`);
});
