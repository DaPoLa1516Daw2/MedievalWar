'use strict';

var app = angular.module('MedievalWar', ['ngResource', 'ui.bootstrap', 'ui.select']);

app.run(['$rootScope', function($scope) {



}]);

'use strict';
/**
 * TODO function to Date
 * TODO function to milliseconds
 */

app.controller('gameCtrl', function($scope, rest, $rootScope, $uibModal, $timeout, $interval) {

    var keys = [];

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

                        keys.push(key);
                        //var timeout = function() {
                        //    console.log('ok', this.key);
                        //    $scope.game[this.key].level++;
                        //    delete $scope.game[this.key].finish;
                        //    _update();
                        //};
                        //
                        //timeout.key = key;
                        //
                        //$timeout(timeout, new Date($scope.game[key].finish)- new Date());

                    }
                }

            }
        }

        keys.forEach(function(k) {

            $timeout(function() {
                console.log('ok', k);
                $scope.game[k].level++;
                delete $scope.game[k].finish;
                _update();

            }, new Date($scope.game[k].finish)- new Date());
        })
    });

    $interval(function() {

        $scope.game.resources.gold = Math.round($scope.game.resources.gold + (($scope.game.resources.gold * 16) /100));
        $scope.game.resources.stone =  Math.round($scope.game.resources.stone + (($scope.game.resources.stone * 16) /100));
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
                $scope.game[type].level++;
                delete $scope.game[type].finish;
                _update();
            }, item.time);


        });
    };

    $scope.worldMap = function() {
        $rootScope.wMap = true;
    };

    function _update() {

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

    var filter = {};
    filter.world = $rootScope.world;

    rest.game.map(filter, function(m) {
        console.log(m);
    });

    $scope.return = function () {
        $rootScope.wMap =false;
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