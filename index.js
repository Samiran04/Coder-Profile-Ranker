const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose');
const passport = require('passport');
const localStrategy = require('./config/passport_local_strategy');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const expressLayouts = require('express-ejs-layouts');
const SassMiddleware = require('node-sass-middleware');

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

app.use(SassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('./assets'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(session({
    name:'CodersRevelations',
    secret:'coders',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : new MongoDBStore({
        uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
        collection: 'mySessions'
      })
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.checkAuthtenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){console.log('Error while running server', err); return;}
});