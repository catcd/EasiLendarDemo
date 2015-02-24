/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 24/02/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.result', [])

.controller(
    "ResultController",
    function($scope, $ionicPopup) {
        $scope.numOfOps = 5;
        $scope.options = [{
            score: 1,
            date: "01/02/2015",
            begin: "02:30",
            end: "05:00"
        }, {
            score: 2,
            date: "02/02/2015",
            begin: "14:00",
            end: "23:30"
        }, {
            score: 3,
            date: "06/02/2015",
            begin: "06:45",
            end: "08:50"
        }, {
            score: 4,
            date: "10/02/2015",
            begin: "08:30",
            end: "18:30"
        }, {
            score: 5,
            date: "11/02/2015",
            begin: "15:00",
            end: "17:50"
        }];

        $scope.addOption = function(option) {
            $scope.options.push(option);
            $scope.numOfOps++;
        };

        $scope.next = function() {
            window.alert("You click next");
        };

        $scope.selectOption = function(option) {
            window.alert("You select option " + option.score);
        };

        $scope.display = function(option) {
            $scope.option = option.score + ". " + option.date + ": From " + option.begin + " - To " + option.end;
            return $scope.option;
        }
    })
