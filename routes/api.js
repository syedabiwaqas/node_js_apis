/**
 * Created by abi on 16/4/18.
 */

const express =  require('express');

const router = express.Router();
const Ninja = require('../models/ninja');

//   {../ take you to the up directory}


//set up express app

// const app = express();

//request or response are not keywords just a variable name u can use req and res
// app.get('/api',function (request,response) {
//     console.log('get request');
//     response.send({name:'Abi Waqas',age:'21',company:'fikra right now'});
//
// });

//instead of app.get we  an use router.get

router.get('/ninjas',function (request,response) {
    response.send({type:'GET'});
});

// add new ninja to the db
router.post('/ninjas',function (request,response,next) {
    // var ninja  = new Ninja(request.body);
    // ninja.save();

    // we use then in create cus then will wait for the data to be saved in db and it will fire response.send method
    Ninja.create(request.body).then(function(ninja){
        var response_code={
            statusCode:'2xx',
              data:ninja


        };
        response.status(200).send(response_code);
    }).catch(next);

});

//update a ninja in db
router.put('/ninjas/:id',function (request,response,next) {
    Ninja.findByIdAndUpdate({_id : request.params.id},request.body).then(function(){
        Ninja.findOne({_id : request.params.id}).then(function (ninja) {
            response.send(ninja);
        })


    });

});

//delete a ninja in db
router.delete('/ninjas/:id',function (request,response,next) {
    Ninja.findByIdAndRemove({_id : request.params.id}).then(function(ninja){
        response.status(200).send(ninja+'was removed')
    }).catch(next);

});


module.exports = router;


//complated 13 tutorials