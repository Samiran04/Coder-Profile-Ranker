const User = require('../models/user');
const CodeChef = require('../models/codechef');

module.exports.enterData = async function(req, res){

    try{
        let user = await User.findById(req.user._id);

        let temp = await CodeChef.findOne({user: req.user._id});

        if(!temp)
        {
            let codechef = await CodeChef.create({
                Id: req.body.Id,
                rating: req.body.rating,
                user: user._id
            });

            let title;

            if(codechef.rating < 1400)
            {
                title = "1 Start";
            }
            else if(codechef.rating < 1600)
            {
                title = "2 Start";
            }
            else if(codechef.rating < 1800)
            {
                title = "3 Start";
            }
            else if(codechef.rating < 2000)
            {
                title = "4 Start";
            }
            else if(codechef.rating < 2200)
            {
                title = "5 Start";
            }
            else if(codechef.rating < 2500)
            {
                title = "6 Start";
            }
            else
            {
                title = "7 Start"
            }

            codechef.title = title;

            codechef.save();

            user.codechef = codechef._id;

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
        let codechef = await CodeChef.findOneAndDelete({user: req.user._id});

        if(codechef){
            let user = await User.findByIdAndUpdate(req.user._id, {
                $unset: {codechef: codechef._id}
            });
            console.log('HERE**********', user);

        }

        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}