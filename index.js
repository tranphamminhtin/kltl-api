const express = require('express');        // call express
const app = express();                 // define our app using express
const bodyParser = require('body-parser');    // get body-parser
const morgan = require('morgan');         // used to see requests
const mongoose = require('mongoose');
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization,  Access-Control-Request-Headers');
   next();
});

app.use('/uploads', express.static('uploads'));

//============================
//===================
app.use(morgan('dev'));
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
   console.log('Database sucessfully connected')
},
   error => {
      console.log('Database could not connected: ' + error)
   }
);

// ROUTES FOR OUR API =================
// ====================================
app.get('/', function (req, res) {
   res.send('app works');
});
// API ROUTES ------------------------
var loanRoutes = require('./app/routes/loan-facilities')(express);
var unitRoutes = require('./app/routes/unit')(express);
var typeRoutes = require('./app/routes/facilities-type')(express);
var roomRoutes = require('./app/routes/room')(express);
var userRoutes = require('./app/routes/user')(express);
var facilitiesRoutes = require('./app/routes/facilities')(express);
var voteRoutes = require('./app/routes/vote')(express);

app.use('/loan-facilities', loanRoutes);
app.use('/unit', unitRoutes);
app.use('/facilities-type', typeRoutes);
app.use('/room', roomRoutes);
app.use('/vote', voteRoutes);
app.use('/user', userRoutes);
app.use('/facilities', facilitiesRoutes);

// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Dang dung Port: ' + config.port);