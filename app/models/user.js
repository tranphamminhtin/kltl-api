// grab the packages that wwe need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
const UserType = {
    'ADMIN': 0,
    'MANAGER': 1,
    'USER': 2
}
const Gender = {
    'FEMALE': 0,
    'MALE': 1
}
// user schema
var UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, select: false},
    right: {type: Number, required: true, default: UserType.USER},
    name: { type: String, required: true },
    gender: { type: Number, required: true, default: Gender.FEMALE},
    address: { type: String, required: true },
    numberphone: { type: String, required: true },
    unit: { type: String, required: true }
});
// hash the password before the user is saved
UserSchema.pre('save', function (next) {
    var user = this;
    // hash the password only if the password has been changed or user is new
    if (!user.isModified('password')) return next();
    // generate the hash
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);
        // change the password to the hashed version
        user.password = hash;
        next();
    });
});
// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};
// return the model
module.exports = mongoose.model('user', UserSchema);