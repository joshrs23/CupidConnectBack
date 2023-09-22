const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
require('dotenv').config();
require('./models/db');

const app = express();




const puerto = 8000;
https.createServer(options, app).listen(puerto, () => {
  console.log(`Server HTTPS is listening to the port ${puerto}`);
});
