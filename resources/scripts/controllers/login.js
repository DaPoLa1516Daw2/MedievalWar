'use strict';

app.controller('loginCtrl', ['$scope', 'rest', '$rootScope', function($scope, rest, $rootScope) {
    $scope.opt = 0;

    $scope.reg = {};
    $scope.log = {};

    /**
     * get the user from DB
     */
    $scope.login = function() {

        rest.user.get({user: $scope.log.username, pass: $scope.log.password}, function(u){
            $rootScope.user = u;
            $rootScope.wMap = false;
        }, function() {
            $scope.err = true;
        });

    };

    /**
     * add new user to DB
     */
    $scope.register = function() {

        rest.user.save($scope.reg, function() {
            $scope.ok = true;
        });
    };


}]);