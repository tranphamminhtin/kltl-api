var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
    email: { type: String, required: true },
    loanFacilities: { type: String, required: true },
    percent: { type: Number, required: true, default: 100, max: 100, min: 1 },
    note: { type: String }
});
module.exports = mongoose.model('vote', VoteSchema);