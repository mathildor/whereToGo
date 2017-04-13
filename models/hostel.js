
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HostelSchema   = new Schema({
    name: String,
    coords: Array,
    rank: String,
    img: String,
    link: String,
    comment: String
});

module.exports = mongoose.model('Hostels', HostelSchema); //first input here defines the collection name in db
