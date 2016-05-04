'use strict';

app.controller('loginCtrl', ['$scope', 'rest', function($scope, rest) {
    $scope.opt = 0;

    $scope.user = {};

    $scope.login = function() {

    };

    $scope.register = function() {
        console.log($scope.user);
        rest.user.save($scope.user);
    };
}]);