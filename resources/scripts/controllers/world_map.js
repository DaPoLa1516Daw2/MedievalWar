'use strict';


app.controller('worldMapCtrl', function($scope, rest, $rootScope) {

    $scope.filter = {};
    $scope.filter.world = $rootScope.world;
    $rootScope.stone = 0;
    $rootScope.gold = 0;
    $scope.world = {};





    $scope.return = function () {
        $rootScope.wMap =false;
    };

    $scope.search = function() {
        rest.game.map($scope.filter, function(m) {

            $scope.world.game = m;
            $scope.world.users = [];



            rest.user.getAll(function(users) {

                $scope.world.game.forEach(function(w) {

                    users.forEach(function(u){

                        if(w._id == u.game) {
                            $scope.world.users.push(u);
                        }
                    });

                });
            });
        });
    };

    $scope.search();

    $scope.attack = function(game) {

        var resources = $rootScope.game.power - game.defense;

        if (resources < 0) {
            resources = 0;
        }

        game.attacks.gold = game.attacks.gold +resources;
        game.attacks.stone = game.attacks.stone +resources;

        $rootScope.game.resources.gold =  $rootScope.game.resources.gold +resources;
        $rootScope.game.resources.stone = $rootScope.game.resources.stone +resources;
        $rootScope.attacked = true;

        console.log($rootScope.game.resources);
        rest.game.update({_id: game._id}, game, function() {
        });

    }



});