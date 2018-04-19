/**
 * Created by abi on 16/4/18.
 */
const express =  require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
// const routes  = require('./routes/api');
// used to create, sign, and verify tokens
var config = require('./config');


const app = express();

//connect to mongo db

mongoose.connect('mongodb://localhost:27017/ninjago');
//connect command make connection to mongodb and ninjago is somewhat database in mongodb

mongoose.Promise = global.Promise;
app.use(bodyParser.json());


//initalize a routes

app.use('/api',require('./routes/api'));

app.use('/user',require('./routes/user'));




//error handling middleware

app.use(function(error,request,response,next){
    response.status(500).send({error:error.message});

});

//listen for request
// process.env.port this will listen to the port provided by environment or 3000
app.listen(process.env.port || 3000,function () {
    console.log('listining for request ');
    
});
