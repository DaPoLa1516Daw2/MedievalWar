'use strict';

var app = angular.module('MedievalWar', ['ngResource', 'ui.bootstrap', 'ui.select']);

app.run(['$rootScope', function($scope) {

    //syncdb._init();

    //auth.watch(function(user) {
    //    $scope.user = user;
    //
    //});

    //auth.isLogged(function(user) {
    //    $scope.user = user;
    //});

}]);

'use strict';

app.controller('loginCtrl', ['$scope', 'rest', function($scope, rest) {
    $scope.opt = 0;

    $scope.user = {};

    $scope.login = function() {

        rest.user.get({_id: $scope.user.username});

    };

    $scope.register = function() {
        console.log($scope.user);
        rest.user.save($scope.user);
    };


}]);
'use strict';

app.service('rest', ['$resource', function($resource)  {

    var user = $resource('/user/:user', {trip: '@user'}, {

    });

    return {
        user: user
    };

}]);