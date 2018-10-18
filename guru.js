angular.module('guru', [])
    .controller('guruCtrl', guruCtrl)

function guruCtrl($scope) {
    $scope.messages = [];

    $scope.sendMessage = function(message) {
        $scope.messages.push({
            text: message.text
        });
        message.text = '';
    };
}
