var _ = require('lodash');
var customer = require('../models/customer.js');

module.exports = function(app) {

    /* Create */
    app.post('/customer', function(req, res) {
        var newcustomer = new customer(req.body);
        newcustomer.save(function(err) {
            if (err) {
                res.json({
                    info: 'error during customer create',
                    error: err
                });
            };
            res.json({
                info: 'customer created successfully'
            });
        });
    });

    /* Read */
    app.get('/customer', function(req, res) {
        customer.find(function(err, customers) {
            if (err) {
                res.json({
                    info: 'error during find customers',
                    error: err
                });
            };
            res.json({
                info: 'customers found successfully',
                data: customers
            });
        });
    });

    app.get('/customer/:id', function(req, res) {
        // findById takes MongoDB document id value
        customer.findById(req.params.id, function(err, customer) {
            if (err) {
                res.json({
                    info: 'error during find customer',
                    error: err
                });
            };
            if (customer) {
                res.json({
                    info: 'customer found successfully',
                    data: customer
                });
            }
            else {
                res.json({
                    info: 'customer not found'
                });
            }
        });
    });

    /* Update */
    app.put('/customer/:id', function(req, res) {
        customer.findById(req.params.id, function(err, customer) {
            if (err) {
                res.json({
                    info: 'error during find customer',
                    error: err
                });
            };
            if (customer) {
                _.merge(customer, req.body);
                customer.save(function(err) {
                    if (err) {
                        res.json({
                            info: 'error during customer update',
                            error: err
                        });
                    };
                    res.json({
                        info: 'customer updated successfully'
                    });
                });
            }

        });
    });

    /* Delete */
    app.delete('/customer/:id', function(req, res) {
        customer.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: 'error during remove customer',
                    error: err
                });
            };
            res.json({
                info: 'customer removed successfully'
            });
        });
    });


};
