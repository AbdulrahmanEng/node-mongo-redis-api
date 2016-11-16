'use strict';

const r = require('request').defaults({
    json: true
});

const async = require('async');

module.exports = function(app) {
    // GET company staff and customer data
    app.get('/company', (req, res) => {
        async.parallel({
                customer: (callback) => {
                    r({
                        uri: 'https://emerald-forest-031116-eyjafjallajokullm89.c9users.io:8080/customer'
                    }, (error, response, body) => {
                        if (error) {
                            callback({
                                service: 'customer',
                                error: error
                            });
                            return;
                        }
                        if (!error && response.statusCode === 200) {
                            callback(null, body);
                        }
                        else {
                            callback(response.statusCode);
                        }
                    });
                },
                staff: (callback) => {
                    r({
                        uri: 'https://emerald-forest-031116-eyjafjallajokullm89.c9users.io:8081/staff'
                    }, (error, response, body) => {
                        if (error) {
                            callback({
                                service: 'staff',
                                error: error
                            });
                        }
                        if (!error && response.statusCode === 200) {
                            callback(null, body);
                        }
                        else {
                            callback(response.statusCode);
                        }
                    });
                }
            },
            (error, results) => {
                res.json({
                    error: error,
                    results: results
                });
            });
    });
    
    app.get('/ping', (req, res) => res.json({pong: Date.now()}));
};