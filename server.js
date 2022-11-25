const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
require('dotenv').config()

const cors = require('cors');
app.use(cors());
//login
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({ secret: 'secretCode', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
//login 끝

var db;
MongoClient.connect(process.env.DB_URL, function (error, client) {
  if (error) return console.log(error);
  db = client.db(process.env.DB_NAME);
  app.listen(process.env.PORT, function () {
    console.log('listening on ' + process.env.PORT)
  });
})

app.get('/', function (request, response) {
  // response.sendFile(__dirname + '/index.ejs');
  response.render('index.ejs');
});

app.get('/service', function (request, response) {
  db.collection('service').find().sort({ "id": -1 }).toArray(function (error, result) {
    response.status(200).json(
      result
    )
  });
});

app.get('/servicesearch', (request, response) => {
  db.collection('service').find({
    $and: [{ sr_id: { $regex: request.query.sr_id } }, { type: { $regex: request.query.type } }, { name: { $regex: request.query.name } }, {
      title: { $regex: request.query.title }
    }, { state: { $regex: request.query.state } }, { startday: { $gte: request.query.startday, $lte: request.query.endday } }]
  }).sort({ "id": -1 }).toArray((error, result) => {
    console.log(result);
    response.status(200).json(result)
  })
});


app.get('/incident', function (request, response) {
  db.collection('incident').find().sort({ "id": -1 }).toArray(function (error, result) {
    response.status(200).json(
      result
    )
  });
});

app.get('/incidentsearch', (request, response) => {
  db.collection('incident').find({
    $and: [{ sr_id: { $regex: request.query.sr_id } }, { type: { $regex: request.query.type } }, { name: { $regex: request.query.name } }, {
      title: { $regex: request.query.title }
    }, { state: { $regex: request.query.state } }, { startday: { $gte: request.query.startday, $lte: request.query.endday } }]
  }).sort({ "id": -1 }).toArray((error, result) => {
    console.log(result);
    response.status(200).json(result)
  })
});

app.get('/portalboard', function (request, response) {
  db.collection('portalboard').find().sort({ "id": -1 }).toArray(function (error, result) {
    response.status(200).json(
      result
    )
  });
});

app.get('/incident', function (request, response) {
  db.collection('incident').find().sort({ "id": -1 }).toArray(function (error, result) {
    response.status(200).json(
      result
    )
  });
});

app.get('/incident', function (request, response) {
  db.collection('incident').find().sort({ "id": -1 }).toArray(function (error, result) {
    response.status(200).json(
      result
    )
  });
});

app.get('/metric', function (request, response) {
  console.log(request.query.id);
  db.collection('metric').find().sort({ "id": 1 }).toArray(function (error, result) {
    response.status(200).json(
      result
    )
    console.log(result)
  });
});

app.get('/portalboard', function (request, response) {
  console.log(request.query.id);
  db.collection('portalboard').find().sort({ "id": 1 }).toArray(function (error, result) {
    response.status(200).json(
      result
    )
    console.log(result)
  });
});

app.get('/chart', function (request, response) {
  console.log(request.query.id);
  db.collection('chart').find().sort({ "id": 1 }).toArray(function (error, result) {
    response.status(200).json(
      result
    )
    console.log(result)
  });
});

