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