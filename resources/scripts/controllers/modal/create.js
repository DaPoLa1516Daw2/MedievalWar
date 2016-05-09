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