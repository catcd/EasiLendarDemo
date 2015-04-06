/**
 * starter: Can Duy Cat
 * owner: Nguo Duc Dung
 * last update: 6/4/2015
 * type: list controller
 */

angular.module('MainApp.controllers.list', [])

.controller("ListController", function($scope, $rootScope, $ionicScrollDelegate, $location) {
    $scope.$watch('eUser.uGmailCalendar', function(){
        //console.log($rootScope.eUser.uGmailCalendar);
        //$scope.dayID = [];
        $scope.$watch('eUser.uGmailCalendar', function(){
            var count = 0;
            $scope.listEvents = new Array();
            for(var x in $rootScope.eUser.uGmailCalendar){
                    $scope.listEvents[count] = $rootScope.eUser.uGmailCalendar[x]; 
                    count++;
            }
        })

    });
	//set random background
	$scope.bkgE = 'bkg';
    var toDay = new Date();
    var string = toDay.toDateString();
    /*
    $scope.eventToDay = function(){
        alert(string);
        $location.hash(string);
        $ionicScrollDelegate.anchorScroll(true);
    }*/
})

.directive('backgroundEvent', function() {
    return {
        restrict: 'A',
        scope: {
            isType: '=backgroundEvent'
        },
        link: function(scope, element, attr) {
            var allBkgClass = ['birthday-background', 'holiday-background', 'hotel-background',
                'restaurant-background', 'ticket-background', 'event-color-1', 'event-color-2',
                'event-color-3', 'event-color-4', 'event-color-5'
            ];
            scope.$watch('isType', function() {
                if (scope.isType == 'bkg') {
                    element.addClass(allBkgClass[Math.floor((Math.random() * 10))]);
                }
            });
        }
    };
})


.directive('currentTime', function() {
    return {
        restrict: 'A',
        scope: {
            isToDay: '=currentTime'
        },
        link: function(scope, element, attr) {
            var toDay = new Date();
            var month = toDay.getMonth();
            var year = toDay.getFullYear();
            scope.$watch('isToDay', function() {
                if (scope.isToDay == toDay.getDate() && attr.currentMonth == month && attr.currentYear == year) {
                    element.addClass('current-date-list');
                }
            });

            element.bind('click',function(){
                alert(element.attr('id'));
            });
        }
    };
})

