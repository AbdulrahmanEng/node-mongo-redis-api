'use strict';

const _ = require('lodash');

module.exports = (app) => {
    let _customers = [];

    /* Create */
    app.post('/customer', (req, res) => {
        _customers.push(req.body);
        res.json({
            info: 'customer created successfully'
        });
    });

    /* Read */
    app.get('/customer', (req, res) => {
        res.send(_customers);
    });

    app.get('/customer/:id', (req, res) => {
        res.send(_.find(_customers, {
            name: (req.params.id)
        }));
    });

    /* Update */
    app.put('/customer/:id', (req, res) => {
        let index = _.findIndex(
            _customers, {
                name: (req.params.id)
            }
        );
        _.merge(_customers[index], req.body);
        res.json({
            info: 'customer updated sucessfully'
        });
    });

    /* Delete */
    app.delete('/customer/:id', (req, res) => {
        _.remove(_customers, (cat) => {
            return customer.name === (req.params.id);
        });
        res.json({
            info: 'customer removed sucessfully'
        });
    });
}
