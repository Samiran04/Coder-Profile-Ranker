const User = require('../models/user');
const Gfg = require('../models/gfg');

module.exports.enterData = async function(req, res){
    try{
        let user = await User.findById(req.user._id);
        let temp = await Gfg.findOne({user: req.user._id});

        if(!temp)
        {
            let gfg = await Gfg.create({
                Id: req.body.Id,
                ranking: req.body.ranking,
                user: req.user._id
            });

            user.gfg = gfg._id;
            user.save();
        }

        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.removeData = async function(req, res){

    try{
        let gfg = await Gfg.findOneAndDelete({user: req.user._id});

        if(gfg)
        {
            await User.findOneAndUpdate({user: req.user._id}, {
                $unset: {gfg: gfg._id}
            });
        }

        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return;
    }
}