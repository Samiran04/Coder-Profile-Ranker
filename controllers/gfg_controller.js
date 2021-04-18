const User = require('../models/user');
const Gfg = require('../models/gfg');
const Rank = require('../models/rank');

const calculator = require('../rankCalculator/rankCalculator');
module.exports.enterData = async function(req, res){
    try{

        console.log(req.body.my);

        if(req.body.my != req.user._id)
        {
            return res.json(500, {
                message: 'Invalid Access'
            });
        }

        let user = await User.findById(req.user._id);
        let gfg = await Gfg.findOne({user: req.user._id});

        if(!gfg)
        {
            gfg = await Gfg.create({
                Id: req.body.Id,
                ranking: req.body.ranking,
                user: req.user._id
            });

            user.gfg = gfg._id;
        }

        console.log(gfg);

        let rating = 0;

        if(gfg.ranking <= 500)
        {
            rating = 5000;
        }
        else if(gfg.ranking <= 2000)
        {
            rating = 4000;
        }
        else if(gfg.ranking <= 5000)
        {
            rating = 3200;
        }
        else if(gfg.ranking <= 10000)
        {
            rating = 2200;
        }
        else if(gfg.ranking <= 20000)
        {
            rating = 1600;
        }
        else if(gfg.ranking <= 50000)
        {
            rating = 1400;
        }
        else
        {
            rating = 1000;
        }

        let rank;

        if(!user.rank)
        {
            rank = await Rank.create({
                user: user._id,
                gfg: rating,
                codeforces: 0,
                codechef: 0
            });

            user.rank = rank._id;
        }else{
            rank = await Rank.findById(user.rank);
            rank.gfg = rating;
        }

        //console.log(rank);

        let obj = await calculator.calculateRating(rank);

        rank.rating = obj.totalRating;
        rank.title = obj.title;
        rank.info = obj.info;
        rank.save();
        user.save();
        gfg.save();

        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports.removeData = async function(req, res){

    try{

        console.log(req.query.Id);

        if(req.query.Id != req.user._id)
        {
            return res.json(500, {
                message: 'Invalid Access'
            });
        }

        let gfg = await Gfg.findOneAndDelete({user: req.user._id});

        if(gfg)
        {
            await User.findOneAndUpdate({user: req.user._id}, {
                $unset: {gfg: gfg._id}
            });

            let rank = await Rank.findOne({user: req.user._id});

            rank.gfg = 0;

            let obj = await calculator.calculateRating(rank);

            rank.rating = obj.totalRating;
            rank.title = obj.title;
            rank.info = obj.info;

            rank.save();

        }

        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return;
    }
}