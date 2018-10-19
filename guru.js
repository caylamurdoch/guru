angular.module('guru', [])
    .controller('guruCtrl', guruCtrl)
    .directive('conversation', conversationDirective);

var stashedComments = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "inspiration.json",
        'dataType': "json",
        'success': function(data) {
            json = data;
        }
    });
    return json;
})();

var comments_json = stashedComments;
var index = 0;

var running_list = []
var fade_time = 100
var increment = 5
var long_pause = 3000
var active_window = 0

function fade_out($scope, $timeout, wait) {
    let old_window = active_window

    if (wait <= 0) {
        $scope.quote = ''
        return
    }
    $timeout(function() {
        if (active_window != old_window) {
            return
        }
        let new_opacity = wait * (1 / 100)

        $scope.quote_style = {
            opacity: new_opacity
        }

        wait -= increment
        fade_out($scope, $timeout, wait)
    }, wait);
}

function fade_in($scope, $timeout, wait, active_window) {
    let old_window = active_window

    if (wait >= fade_time) {
        $timeout(function() {
            if (active_window != old_window) {
                return
            }
            fade_out($scope, $timeout, fade_time)
        }, long_pause);
        return
    }

    $timeout(function() {
        if (active_window != old_window) {
            return
        }
        let new_opacity = wait * (1 / 100)

        $scope.quote_style = {
            opacity: new_opacity
        }

        wait += increment
        fade_in($scope, $timeout, wait)
    }, wait);
}

function fade($scope, $timeout, text) {
    active_window = Math.random()
    $scope.quote = text

    $scope.quote_style = {
        opacity: 1
    }

    fade_in($scope, $timeout, 0, active_window)
}

function guruCtrl($scope, $timeout) {
    $scope.messages = [];

    fade($scope, $timeout, "Ask me anything!")

    $scope.sendMessage = function(message) {

        $scope.messages.push({
            text: message.text,
            response: consultGuru(message.text),
            number: index
        });

        index++;
        message.text = '';

    };

    function consultGuru(userReply) {

        return getRandomReply()
    }

    function getRandomReply() {

        let index = Math.floor(Math.random() * (comments_json["allData"].length - 1));

        $timeout(function() {
            fade($scope, $timeout, comments_json["allData"][index])


        }, 500);
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
