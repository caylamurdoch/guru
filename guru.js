angular.module('guru', [])
    .controller('guruCtrl', guruCtrl)


var stashedComments = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "data.2.json",
        'dataType': "json",
        'success': function(data) {
            // console.log("success data:", data)
            json = data;
        }
    });
    return json;
})();

// var comments_json = JSON.parse('data.2.json');
var comments_json = stashedComments

console.log(comments_json)
console.log(comments_json["allData"][0])



function getRandomReply() {

}

function guruCtrl($scope) {
    $scope.messages = [];

    $scope.sendMessage = function(message) {
        $scope.messages.push({
            text: message.text
        });
        message.text = '';
    };


}
