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

//I need a function that takes a json of catagories and fills it with the right json stuff. 

function buildDictionary(input_json) {

}

var comments_json = stashedComments;
var index = 0;
var quote_dictionary_by_catagory = buildDictionary(comments_json)

console.log(quote_dictionary_by_catagory)







function guruCtrl($scope) {
    $scope.messages = [];

    $scope.quote = "hi"

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
