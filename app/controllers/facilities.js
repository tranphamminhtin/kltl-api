var Model = require('../models/facilities');

module.exports.getList = function (req, res) {
    Model.find(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: model });
    });
};

module.exports.add = function (req, res) {
    console.log(req.body);
    if(!req.file) return res.json({success: false, message: 'Không có hình'})
    const serverName = 'http://localhost';
    // const serverName = require('os').hostname();
    const serverPort = require('../../config').port;
    req.body.image = `${serverName}:${serverPort}/uploads/${req.file.filename}`;
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