'use strict';


app.controller('worldMapCtrl', function($scope, rest, $rootScope) {

    $scope.filter = {};
    $scope.filter.world = $rootScope.world;
    $rootScope.stone = 0;
    $rootScope.gold = 0;

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

    $scope.attack = function(game) {

        game.attacks.gold = game.attacks.gold +500;
        game.attacks.stone = game.attacks.stone +500;

        $rootScope.gold = $rootScope.gold +500;
        $rootScope.stone = $rootScope.stone +500;
        $rootScope.attacked = true;

        rest.game.update({_id: game._id}, game, function() {
        });

    }



});