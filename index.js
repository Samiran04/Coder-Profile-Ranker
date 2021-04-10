const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose');
const passport = require('passport');
const localStrategy = require('./config/passport_local_strategy');
const session = require('express-session');

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
    name:'CodersRevelations',
    secret:'coders',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.checkAuthtenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){console.log('Error while running server', err); return;}
});