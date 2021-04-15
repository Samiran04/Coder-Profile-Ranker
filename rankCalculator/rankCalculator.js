const Rank = require('../models/rank');

module.exports.calculateRating = async function(rank)
{

    try{

        let newGfg = rank.gfg * 0.8;
        let newCodeforces = rank.codeforces * 1.33;
        let newCodechef = rank.codechef;

        let large = await Math.max(newCodeforces, newCodechef, newGfg);
        let minumum = await Math.min(newCodeforces, newCodechef, newGfg);
        let midium = newCodeforces + newCodechef + newGfg - large - minumum;

        let totalRating = large;

        if(large - midium <= 200)
        {
            totalRating += 0.05 * midium;
        }
        else if(large - midium <= 300)
        {
            totalRating += 0.02 * midium;
        }
        else if(large - midium <= 400)
        {
            totalRating += 0.01 * midium;
        }

        if(large - minumum <= 200)
        {
            totalRating += 0.05 * minumum;
        }
        else if(large - minumum <= 300)
        {
            totalRating += 0.02 * minumum;
        }
        else if(large - minumum <= 400)
        {
            totalRating += 0.01 * minumum;
        }

        return totalRating;

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error in Code'
        });
    }
}