'use strict';

module.exports = (req, res, next) => {

    if(req.method === 'POST' || req.method === 'PUT') {
        delete req.body.$promise;
        delete req.body.$resolved;
    }
    next();
};
