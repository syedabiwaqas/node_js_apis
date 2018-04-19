/**
 * Created by abi on 18/4/18.
 */
const express =  require('express');
const router = express.Router();
const User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('./VerifyToken');



// add new ninja to the db
router.post('/createUser',function (request,response,next) {
    var hashedPassword = bcrypt.hashSync(request.body.password, 8);

    User.create({
        name : request.body.name,
        email : request.body.email,
        password : hashedPassword
    }).then(function(user){
        var response_code={
            statusCode:'2xx',
            data:user


        };
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        response.status(200).send({ auth: true, token: token,data:response_code });
    }).catch(next);

});

router.get('/me',VerifyToken,function(request, response) {

    User.findById(request.userId, { password: 0 }, function (err, user) {
        if (err) return response.status(500).send("There was a problem finding the user.");
        if (!user) return response.status(404).send("No user found.");

        response.status(200).send(user);
    });
});

// add the middleware function
router.use(function (user, request, response, next) {
    response.status(200).send(user);
});

router.post('/login', function(request, response) {

    User.findOne({ email: request.body.email }, function (err, user) {
        if (err) return response.status(500).send('Error on the server.');
        if (!user)
        {
            return response.status(404).send('No user found.');
        }

        var passwordIsValid = bcrypt.compareSync(request.body.password, user.password);
        if (!passwordIsValid) {
            return response.status(401).send({
                auth: false,
                token: null,
                statusCode:'4xx',
                message: "username or password is not correct"
            });
        }


        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        response.status(200).send({ auth: true, token: token });
    });

});

router.get('/logout', function(req, response) {
    response.status(200).send({ auth: false, token: null });
});

router.get('/userList',VerifyToken,function (request,response) {
    User.find().then(function(user){
        for(var i = 0; i < user.length; i++) {
            delete user[i]['password'];
            console.log(user[i]);
        }
        var response_code={
            data:user

        };
        response.status(200).send({ statusCode:'2xx',data:response_code });
    });

});

module.exports = router;

