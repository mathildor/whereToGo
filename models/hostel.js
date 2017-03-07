

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HostelSchema   = new Schema({
    name: String,
    coords: Array,
    rank: Number,
    img: String,
    link: String
});

module.exports = mongoose.model('Hostels', HostelSchema); //first input here defines the collection name in db
