var _ = require('lodash');
var staff = require('../models/staff.js');

module.exports = function(app) {

    /* CREATE staff member */
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
                info: 'staff member created successfully'
            });
        });
    });

    /* GET all staff */
    app.get('/staff', function(req, res) {
        staff.find(function(err, staff) {
            if (err) {
                res.json({
                    info: 'error finding staff',
                    error: err
                });
            }
            
            setTimeout(()=>{
            res.json({
                info: 'staff found successfully',
                data: staff
            });  
            }, 3000);
        });
    });

    /* GET individual staff member */
    app.get('/staff/:id', function(req, res) {
        // findById takes MongoDB document id value
        staff.findById(req.params.id, function(err, staff) {
            if (err) {
                res.json({
                    info: 'error during staff search',
                    error: err
                });
            }
            if (staff) {
                res.json({
                    info: 'staff member found successfully',
                    data: staff
                });
            }
            else {
                res.json({
                    info: 'staff member not found'
                });
            }
        });
    });

    /* UPDATE staff member */
    app.put('/staff/:id', function(req, res) {
        staff.findById(req.params.id, function(err, staff) {
            if (err) {
                res.json({
                    info: 'error during staff search',
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
                        info: 'staff member updated successfully'
                    });
                });
            }

        });
    });

    /* DELETE staff member */
    app.delete('/staff/:id', function(req, res) {
        staff.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: 'error during staff member removal',
                    error: err
                });
            }
            res.json({
                info: 'staff member removed successfully'
            });
        });
    });
    
    app.get('/ping', (req, res) => res.json({pong: Date.now()}));
};