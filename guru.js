angular.module('guru', [])
    .controller('guruCtrl', guruCtrl)
    .directive('conversation', conversationDirective);


var stashedComments = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "insperation.json",
        // 'url': "data.2.json",
        'dataType': "json",
        'success': function(data) {
            json = data;
        }
    });
    return json;
})();

var comments_json = stashedComments;
var index = 0;

function guruCtrl($scope) {
    $scope.messages = [];

    $scope.sendMessage = function(message) {
        $scope.messages.push({
            text: message.text,
            response: consultGuru(message.text),
            number: index
        });

        index++;
        message.text = '';
        console.log($scope.messages)
    };

    function consultGuru(userReply) {
        return getRandomReply()
    }

    function getRandomReply() {
        let index = Math.floor(Math.random() * (comments_json["allData"].length - 1));
        return comments_json["allData"][index]
    }
}

function conversationDirective() {
    return {
        scope: {
            content: '='
        },
        restrict: 'E',
        replace: 'true',
        template: (
            '<div class="speech-bubble">' +
            '{{content}}' +
            '</div>'
        ),
    };
}
