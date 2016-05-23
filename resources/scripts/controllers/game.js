'use strict';
/**
 * TODO function to Date
 * TODO function to milliseconds
 */

app.controller('gameCtrl', function($scope, rest ,$rootScope, $uibModal, $timeout, $interval) {

    //var keys = [];

    if($rootScope.attacked) {
        $scope.game = $rootScope.game;
        _update();
        delete $rootScope.attacked;
    }

    rest.game.get({_id: $rootScope.user.game}, function(game){

        $scope.game = game;
        $rootScope.world = game.world;
        $rootScope.region = game.region;

        for(var key in $scope.game) {
            if($scope.game.hasOwnProperty(key)) {

                if($scope.game[key].finish) {

                    if((new Date($scope.game[key].finish) - new Date()) <= 0 ) {

                        $scope.game[key].level++;
                        delete $scope.game[key].finish;

                    }else {


                        $timeout(function(key) {
                            $scope.game[key].level++;
                            delete $scope.game[key].finish;

                            $scope.game[key].gold = $scope.game[key].gold + $scope.game[key].gold * 0.2;
                            $scope.game[key].stone = $scope.game[key].stone + $scope.game[key].stone * 0.2;
                            $scope.game[key].time = $scope.game[key].time + $scope.game[key].time * 0.2;
                            if(key == 'goldMine' || key == 'stoneMine') {

                                $scope.game[key].income = $scope.game[key].income + $scope.game[key].income * 0.2;

                            }

                            _update();
                        }, new Date($scope.game[key].finish)- new Date(),false ,key);

                    }
                }

            }
        }

        $scope.game.resources.gold = $scope.game.resources.gold - $scope.game.attacks.gold;
        $scope.game.resources.stone = $scope.game.resources.gold - $scope.game.attacks.stone;
        $scope.game.attacks.gold = 0;
        $scope.game.attacks.stone = 0;

        if($scope.game.resources.gold < 0) {
            $scope.game.resources.gold = 0;
        }

        if($scope.game.resources.stone < 0) {
            $scope.game.resources.stone = 0;
        }

    });

    $interval(function() {

        $scope.game.resources.gold = Math.round($scope.game.resources.gold + (($scope.game.goldMine.income * 16) /100));
        $scope.game.resources.stone =  Math.round($scope.game.resources.stone + (($scope.game.stoneMine.income * 16) /100));
        _update();

    }, 600000);

    $scope.create = function(type) {

        $uibModal.open({
            animation: true,
            templateUrl: '/partials/modals/create.html',
            controller: 'createModalCtrl',
            keyboard: false,
            backdrop: 'static',
            resolve: {
                params:function() {

                    var item = $scope.game[type];
                    var partida = {};
                    item.type = type;
                    partida.item = item;
                    partida.gold = $scope.game.resources.gold;
                    partida.stone = $scope.game.resources.stone;

                    return partida;
                }
            },
            size: 'lg'

        }).result.then(function(item) {

            delete  item.type;

            item.finish = new Date() - new Date(0) + item.time;

            $scope.game[type] = item;



            $scope.game.resources.gold = $scope.game.resources.gold - item.gold;
            $scope.game.resources.stone = $scope.game.resources.stone - item.stone;
            _update();

            $timeout(function() {

                if(type == 'warrior' || type == 'archer') {
                    $scope.game[type].number++;
                }else {
                    $scope.game[type].level++;
                }

                delete $scope.game[type].finish;

                if (type != 'warrior' && type != 'archer') {

                    $scope.game[type].gold = $scope.game[type].gold + $scope.game[type].gold * 0.2 + 50;
                    $scope.game[type].stone = $scope.game[type].stone + $scope.game[type].stone * 0.2 +50;
                    $scope.game[type].time = $scope.game[type].time + $scope.game[type].time * 0.2;
                    if(type == 'goldMine' || type == 'stoneMine') {

                        $scope.game[type].income = $scope.game[type].income + $scope.game[type].income * 0.2;

                    }
                }


                _update();
            }, item.time);


        });
    };

    $scope.worldMap = function() {
        $rootScope.game = $scope.game;
        $rootScope.wMap = true;
    };

    function _update() {

        if( $scope.game.tower.level > 0 && $scope.game.wall.level > 0) {
            $scope.game.defense = $scope.game.tower.defense + $scope.game.wall.defense;
        }else if($scope.game.tower.level > 0 && $scope.game.wall.level == 0) {
            $scope.game.defense = $scope.game.tower.defense
        } else if($scope.game.tower.level == 0 && $scope.game.wall.level > 0) {
            $scope.game.defense =  $scope.game.wall.defense;
        } else {
            $scope.game.defense = 0;
        }

        $scope.game.power = $scope.game.warrior.attack * $scope.game.warrior.number +  $scope.game.archer.attack * $scope.game.archer.number;

        rest.game.update({_id: $scope.game._id}, $scope.game, function() {
        });
    }


});