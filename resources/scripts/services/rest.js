'use strict';

app.service('rest', ['$resource', function($resource)  {

    var user = $resource('/user/:user', {trip: '@user'}, {

    });

    return {
        user: user
    };

}]);