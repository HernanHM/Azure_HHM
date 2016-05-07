// Get the packages we need
//REQUIRE
//This block of code will load the Express package and allow us to use it within our application. We will be requiring more packages here as we add more complexity to our application.
var express = require('express');
var mongoose = require('mongoose');
var Beer = require('./models/Beer');
var bodyParser = require('body-parser');


//CONNECT to the beerlocker MONGODB
mongoose.connect('mongodb://localhost:27017/beerlocker');

//EXPRESS APPLICATION
// Create our express application
//The Express Application is the main component for your web application. Among other things, it is used to define routes, start listening for http connections, and perform routing for requests.
var app = express();
//User body-parser in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use environment defined port or 3000
var port = 3000;

//EXPRESS ROUTER
// Create our express router
////The Express Application is the main component for your web application. Among other things, it is used to define routes, start listening for http connections, and perform routing for requests.
var router = express.Router();

//CREATE ROUTE
// Initial dummy route for testing
// http://localhost:3000/api
//Here we are creating a route for ‘/’ to return a JSON object with message set to a constant string.
router.get('/', function(req, res){
   res.sendfile('index.html');
});


//Create a new route with the prefix /beers
var beersRoute = router.route('/beers');

//Create endpoint /api/beers for POST
beersRoute.post(function(req, res){
   //Create a new instance of beer model
    var beer = new Beer(); 
    //Set beer propertis that come from POST data
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    
    //save the beer and check for error
    beer.save(function(err){
       if(err)
           res.send(err);
        res.json(({message: 'Beer added to the locker!!',data:beer}));
    });
});

//Create endpoint /api/beers for GET
beersRoute.get(function(req,res){
   Beer.find(function(err,beers){
      if (err)
          res.send(err);
       res.json(beers);
   }); 
});

//REGISTER ROUTES AND START SERVER
// Register all our routes with /api
app.use('/api',router);

// Start the server
app.listen(port);
console.log('Insert beer on porti '+ port);