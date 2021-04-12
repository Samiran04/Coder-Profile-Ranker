const User = require('../models/user');
const CodeChef = require('../models/codechef');

module.exports.enterData = async function(req, res){
    let user = await User.findById(req.user);
}