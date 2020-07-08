var Model = require('../models/loan-facilities');
var Vote = require('../models/vote');

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
    Model.findByIdAndUpdate(req.params.id, {
        room: req.body.room,
        unit: req.body.unit,
        manager: req.body.manager,
        from: req.body.from,
        to: req.body.to,
        state: req.body.state,
        note: req.body.note,
        request: req.body.request
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
        Vote.remove({
            loanFacilities: req.params.id
        }, function (err, vote) {
            if (err) return res.json({ success: false, message: err });
            return res.json({ success: true, message: 'Xóa thành công' });
        });
    });
};

module.exports.searchByFacilities = function (req, res) {
    const facilities = req.query.facilities;
    if (req.query.manager) {
        const manager = req.query.manager;
        Model.find({
            facilities: facilities,
            manager: manager
        }, (err, model) => {
            if (err) return res.json({ success: false, message: err });
            return res.json({ success: true, message: model });
        });
    } else {
        if (req.query.room) {
            const room = req.query.room;
            Model.find({
                facilities: facilities,
                room: room
            }, (err, model) => {
                if (err) return res.json({ success: false, message: err });
                return res.json({ success: true, message: model });
            });
        }
        else {
            if (facilities) {
                Model.find({
                    facilities: facilities
                },
                    (err, model) => {
                        if (err) return res.json({ success: false, message: err });
                        return res.json({ success: true, message: model });
                    });
            }
            else
                return res.json({ success: false, message: 'Trống' });
        }
    }

}