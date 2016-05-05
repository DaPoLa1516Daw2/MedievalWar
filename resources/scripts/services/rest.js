'use strict';

app.service('rest', ['$resource', function($resource)  {

    var user = $resource('/user/:user/:pass', {user: '@user', pass: "@pass"}, {

    });

    return {
        user: user
    };

}]);