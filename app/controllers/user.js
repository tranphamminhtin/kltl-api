var Model = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

var createToken = function (user) {
    var token = jwt.sign({
        right: user.right,
        email: user.email,
        userId: user._id
    }, superSecret, {
        expiresIn: '5s'
    });
    return token;
}

module.exports.getList = function (req, res) {
    Model.find(function (err, users) {
        if (err) return res.json({ success: false, message: err });

        // return the users
        return res.json({ success: true, message: users });
    });
}

module.exports.add = function (req, res) {
    var user = new Model();      // create a new instance of the User model
    user.email = req.body.email;  // set the users username (comes from the request)
    user.password = req.body.email;  // set the users password (comes from the request)
    user.right = req.body.right;  // set the users name (comes from the request)
    user.name = req.body.name;
    user.gender = req.body.gender;
    user.unit = req.body.unit;
    user.address = req.body.address;
    user.numberphone = req.body.numberphone;

    user.save(function (err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000)
                return res.json({ success: false, message: 'Tên đăng nhập đã tồn tại! ' });
            else
                return res.json({ success: false, message: err });
        }
        // return a message
        return res.json({ success: true, message: 'User created!' });
    });
}

module.exports.search = function (req, res) {
    Model.findOne({
        email: req.params.email
    }).exec(function (err, user) {
        if (err) return res.json({ success: false, message: err });
        if (!user) return res.json({ success: false, message: 'Trống' });
        return res.json({ success: true, message: user });
    });
}

module.exports.updateInformation = function (req, res) {
    // Model.findOne({
    //     email: req.params.email
    // }).exec(function (err, user) {
    //     if (err) return res.json({ success: false, message: err });
    //     if (!user) return res.json({ success: false, message: 'Trống' });
    //     user.name = reuq.body.name;
    //     user.gender = req.body.gender;
    //     user.unit = req.body.unit;
    //     user.address = req.body.adress;
    //     user.numberphone = req.body.numberphone;
    //     user.save(err => {
    //         if (err) return res.json({ success: false, message: err });
    //         return res.json({ success: true, message: 'Thay đổi thành công' });
    //     });
    // });
    Model.findOneAndUpdate({
        email: req.params.email
    }, {
        unit: req.body.unit,
        address: req.body.address,
        numberphone: req.body.numberphone,
        right: req.body.right
    }, (err, model) => {
        if(err) return res.json({success: false, message: err});
        return res.json({success: true, message: 'Sửa thành công'});
    });
}

module.exports.changePassword = function (req, res) {
    Model.findOne({
        email: req.params.email
    }).select("email password").exec(function (err, user) {
        if (err) return res.json({ success: false, message: err });
        if (!user) return res.json({ success: false, message: 'Người dùng không tồn tại' });
        var validPassword = user.comparePassword(req.body.oldpassword);
        if (!validPassword) {
            return res.json({
                success: false,
                message: 'Sai mật khẩu'
            });
        } else {
            if (req.body.password) user.password = req.body.password;
            else return res.json({ success: false, message: 'pass cũ trống' });
        }
        user.save(function (err) {
            if (err) return res.json({ success: false, message: err });
            // return a message
            return res.json({ success: true, message: 'Đổi mật khẩu thành công' });
        });
    });
};

module.exports.delete = function (req, res) {
    Model.remove({
        email: req.params.email
    }, function (err, user) {
        if (err) return rres.json({ success: false, message: err });
        return res.json({ success: true, message: 'Xóa thành công' });
    });
};

module.exports.login = function (req, res) {

    // find the user
    Model.findOne({
        email: req.body.email
    }).select("email password right").exec(function (err, user) {

        if (err) return res.json({ success: false, message: err });
        // no user with that username was found
        if (!user) {
            return res.json({
                success: false,
                message: 'Tên tài khoản k tồn tại'
            });
        } else if (user) {
            // check if password matches
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                return res.json({
                    success: false,
                    message: 'Sai mật khẩu'
                });
            } else {
                // if user is found and password is right
                // create a token
                var token = createToken(user);
                return res.json({
                    success: true,
                    message: 'Đăng nhập thành công',
                    token: token
                });
            }
        }
    });
}

module.exports.gg = function (req, res) {
    console.log(req.body);
    Model.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.json({ success: false, message: err });
        if (user) {
            var token = createToken(user);
            return res.json({ success: true, email: user.email, token: token });
        } else {
            return res.json({success: false, message: 'Đăng nhập thất bại'});
        }
    });
};