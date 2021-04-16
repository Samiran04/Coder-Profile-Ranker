const Rank = require('../models/rank');
const User = require('../models/user');

module.exports.home = async function(req, res){

    let rank = await Rank.find({}).populate('user');

    rank = await rank.sort((x, y) => {
        return y.rating - x.rating;
    });

    return res.render('home', {
        rank : rank
    });
}