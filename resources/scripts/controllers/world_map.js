'use strict';


app.controller('worldMapCtrl', function($scope, rest, $rootScope) {

    $scope.filter = {};
    $scope.filter.world = $rootScope.world;

    rest.game.map($scope.filter, function(m) {
        $scope.world = m;
    });

    $scope.return = function () {
        $rootScope.wMap =false;
    };

    $scope.search = function() {
        rest.game.map($scope.filter, function(m) {
            $scope.world = m;
        });
    };


});