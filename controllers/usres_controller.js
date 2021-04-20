const User = require('../models/user');
const Project = require('../models/project');

module.exports.signIn = function(req, res){
    return res.render('users_signIn');
}

module.exports.signUp = function(req, res){
    return res.render('users_signUp');
}

module.exports.profile = async function(req, res){

    console.log('**********HERE');

    let user = await User.findOne({email: req.params.email}).populate('codechef').populate('codeforces').populate('gfg').populate('rank');

    let codechef = user.codechef;
    let codeforces = user.codeforces;
    let gfg = user.gfg;
    let rank = user.rank;
    let projects;

    if(user.projects.length > 0)
    {
        let temp = await User.findOne({email: req.params.email}).populate('projects');
        projects = temp.projects.sort((x, y) => {
            return y.commits - x.commits;
        });
    }

    console.log(projects);

    return res.render('users_profile', {
        codechef: codechef,
        codeforces: codeforces,
        gfg: gfg,
        profile: user,
        rank: rank,
        projects: projects
    });
}

module.exports.destroySession = function(req, res){

    req.logout();

    return res.redirect('/');
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

module.exports.checkUser = function(req, res, next)
{
    if(!req.user)
    {
        next();
    }
    else
    {
        return res.redirect('/');
    }
}