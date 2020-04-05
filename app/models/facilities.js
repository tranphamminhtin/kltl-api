var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacilitiesSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    supplier: { type: String },
    date: { type: Date, default: Date.now() },
    image: { type: String, required: true },
    note: { type: String },
    quantity: { type: Number, required: true, default: 1 }
});
module.exports = mongoose.model('facilities', FacilitiesSchema);