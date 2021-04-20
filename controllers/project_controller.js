const Project = require('../models/project');
const User = require('../models/user');
const Code = require('../models/code');

module.exports.createProject = async function(req, res){
    try{

        let project = await Project.findOne({user: req.user._id, name: req.body.name});

        if(project){
            return res.redirect('back');
        }

        project = await Project.create({
            user: req.user._id,
            name: req.body.name,
            codes: [],
            commits: 0
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

module.exports.destroyProject = async function(req, res){
    try{

        console.log('**********Destroy Project');

        await Code.deleteMany({project: req.query.project});

        await User.findByIdAndUpdate(req.user._id, {
            $pull: {project: req.query.project}
        });

        await Project.findByIdAndDelete(req.query.project);

        return res.redirect('/');

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error in code'
        });
    }
}