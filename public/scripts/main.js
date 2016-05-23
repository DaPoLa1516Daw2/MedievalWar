'use strict';

var app = angular.module('MedievalWar', ['ngResource', 'ui.bootstrap', 'ui.select']);

app.run(['$rootScope', function($scope) {



}]);

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
'use strict';

app.controller('loginCtrl', ['$scope', 'rest', '$rootScope', function($scope, rest, $rootScope) {
    $scope.opt = 0;

    $scope.reg = {};
    $scope.log = {};

    $scope.login = function() {

        rest.user.get({user: $scope.log.username, pass: $scope.log.password}, function(u){
            $rootScope.user = u;
            $rootScope.wMap = false;
        }, function() {
            $scope.err = true;
        });

    };

    $scope.register = function() {

        rest.user.save($scope.reg, function() {
            $scope.ok = true;
        });
    };


}]);
'use strict';


app.controller('createModalCtrl', ['$scope', '$uibModalInstance', 'params' , function($scope, $uibModalInstance, params) {

    $scope.item = params.item;

    var gold = params.gold;
    var stone = params.stone;

    $scope.build = function() {
        //$scope.item.level++;
        if(gold >= $scope.item.gold && stone >= $scope.item.stone) {
            $uibModalInstance.close($scope.item);
        }
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}]);
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

        var resources = $rootScope.game.power - game.defense;

        if (resource < 0) {
            resources = 0;
        }

        game.attacks.gold = game.attacks.gold +resources;
        game.attacks.stone = game.attacks.stone +resources;

        $rootScope.game.resources.gold =  $rootScope.game.resources.gold +resources;
        $rootScope.game.resources.stone = $rootScope.game.resources.stone +resources;
        $rootScope.attacked = true;

        rest.game.update({_id: game._id}, game, function() {
        });

    }



});
'use strict';

app.service('rest', ['$resource', function($resource)  {

    var user = $resource('/user/:user/:pass', {user: '@user', pass: "@pass"}, {

    });

    var game = $resource('/game/:_id', {_id: "@_id"}, {
        map: { method:"GET", url:"/game/map/:world", isArray: true},
        update: {method:'PUT'}

    });

    return {
        user: user,
        game: game
    };

}]);