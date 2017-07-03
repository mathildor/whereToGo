
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CiteSchema   = new Schema({
    name: String,
    coords: Array,
    rank: String,
    img: String,
    link: String,
    comment: String
});

module.exports = mongoose.model('Cites', CiteSchema); //first input here defines the collection name in db
