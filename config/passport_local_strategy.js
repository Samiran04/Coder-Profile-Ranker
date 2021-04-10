const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new localStrategy({
    usernameField: 'email'
}, function(email, password, done){
    User.findOne({email: email}, function(err, user){
        if(err){console.log(err); return done(err);}

        if(!user || user.password != password)
        {
            return done(null, false);
        }
        else
        {
            return done(null, user);
        }
    });
}));

passport.serializeUser(function(user, done){
    return done(null, user);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){console.log(err); return done(err);}

        if(user){
            return done(null, user);
        }
    });
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.checkAuthtenticatedUser = function(req,res,next){
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;