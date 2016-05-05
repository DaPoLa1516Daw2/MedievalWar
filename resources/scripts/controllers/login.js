'use strict';

app.controller('loginCtrl', ['$scope', 'rest', '$rootScope', function($scope, rest, $rootScope) {
    $scope.opt = 0;

    $scope.reg = {};
    $scope.log = {};

    $scope.login = function() {

        rest.user.get({user: $scope.log.username}, function(u){
            console.log(u);
            $rootScope.user = u;
        });

    };

    $scope.register = function() {

        rest.user.save($scope.reg);
    };


}]);