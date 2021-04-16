const Rank = require('../models/rank');
const User = require('../models/user');
const sortCompare = require('../rankCalculator/sort');

module.exports.home = async function(req, res){

    if(req.user)
    {
        let user = await User.findById(req.user._id);
    }

    let rank = await Rank.find({});

    rank = await rank.sort(sortCompare.compare);

    console.log(rank);

    return res.render('home');
}