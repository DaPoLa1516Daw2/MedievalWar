'use strict';

module.exports = (schema, options) => {

    schema.add({
        createdDate: {type: Date, default: Date.now},
        updatedDate: {type: Date, default: Date.now}
    });

    schema.pre('save', next => {

        if(!this.createdDate) {
            this.createdDate = Date.now();
        }

        this.updatedDate = Date.now();
        next();
    });

    schema.pre('update', next => {
        this.updatedDate = Date.now();
        next();
    });

    schema.pre('findOneAndUpdate', next => {
        this.updatedDate = Date.now();
        next();
    });

    //if(options && options.index) {
    //    schema.path('_createdDate').index(options.index);
    //    schema.path('_updatedDate').index(options.index);
    //}

};
