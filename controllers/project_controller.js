const Project = require('../models/project');
const User = require('../models/user');

module.exports.createProject = async function(req, res){
    try{

        let project = await Project.findOne({user: req.user._id, name: req.body.name});

        if(project){
            return res.redirect('back');
        }

        project = await Project.create({
            user: req.user._id,
            name: req.body.name,
            codes: []
        });

        await User.findByIdAndUpdate(req.user._id, {
            $push: {projects:project._id}
        });

        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error'
        });
    }
}

module.exports.displayProject = async function(req, res){

    try{

        let profile = await User.findOne({email: req.params.email});

        let project = await Project.findOne({user: profile._id, name: req.params.name});

        console.log(project);

        console.log('***********', project.codes);

        if(project.codes.length > 0)
        {
            project = await Project.findOne({user: profile._id, name: req.params.name}).populate('codes');
        }

        let codes = project.codes;


        return res.render('project', {
            project: project,
            codes: codes,
            profile: profile
        });
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error In Display'
        });
    }
}