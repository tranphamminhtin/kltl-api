var Model = require('../models/vote');

module.exports.getList = function (req, res) {
    Model.find(function (err, model) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: model });
    });
};

module.exports.add = function (req, res) {
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
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, model) {
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

module.exports.getVoteByIdLoanFa = function (req, res) {
    Model.find({
        loanFacilities: req.params.idLoan
    }, function (err, vote) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: vote });
    });
}