var jwt = require('jsonwebtoken');
var config = require('../../config');
var request = require('request');
// super secret for creating tokens
var superSecret = config.secret;

module.exports.verify = function (req, res, next) {

    if (req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase() === 'bearer') {
        var token = req.headers.authorization.split(' ')[1];
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, superSecret, function (err, authData) {
                if (err) {
                    req.user = null;
                    return res.json({ success: false, login: true, message: 'Xác thực thất bại' });
                } else {
                    req.user = authData;
                    return next();
                }
            });
        } else {
            // if there is no token
            // return an HTTP response of 403 (access forbidden) and an error message
            return res.json({
                success: false,
                message: 'No token provided.',
            });
        }
    }
    else {
        return res.json({ success: false, message: 'Không xác thực' });
    }
}

module.exports.verifySocialToken = function (req, res, next) {
    if (req.body) {
        if (req.body.authToken && req.body.id && req.body.provider) {
            var url = 'https://';
            if (req.body.provider === 'GOOGLE') {
                url += 'www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + req.body.authToken;
            } else return res.send({ success: false, message: 'Không xác thực' });
            request.get(url, { json: true }, (err, response, body) => {
                if (err) return res.send({ success: false, message: err });
                if (body.error) return res.send({ success: false, message: body });
                return next();
            });
        } else return res.send({ success: false, message: 'Không xác thực' });
    } else {
        return res.send({ success: false, message: 'Không xác thực' });
    }
}