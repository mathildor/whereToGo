
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RestaurantSchema   = new Schema({
    name: String,
    coords: Array,
    rank: String,
    img: String,
    link: String,
    comment: String
});

module.exports = mongoose.model('Restaurants', RestaurantSchema); //first input here defines the collection name in db
