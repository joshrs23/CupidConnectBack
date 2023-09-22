const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
require('dotenv').config();

const app = express();




const port = 8000;
https.createServer(app).listen(port, () => {
  console.log(`Server HTTPS is listening to the port ${port}`);
});
