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