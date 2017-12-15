var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}));

var User = require('./user');

// Create a new user

router.post('/', function(req,res){
    User.create({
        name : req.body.name,
        email: req.body.email,
        password:req.body.password
    },
    function(err,user){
        if(err)
        return res.status(500).send("Encountered problem adding info to database");
        res.status(200).send(user);
    });
});

// Return all users

router.get('/', function(req,res){
    User.find({},
    function(err, users){
        if(err)
        return res.status(500).send('Encountered problem fetching users');
        return res.status(200).send(users);
    });
});

module.exports = router;