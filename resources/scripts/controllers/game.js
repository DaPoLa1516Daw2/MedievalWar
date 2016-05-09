
app.controller('gameCtrl', ['$scope', 'rest', '$rootScope', '$uibModal', function($scope, rest, $rootScope, $uibModal) {


    rest.game.get({_id: $rootScope.user.game}, function(game){
        $scope.game = game;
        console.log($scope.game);
    });



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
                    item.type = type;
                    console.log(item);
                    return item;
                }
            },
            size: 'lg'
        }).result.then(function(item) {
            delete  item.type;
            $scope.game[type] = item;
        });
    }

}]);