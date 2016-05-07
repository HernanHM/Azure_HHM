//Load required packages

/*
So what is going on here?

We loaded the Mongoose package
Created a Mongoose schema which maps to a MongoDB collection and defines the shape of the documents within that collection.
We defined our schema to contain 2 strings and 1 number.
We exported the Mongoose beer model for use within our application.

The last step is to load this new beer model in our server.js file.
*/
var mongoose = require('mongoose');

//Define our beer schema
var BeerSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number
});

//Export the Mongoose model
module.exports = mongoose.model('Beer',BeerSchema);