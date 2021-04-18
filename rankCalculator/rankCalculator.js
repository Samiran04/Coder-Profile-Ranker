const CodeForces = require('../models/codeforces');
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

        let title, info = "Student";

        if(totalRating < 1600)
        {
            title = 'Bronze Tier';
        }
        else if(totalRating < 1800)
        {
            title = 'Silver Tier';
        }
        else if(totalRating < 2100)
        {
            title = 'Gold Tier';
        }
        else if(totalRating < 2400)
        {
            title = 'Platinum Tier';
        }
        else if(totalRating < 2600)
        {
            title = 'Diamond Tier'
        }
        else
        {
            title = 'God Tier';
        }

        if(newGfg >= newCodechef && newGfg >= newCodeforces)
        {
            if(newGfg >= 1800)
            {
                info = 'Data Structures And Algorithm';
            }
        }
        else if(newCodeforces >= newCodechef && newCodeforces >= newGfg)
        {
            if(newCodeforces >= 1700)
            {
                info = 'Compitative Programming';
            }
        }
        else if(newCodechef >= newCodeforces && newCodechef >= newGfg)
        {
            if(newCodechef >= 1800)
            {
                info = 'Compitative Programming';
            }
        }

        return {
            totalRating: totalRating,
            title: title,
            info: info
        };

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Error in Code'
        });
    }
}