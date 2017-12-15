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

// Get a single specific user
router.get('/:id', function(req,res){
    User.findById(req.params.id, function(err, user){
        if(err)
            return res.status(500).send("Encountered problem fetching user");
        if(!user)
            return res.status(404).send("No user found" + user);
        return res.status(200).send(user);
    });
});

router.delete('/:id', function(req,res){
    User.findByIdAndRemove(req.params.id, function(err, user){
        if(err)
            return res.status(500).send("Encountered problem deleting user");    
        return res.status(200).send("deleted " + user.name);
    });
});

router.put('/:id', function(req,res){
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user){
        if(err)
            return res.status(500).send("Encountered problem updating user");    
        return res.status(200).send(user);
    });
});

module.exports = router;
