var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/angular-app/dist/angular-app' ));
mongoose.connect('mongodb://localhost/cakeDB');

var RatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
        default: ""
    }
})


mongoose.model('Rating', RatingSchema); 
var Rating = mongoose.model('Rating')

var CakeSchema = new mongoose.Schema({
    baker: { 
        type: String, 
        required: true
       
    },
    image: { 
        type: String, 
        required: true
        
    },
    rating: [RatingSchema]
    
    
},{timestamps: true});

mongoose.model('Cake', CakeSchema); 
var Cake = mongoose.model('Cake')

// gets all the cakes in the DB and will display all once at ('/')
app.get('/cakes', function(req, res){
    Cake.find(function(err,data){
        if(err){
            console.log('ERROR: we didnt get our cakes!')
        }
        else{
            console.log("we got all our cakes", data)
            res.json(data)
        }
    })
})

// add a new cake to the DB
app.post('/', function(req, res){
    const cake_inst= new Cake();
    cake_inst.baker = req.body.baker;
    cake_inst.image = req.body.image;
    cake_inst.save(function(err){
        if(err){}
        else{
            console.log("we added a new cake to the DB", cake_inst)
            res.json(cake_inst);
        }
    })
})

app.put('/cake/:id', function(req, res){
    const rating = req.body.rating;
    const comment = req.body.comment;
    Rating.update({_id: req.params.id}, {$set: {rating: rating, comment: comment}}, function(err, rating){
        if(err){}
        else{
            console.log("+++We gave a cake a rating!+++")
            res.json(rating)
        }
    })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})