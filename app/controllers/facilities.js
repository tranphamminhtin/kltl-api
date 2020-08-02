var Model = require('../models/facilities');
var Loan = require('../models/loan-facilities');

module.exports.getList = function (req, res) {
    Model.find(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: model });
    });
};

module.exports.add = function (req, res) {
    console.log(req.body);
    if (!req.file) return res.json({ success: false, message: 'Không có hình' })
    req.body.image = `http://${req.headers.host}/uploads/${req.file.filename}`;
    Model.create(req.body, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: model });
    });
};

module.exports.search = function (req, res) {
    Model.findById(req.params.id, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        if (!model) return res.json({ success: false, message: 'Trống' });
        return res.json({ success: true, message: model });
    });
};

module.exports.update = function (req, res) {
    Model.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        type: req.body.type,
        supplier: req.body.supplier,
        note: req.body.note,
        quantity: req.body.quantity
    }, { new: true }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        res.json({ success: true, message: model });
    });
};

module.exports.delete = function (req, res) {
    Model.remove({
        _id: req.params.id
    }, function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: 'Xóa thành công' });
    });
};

module.exports.getByRoom = function (req, res) {
    const room = req.query.room;
    const state = req.query.state;
    let key = null;
    if (state) {
        switch (state) {
            case 'Request': {
                key = { request: true, state: 0 };
                break;
            }
            case 'Allocate': {
                key = { request: false, state: 0 };
                break;
            }
            case 'Revoke': {
                key = { request: false, state: 1 };
                break;
            }
            default: break;
        }
        if (req.query.room != 'null') {
            key.room = room;
        }
        Loan.find(key)
            .distinct('facilities', function (err, results) {
                if (err) return res.json({ success: false, message: err });
                Model.find().where('_id').in(results).exec((error, models) => {
                    if (error) return res.json({ success: false, message: error });
                    return res.json({ success: true, message: models });
                });
            });
    } else
        return res.json({ success: false, message: 'Trống' });

};

module.exports.getByManager = function (req, res) {
    const email = req.query.manager;
    const state = req.query.state;
    let key = null;
    if (state) {
        switch (state) {
            case 'Request': {
                key = { request: true, state: 0 };
                break;
            }
            case 'Allocate': {
                key = { request: false, state: 0 };
                break;
            }
            case 'Revoke': {
                key = { request: false, state: 1 };
                break;
            }
            default: break;
        }
        if (email != 'null') {
            console.log(email);
            key.manager = email;
        }
        Loan.find(key)
            .distinct('facilities', function (err, results) {
                if (err) return res.json({ success: false, message: err });
                Model.find().where('_id').in(results).exec((error, models) => {
                    if (error) return res.json({ success: false, message: error });
                    return res.json({ success: true, message: models });
                });
            });
    } else
        return res.json({ success: false, message: 'Trống' });

};