// BASE SETUP
// BASE SETUP
// BASE SETUP
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path       = require('path');
var mongoose   = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//Set root folder
app.use(express.static(path.join(__dirname, 'public')));

//Connect to db:
mongoose.connect('mongodb://heroku_8dg8fhxt:d20n7eafi30j543hsil10gslsf@ds157839.mlab.com:57839/heroku_8dg8fhxt');

//Import models:
var Hostel = require('./models/hostel');


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/', router);

// test route to make sure everything is working (accessed at GET http://localhost:8080/)
router.get('/', function(req, res) {
    res.sendfile('index.html', { root: __dirname + "/public" } );
});

// more routes for our API will happen here:

//hostel routes:
router.route('/hostels/')
    //create hostel:
    .post(function(req, res){
        var hostel = new Hostel(req.body);
        hostel.save(function(err){
            if(err)
                res.send(err);
            res.json({message: 'hostel created!'});
        });
    })
    //get all hostels
    .get(function(req, res) {
        console.log("get all hostels");
        Hostel.find(function(err, hostels){
            if (err)
                res.send(err)
            res.json(hostels);
        });
    });

router.route('/hostels/:hostel_id')
    //Getting specific hostel
    .get(function(req, res){
        console.log('get on id');
        console.log('id name is:');
        console.log(req.params.hostel_id);
        Hostel.find(req.params.hostel_id, function(err, hostel){
            if(err)
                res.send(err)
            res.json(hostel)
        });
    })
    //update hostel
    .put(function(req, res){
        //using the name as id
        console.log('id name is:');
        console.log(req.params.hostel_id);
        Hostel.find({name: req.params.hostel_id}, function(err, hostel){
            console.log('found correct');
            hostel.name = req.body.name;
            hostel.img = req.body.img;
            hostel.rank = req.body.rank;
            hostel.link = req.body.link;
            hostel.coords = req.body.coords;
            // hostel.save(function(err){
            //     if (err)
            //         res.send(err)
            //
            //     res.json({message: 'hostel updated'});
            // });
        });
    });


//

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
