'use strict';

const r = require('request').defaults({
    json: true
});

const async = require('async');
const redis = require('redis');
const client = redis.createClient(6379, '0.0.0.0');

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
                        } else {
                            callback(response.statusCode);
                        }
                    });
                },
                staff: (callback) => {
                    client.get('https://emerald-forest-031116-eyjafjallajokullm89.c9users.io:8081/staff', (error, staff) => {
                        if (error) throw error;
                        if (staff) {
                            callback(null, JSON.parse(staff));
                        } else {
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
					// Stores staff data in Redis for next request to /company endpoint
                                    //client.set('https://emerald-forest-031116-eyjafjallajokullm89.c9users.io:8081/staff', JSON.stringify(body.data), (error) => {
// Sets expiration for staff data cache to 10 seconds
					    client.setex('https://emerald-forest-031116-eyjafjallajokullm89.c9users.io:8081/staff', 10, JSON.stringify(body.data), (error) => {
                                        if (error) throw error;
                                    });
                                } else {
                                    callback(response.statusCode);
                                }
                            });

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

    app.get('/ping', (req, res) => res.json({
        pong: Date.now()
    }));
};
