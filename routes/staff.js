var _ = require('lodash');
var staff = require('../models/staff.js');

module.exports = function(app) {

    /* Create */
    app.post('/staff', function(req, res) {
        var newstaff = new staff(req.body);
        newstaff.save(function(err) {
            if (err) {
                res.json({
                    info: 'error during staff create',
                    error: err
                });
            }
            res.json({
                info: 'staff created successfully'
            });
        });
    });

    /* Read */
    app.get('/staff', function(req, res) {
        staff.find(function(err, staffs) {
            if (err) {
                res.json({
                    info: 'error during find staffs',
                    error: err
                });
            }
            res.json({
                info: 'staff found successfully',
                data: staffs
            });
        });
    });

    app.get('/staff/:id', function(req, res) {
        // findById takes MongoDB document id value
        staff.findById(req.params.id, function(err, staff) {
            if (err) {
                res.json({
                    info: 'error during find staff',
                    error: err
                });
            }
            if (staff) {
                res.json({
                    info: 'staff found successfully',
                    data: staff
                });
            }
            else {
                res.json({
                    info: 'staff not found'
                });
            }
        });
    });

    /* Update */
    app.put('/staff/:id', function(req, res) {
        staff.findById(req.params.id, function(err, staff) {
            if (err) {
                res.json({
                    info: 'error during find staff',
                    error: err
                });
            }
            if (staff) {
                _.merge(staff, req.body);
                staff.save(function(err) {
                    if (err) {
                        res.json({
                            info: 'error during staff update',
                            error: err
                        });
                    }
                    res.json({
                        info: 'staff updated successfully'
                    });
                });
            }

        });
    });

    /* Delete */
    app.delete('/staff/:id', function(req, res) {
        staff.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: 'error during remove staff',
                    error: err
                });
            }
            res.json({
                info: 'staff removed successfully'
            });
        });
    });
};
