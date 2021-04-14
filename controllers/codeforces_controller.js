const User = require('../models/user');
const CodeForces = require('../models/codeforces');

module.exports.enterData = async function(req, res){
    try{
        let user = await User.findById(req.user._id);

        let temp = await CodeForces.findOne({user: req.user._id});

        if(!temp)
        {
            let codeforces = await CodeForces.create({
                Id: req.body.Id,
                rating: req.body.rating,
                user: user._id
            });

            let title;
            if(codeforces.rating < 1200){
                title = "Newbie";
            }
            else if(codeforces.rating < 1400)
            {
                title = "Pupil";
            }
            else if(codeforces.rating < 1600)
            {
                title = "Specialist";
            }
            else if(codeforces.rating < 1900)
            {
                title = "Expert";
            }
            else if(codeforces.rating < 2100)
            {
                title = "Candidate Master";
            }
            else if(codeforces.rating < 2300)
            {
                title = "Master";
            }
            else if(codeforces.rating < 2400)
            {
                title = "International Master";
            }
            else if(codeforces.rating < 2700)
            {
                title = "Grandmaster"
            }
            else
            {
                title = "International Grandmaster"
            }

            codeforces.title = title;

            codeforces.save();

            user.codeforces = codeforces._id;

            user.save();
        }

        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return;
    }
}

module.exports.removeData = async function(req, res){

    try{
        let codeforces = await CodeForces.findOneAndDelete({user: req.user._id});

        if(codeforces){
            let user = await User.findByIdAndUpdate(req.user._id, {
                $unset: {codeforces: codeforces._id}
            });

        }

        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}