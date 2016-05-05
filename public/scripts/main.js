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

app.controller('loginCtrl', ['$scope', 'rest', '$rootScope', function($scope, rest, $rootScope) {
    $scope.opt = 0;

    $scope.reg = {};
    $scope.log = {};

    $scope.login = function() {

        rest.user.get({user: $scope.log.username, pass: $scope.log.password}, function(u){
            console.log(u);
            $rootScope.user = u;
        }, function() {
            $scope.err = true;
        });

    };

    $scope.register = function() {

        rest.user.save($scope.reg);
    };


}]);
'use strict';

app.service('rest', ['$resource', function($resource)  {

    var user = $resource('/user/:user/:pass', {user: '@user', pass: "@pass"}, {

    });

    return {
        user: user
    };

}]);