const express = require('express');
const app = express();
const port = 8000;

app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen(port, function(err){
    if(err){console.log('Error while running server', err); return;}
});