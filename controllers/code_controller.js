const User = require('../models/user');
const Code = require('../models/code');
const Project = require('../models/project');

module.exports.createFile = async function(req, res){
    try{

        let code = await Code.findOne({
            user: req.user._id,
            project: req.body.Id,
            name: req.body.name
        });

        if(code)
        {
            return res.redirect('back');
        }

        code = await Code.create({
            user: req.user._id,
            project: req.body.Id,
            content: 'Type Your Code...',
            name: req.body.name
        });

        await Project.findByIdAndUpdate(req.body.Id, {
            $push: {codes: code._id}
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

module.exports.saveFile = async function(req, res){
    try{
        let project = await Project.findById(req.query.Id);

        project.commits++;

        project.save();

        await Code.findByIdAndUpdate(req.query.contentId, {
            $set: {content: req.body.content}
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