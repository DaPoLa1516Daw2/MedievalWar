/**
 * TODO function to Date
 * TODO function to milliseconds
 */

app.controller('gameCtrl', function($scope, rest, $rootScope, $uibModal, $timeout, $interval) {


    rest.game.get({_id: $rootScope.user.game}, function(game){
        $scope.game = game;

        for(var key in $scope.game) {
            if($scope.game.hasOwnProperty(key)) {

                if($scope.game[key].finish) {

                    if((new Date($scope.game[key].finish) - new Date()) <= 0 ) {

                        $scope.game[key].level++;
                        delete $scope.game[key].finish;

                    }else {

                        var timeout = function() {
                            console.log('ok', this.key);
                            $scope.game[this.key].level++;
                            delete $scope.game[this.key].finish;
                            _update();
                        };

                        timeout.key = key;

                        $timeout(timeout, new Date($scope.game[key].finish)- new Date());

                    }
                }

            }
        }
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