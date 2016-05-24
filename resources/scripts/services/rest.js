'use strict';

app.service('rest', ['$resource', function($resource)  {

    var user = $resource('/user/:user/:pass', {user: '@user', pass: "@pass"}, {
        getAll: {method:"GET", url:"/user/all", isArray: true}
    });

    var game = $resource('/game/:_id', {_id: "@_id"}, {
        map: { method:"GET", url:"/game/map/:world", isArray: true},
        update: {method:'PUT'}

    });

    return {
        user: user,
        game: game
    };

}]);