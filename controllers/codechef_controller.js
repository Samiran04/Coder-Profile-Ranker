const User = require('../models/user');
const CodeChef = require('../models/codechef');
const Rank = require('../models/rank');

const calculator = require('../rankCalculator/rankCalculator');

module.exports.enterData = async function(req, res){

    try{

        if(req.body.my != req.user._id)
        {
            return res.json(500, {
                message: 'Invalid Access'
            });
        }

        let user = await User.findById(req.user._id);

        let codechef = await CodeChef.findOne({user: req.user._id});

        if(!codechef)
        {
                codechef = await CodeChef.create({
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

            user.codechef = codechef._id;
        }

        let rank;

        if(!user.rank)
        {
            rank = await Rank.create({
                user: user._id,
                gfg: 0,
                codeforces: 0,
                codechef: codechef.rating
            });

            user.rank = rank._id;
        }else{
            rank = await Rank.findById(user.rank);
            rank.codechef = codechef.rating;
        }

        let obj = await calculator.calculateRating(rank);

        rank.rating = obj.totalRating;
        rank.title = obj.title;
        rank.info = obj.info;
        rank.save();
        user.save();
        codechef.save();

        console.log(rank);

        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return;
    }
}

module.exports.removeData = async function(req, res){

    try{

        if(req.query.Id != req.user._id)
        {
            return res.json(500, {
                message: 'Invalid Access'
            });
        }

        let codechef = await CodeChef.findOneAndDelete({user: req.user._id});

        let rank;

        if(codechef){
            let user = await User.findByIdAndUpdate(req.user._id, {
                $unset: {codechef: codechef._id}
            });

            rank = await Rank.findOne({user: req.user._id});
    
            rank.codechef = 0;

            let obj = await calculator.calculateRating(rank);

            rank.rating = obj.totalRating;
            rank.title = obj.title;
            rank.info = obj.info;
        }

        rank.save();

        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}