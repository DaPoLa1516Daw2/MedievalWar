'use strict';


function HttpError(status, message) {

    var argl = arguments.length;

    if(argl === 0) {
        status = 500;
        message = 'Internal Server Error';

    } else if(argl === 1 && typeof status === 'string') {
        message = status;
        status = 500;

    } else if(argl === 1 && status instanceof Error) {
        status = 500;
        message = status.message;
    }

    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
}

Object.setPrototypeOf(HttpError, Error);


module.exports = HttpError;
