'use strict';

var app = angular.module('MedievalWar', ['ngResource', 'ui.bootstrap', 'ui.select']);

app.run(['$rootScope', function($scope) {



}]);


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

        rest.user.save($scope.reg);
    };


}]);
'use strict';


app.controller('createModalCtrl', ['$scope', '$uibModalInstance', 'params' , function($scope, $uibModalInstance, params) {

    $scope.item = params;

    $scope.build = function() {
        $scope.item.level++;
        $uibModalInstance.close($scope.item);
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

    });

    return {
        user: user,
        game: game
    };

}]);