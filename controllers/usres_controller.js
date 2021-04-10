const User = require('../models/user');

module.exports.signIn = function(req, res){
    return res.render('users_signIn');
}

module.exports.signUp = function(req, res){
    return res.render('users_signUp');
}

module.exports.create = async function(req, res){

    try{
        if(req.body.password != req.body.confirm)
        {
            return res.redirect('back');
        }

        let user = await User.findOne({email: req.body.email});

        if(user){
            return res.redirect('back');
        }
        else{
            let newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                points: 0
            });

            console.log(newUser);

            return res.redirect('/users/sign-in');
        }

    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.createSession = async function(req, res){
    return res.redirect('/');
}