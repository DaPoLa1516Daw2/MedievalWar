
app.controller('gameCtrl', ['$scope', 'rest', '$rootScope', '$uibModal', function($scope, rest, $rootScope, $uibModal) {


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

            setTimeout(function () {
                $scope.game[type].level++;
                console.log($scope.game[type], $scope.game[type].level);
                $scope.$apply();
            }, 6000)

        });
    };


}]);