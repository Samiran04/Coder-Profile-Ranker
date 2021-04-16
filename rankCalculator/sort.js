module.exports.compare = async function(a, b){
    if(a.rating <= b.rating)
    {
        return -1;
    }
    else if(a.rating > b.rating)
    {
        return 1;
    }
    return 0;
}