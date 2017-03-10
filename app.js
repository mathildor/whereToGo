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

//var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//Set root folder
app.use(express.static(path.join(__dirname, 'public')));

//Set access and allow for geosearch
app.use('/geosearch', express.static(__dirname + '/node_modules/leaflet-geosearch/dist/'));

mongoose.Promise = global.Promise;
//Connect to db:
mongoose.connect('mongodb://heroku_8dg8fhxt:d20n7eafi30j543hsil10gslsf@ds157839.mlab.com:57839/heroku_8dg8fhxt');

//Import models:
var Hostel = require('./models/hostel');
var Cite = require('./models/cite');
var Restaurant = require('./models/restaurant');


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/', router);

// test route to make sure everything is working (accessed at GET http://localhost:8080/)
router.get('/', function(req, res) {
    res.sendfile('index.html', { root: __dirname + "/public" } );
});

// more routes for our API will happen here:

//HOSTEL ROUTES:
router.route('/hostels/')
    //create hostel:
    .post(function(req, res){
        postFunction(req, res, 'hostels')
    })
    //get all hostels
    .get(function(req, res) {
        getFunction(req, res, 'hostels')
    });
router.route('/hostels/:element_id')
    //Getting specific hostel
    .get(function(req, res){
        getOneFunction(req, res, 'hostels');
    })

    .delete(function(req, res){
        deleteOneFunction(req, res, 'hostels');
    })

    //update hostel
    .put(function(req, res){
        putOneFunction(req, res, 'hostels');
    });

//CITES ROUTES
router.route('/cites/')
    //create hostel:
    .post(function(req, res){
        postFunction(req, res, 'cites')
    })
    //get all cites
    .get(function(req, res) {
        getFunction(req, res, 'cites')
    });

router.route('/cites/:element_id')
    //Getting specific cite
    .get(function(req, res){
        getOneFunction(req, res, 'cites');
    })

    .delete(function(req, res){
        deleteOneFunction(req, res, 'cites');
    })

    //update cite
    .put(function(req, res){
        putOneFunction(req, res, 'cites');
    });

//RESTAURANTS ROUTES
router.route('/restaurants/')
    //create hostel:
    .post(function(req, res){
        postFunction(req, res, 'restaurants')
    })
    //get all restaurants
    .get(function(req, res) {
        getFunction(req, res, 'restaurants')
    });
router.route('/restaurants/:element_id')
    //Getting specific restuarant
    .get(function(req, res){
        getOneFunction(req, res, 'restaurants');
    })

    .delete(function(req, res){
        deleteOneFunction(req, res, 'restaurants');
    })

    //update restuarant
    .put(function(req, res){
        putOneFunction(req, res, 'restaurants');
    });

modelTypes = {
    'hostels': Hostel,
    'cites': Cite,
    'restaurants': Restaurant
}

function getFunction(req, res, type){ //type = hostels / cites / restaurants
    var Model = modelTypes[type];

    console.log("get all: "+type);
    Model.find(function(err, modelElements){
        if (err)
            res.send(err)
        res.json(modelElements);
    });
}

function postFunction(req, res, type){ //type = hostels / cites / restaurants
    console.log('in post function');
    var Model = modelTypes[type];

    var element = new Model(req.body); //adding the data from frontend
    console.log('the created element is: ');
    console.log(element);
    element.save(function(err){
            if (err)
                res.send(err);

            res.json({ message: 'Element created!' });
        });
}

function getOneFunction(req, res, type){
    var Model = modelTypes[type];
    Model.find({name: req.params.element_id}, function(err, element){
        if(err)
            res.send(err)
        res.json(element)
    });
}

function deleteOneFunction(req, res, type){
    console.log('in delete function');
    var Model = modelTypes[type];
    Model.remove({name: req.params.element_id}, function(err, element) {
        if (err)
            res.send(err);

        res.json({ message: type+' Successfully deleted' });
    });
}

function putOneFunction(req, res, type){
    console.log('in put function');
    var Model = modelTypes[type];

    Model.find({name: req.params.element_id}, function(err, elements){
        if (err)
            res.send(err);
        element = elements[0];
        console.log(element);
        //Setting new values
        element.name = req.body.name;
        element.img = req.body.img;
        element.rank = req.body.rank;
        element.link = req.body.link;
        element.coords = req.body.coords;
        element.comment = req.body.comment;

        element.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message:'element updated!' });
        });
    });
}



// START THE SERVER
// =============================================================================
//app.listen(port);
//console.log('Magic happens on port ' + port);
module.exports = app;
