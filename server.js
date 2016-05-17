'use strict';

const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./api/http/routes');
const config = require('./api/lib/config');


let app = express();

app.set('port', config.http.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {

    err.status = err.status || 500;
    err.message = err.message || 'Internal Server Error';

    res.status(err.status);
    res.render('error', {
        status: err.status,
        message: err.message,
        stack: app.get('env') === 'development' ? err.stack : ''
    });

});

let server = app.listen(config.http.port);

server.on('listening', () => {
    //console.log(`\033[32mServer listening on port ${port}\033[0m`);
    //console.log(process.env.DEBUG);
    console.log(`Server listening on port ${config.http.port}`);

    //Init mongoose connection
    require('./api/db/db.js');

    //Http listening hook
    //require('./api/http/listening')();

});

server.on('error', err => {

    if(err.syscall !== 'listen') {
        throw err;
    }

    switch(err.code) {
        case 'EACCES':
            console.error(`Port ${config.http.port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${config.http.port} is already in use`);
            process.exit(1);
            break;
        default:
            throw err;
    }

});
