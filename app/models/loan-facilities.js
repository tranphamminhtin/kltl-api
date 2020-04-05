var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoanSchema = new Schema({
    facilities: { type: String, required: true },
    room: { type: String, required: true },
    unit: { type: String, required: true },
    manager: { type: String, required: true },
    from: { type: Date, required: true, default: Date.now() },
    to: { type: Date, required: true },
    state: { type: Number, required: true, default: 0 },
    note: { type: String },
    request: { type: Boolean, required: true, default: false}
});
module.exports = mongoose.model('loanFacilities', LoanSchema);