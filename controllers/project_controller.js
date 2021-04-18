const Project = require('../models/project');

module.exports.createProject = async function(req, res){
    try{
        await Project.create({
            user: req.user._id,
            name: req.body.name
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