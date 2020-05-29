const express = require('express');
const app = express();
const promisify = require('es6-promisify');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const routes = require('./routes');
require('./handlers/passport');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
	console.log('We have an error with the database: ' + err);
})

app.use(session({ secret: process.env.SECRET }));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', (__dirname + '/views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Running on PORT: ' + PORT));
