
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RouteSchema   = new Schema({
    startPoint: Object, //GeoJson
    endPoint: Object, //GeoJson
    line: Object //GeoJson
});

module.exports = mongoose.model('Route', RouteSchema); //first input here defines the collection name in db
