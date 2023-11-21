const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const socketIo = require('socket.io');
require('dotenv').config();
require('./models/connectionMongoDb');

const app = express();

const CountryRouter = require('./routes/countries');
const ProvinceRouter = require('./routes/provinces');
const userRouter = require('./routes/users');
const cityRouter = require('./routes/cities');
const identityRouter = require('./routes/identities');
const orientationRouter = require('./routes/orientations');
const interestRouter = require('./routes/interests');
const likeRouter = require('./routes/likes');
const dislikeRouter = require('./routes/dislikes');
const matchesRouter = require('./routes/matches');
const messagesRouter = require('./routes/matches');


//app.use(cors());
// Configuración de CORS
const corsOptions = {
  origin: '*', // Reemplaza con el origen de tu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

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
app.use('/change-identity-user',express.json());
app.use('/change-orientation-user',express.json());
app.use('/change-interest-user',express.json());
app.use('/change-description-user',express.json());
app.use('/get-identity-user',express.json());
app.use('/get-orientation-user',express.json());
app.use('/get-interest-user',express.json());
app.use('/get-description-user',express.json());
app.use('/get-user',express.json());
app.use('/delete-picture-user',express.json());
app.use('/get-user-likes',express.json());
app.use('/get-user-visitor',express.json());
app.use('/get-all-users',express.json());
app.use('/delete-user-admin',express.json());

//identity
app.use('/get-identity', express.json());

//orientation
app.use('/get-orientation', express.json());

//interest
app.use('/get-interest', express.json());

//like
app.use('/add-like', express.json());
app.use('/delete-like', express.json());
app.use('/get-likes-user', express.json());
app.use('/validate-like', express.json());
app.use('/get-likes-to-user', express.json());

//dislike
app.use('/add-dislike', express.json());

//matches
app.use('/get-matches', express.json());
app.use('/delete-match', express.json());
app.use('/get-match', express.json());
app.use('/get-all-matches', express.json());

//messages
app.use('/add-message', express.json());
app.use('/get-message', express.json());

app.use(CountryRouter);
app.use(ProvinceRouter);
app.use(userRouter);
app.use(cityRouter);
app.use(identityRouter);
app.use(orientationRouter);
app.use(interestRouter);
app.use(likeRouter);
app.use(dislikeRouter);
app.use(matchesRouter);
app.use(messagesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack to the console
  res.status(500).send('Something broke!'); // Send a generic error response
});
// end Error handling middleware

const options = {
  key: fs.readFileSync('/home/nebula/server.key'),
  cert: fs.readFileSync('/home/nebula/server.crt')
};

const server = https.createServer(options, app);

//const io = socketIo(server);
const io = socketIo(server, {
  cors: {
    origin: "*", // Reemplaza con el origen de tu frontend
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Suponiendo que recibes el ID de la sala de alguna manera (ej. desde el cliente)
    socket.on('join room', (matchId) => {
        socket.join(matchId);
        console.log(`Usuario se ha unido a la sala ${matchId}`);
    });

    socket.on('chat message', (matchId, user, msg) => {
      console.log(matchId + " " + user+ " " + msg);

      io.in(matchId).emit('chat message', user,msg);
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

const port = 8000;

/*https.createServer(options,app).listen(port, () => {
  console.log(`Server HTTPS is listening to the port ${port}`);
});*///modo1
/*
https.createServer(options, app).listen(port, () => {
  console.log(`Server HTTPS is listening to the port ${port}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});//modo2
*/
server.listen(port, () => {
  console.log(`Server HTTPS is listening to the port ${port}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});

