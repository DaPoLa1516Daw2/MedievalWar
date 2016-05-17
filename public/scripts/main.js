'use strict';

var app = angular.module('MedievalWar', ['ngResource', 'ui.bootstrap', 'ui.select']);

app.run(['$rootScope', function($scope) {



}]);


app.controller('gameCtrl', function($scope, rest, $rootScope, $uibModal, $timeout) {


    rest.game.get({_id: $rootScope.user.game}, function(game){
        $scope.game = game;
        console.log($scope.game);
    });

    setInterval(function() {

        $scope.game.resources.gold = Math.round($scope.game.resources.gold + (($scope.game.resources.gold * 16) /100));
        $scope.game.resources.stone =  Math.round($scope.game.resources.stone + (($scope.game.resources.stone * 16) /100));
        $scope.$apply();
    //}, 600000);
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
            $scope.game[type] = item;

            $scope.game.resources.gold = $scope.game.resources.gold - item.gold;
            $scope.game.resources.stone = $scope.game.resources.stone - item.stone;

            //rest.game.update({_id: $scope.game._id}, $scope.game);

            //$timeout(function() {
            //    console.log('hola');
            //}, 1000);

            $timeout(function () {
                $scope.game[type].level++;
                console.log($scope.game[type], $scope.game[type].level);
                //rest.game.update({_id: $scope.game._id}, $scope.game);

            }, 6000)

        });
    };

    //function _update() {
    //    rest.game.update({_id: $scope.game._id}, $scope.game);
    //}


});
'use strict';

app.controller('loginCtrl', ['$scope', 'rest', '$rootScope', function($scope, rest, $rootScope) {
    $scope.opt = 0;

    $scope.reg = {};
    $scope.log = {};

    $scope.login = function() {

        rest.user.get({user: $scope.log.username, pass: $scope.log.password}, function(u){
            $rootScope.user = u;
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

    console.log(params);
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

app.service('rest', ['$resource', function($resource)  {

    var user = $resource('/user/:user/:pass', {user: '@user', pass: "@pass"}, {

    });

    var game = $resource('/game/:_id', {_id: "@_id"}, {
        update: {method:'PUT'}

    });

    return {
        user: user,
        game: game
    };

}]);