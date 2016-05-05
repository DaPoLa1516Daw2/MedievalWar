'use strict';

app.service('rest', ['$resource', function($resource)  {

    var user = $resource('/user/:user', {user: '@user'}, {

    });

    return {
        user: user
    };

}]);