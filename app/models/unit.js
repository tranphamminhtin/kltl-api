var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UnitSchema = new Schema({
    name: { type: String, required: true }
});
module.exports = mongoose.model('unit', UnitSchema);