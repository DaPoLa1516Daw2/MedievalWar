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