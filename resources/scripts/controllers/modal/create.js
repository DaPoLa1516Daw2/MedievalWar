'use strict';

/**
 * modal controller
 */
app.controller('createModalCtrl', ['$scope', '$uibModalInstance', 'params' , function($scope, $uibModalInstance, params) {

    $scope.item = params.item;

    var gold = params.gold;
    var stone = params.stone;

    /**
     * function to build a item
     */
    $scope.build = function() {
        //$scope.item.level++;
        if(gold >= $scope.item.gold && stone >= $scope.item.stone) {
            $uibModalInstance.close($scope.item);
        }
    };

    /**
     * modal exit without build
     */
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}]);