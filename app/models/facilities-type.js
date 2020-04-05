var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypeSchema = new Schema({
    name: { type: String, required: true }
});
module.exports = mongoose.model('facilitiesType', TypeSchema);