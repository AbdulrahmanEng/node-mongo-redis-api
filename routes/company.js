'use strict';

const r = require('request').defaults({
    json: true
});

module.exports = function(app){
    // Read
    app.get('/company', (req, res) => {
        r({uri: 'https://emerald-forest-031116-eyjafjallajokullm89.c9users.io:8081/staff'}, (error, response, body) => {
            if(!error && response.statusCode === 200){
                res.json(body);
            } else {
                res.send(response.statusCode);
            }
        });
    });
};