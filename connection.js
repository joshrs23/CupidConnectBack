const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
require('dotenv').config();
require('./models/connectionMongoDb');

const app = express();

const CountryRouter = require('./routes/countries');
const ProvinceRouter = require('./routes/provinces');
const userRouter = require('./routes/users');
const cityRouter = require('./routes/cities');


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

//city
app.use('/create-city', express.json());
app.use('/get-cities-by-province', express.json());
app.use('/get-city', express.json());

//user
app.use('/create-user',express.json());
app.use('/delete-user',express.json());
app.use('/sign-in',express.json());
app.use('/change-password',express.json());

app.use(CountryRouter);
app.use(ProvinceRouter);
app.use(userRouter);
app.use(cityRouter);

const options = {
  key: fs.readFileSync('/home/nebula/server.key'),
  cert: fs.readFileSync('/home/nebula/server.crt')
};

const port = 8000;
https.createServer(options,app).listen(port, () => {
  console.log(`Server HTTPS is listening to the port ${port}`);
});
