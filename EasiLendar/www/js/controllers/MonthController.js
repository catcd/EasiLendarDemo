/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 23/03/2015
 * type: month controller
 */

angular.module('MainApp.controllers.month', [])

.controller("MonthController", function($scope, $rootScope) {
    $scope.currentDate = new Date();
    $scope.currentDateNumber = $scope.currentDate.getDate();
    $scope.currentMonthNumber = $scope.currentDate.getMonth();
    $scope.currentYear = $scope.currentDate.getFullYear();
    $scope.bkgClass = [
                    'easi-jan-bkg', 'easi-feb-bkg', 'easi-mar-bkg', 'easi-apr-bkg', 'easi-may-bkg', 'easi-jun-bkg',
                    'easi-jul-bkg', 'easi-aug-bkg', 'easi-sep-bkg', 'easi-oct-bkg', 'easi-nov-bkg', 'easi-dec-bkg'
                    ];
    $scope.dayInWeek = ($scope.currentDate.getDay()-1 <0)? 6:$scope.currentDate.getDay()-1;             
    $scope.currentMonthString = $rootScope.months[$scope.currentMonthNumber];
    $scope.currentDayInWeek = $rootScope.weekDays[$scope.dayInWeek];
    $scope.buildCurrentMonth = function(){
        $scope.weeks = new Array(5);
        for(var i=0;i<5;i++){
            $scope.weeks[i] = {days: new Array(7)};
            for(var j=0;j<7;j++){
                $scope.weeks[i].days[j] = {numberDate: 0, month: 0}
            }
        }
        $scope.buildWeeks();
    }

    $scope.previousMonth = function(){
        $scope.currentMonthNumber = ($scope.currentMonthNumber-1 >= 0 ? 0 : 12) + ($scope.currentMonthNumber-1);
        $scope.currentMonthString = $rootScope.months[$scope.currentMonthNumber];
        if($scope.currentMonthNumber == 11) { $scope.currentYear --; }
        $scope.buildWeeks();
    };
    
    $scope.nextMonth = function(){
        $scope.currentMonthNumber = ($scope.currentMonthNumber+1) - ($scope.currentMonthNumber+1 > 11 ? 12 : 0);
        $scope.currentMonthString = $rootScope.months[$scope.currentMonthNumber];
        if($scope.currentMonthNumber == 0) { $scope.currentYear ++; }
        $scope.buildWeeks();
    }

    $scope.buildWeeks = function(){
    	$scope.newWeeks = angular.copy($scope.weeks);
        var firstDatePreviousMonth = new Date($scope.currentYear,$scope.currentMonthNumber,1);
        var dayOfFirstDate = firstDatePreviousMonth.getDay(); 
        var numberDaysPreviousMonth = (new Date($scope.currentYear,$scope.currentMonthNumber,0)).getDate();
        var numberDaysCurrentMonth = (new Date($scope.currentYear,$scope.currentMonthNumber+1,0)).getDate();
        var j = 0;

        //Show event of the first day in month
        var toDay = new Date();
        toDay = new Date(toDay.getFullYear(),toDay.getMonth(),toDay.getDate(),0,0,0,0);
        if($scope.currentMonthNumber == toDay.getMonth() && $scope.currentYear == toDay.getFullYear()){
            $scope.position = toDay;
        }
        else{ $scope.position = firstDatePreviousMonth; }

        //Build weeks and days in month
        $scope.newWeeks[0].days[dayOfFirstDate].numberDate = 1;
        $scope.newWeeks[0].days[dayOfFirstDate].month = $scope.currentMonthNumber;
        for(j=0;j<dayOfFirstDate;j++){
            $scope.newWeeks[0].days[j].numberDate = numberDaysPreviousMonth - (dayOfFirstDate-1-j);
            $scope.newWeeks[0].days[j].month =  ($scope.currentMonthNumber-1 < 0)? 11:($scope.currentMonthNumber-1);
        }
        for(j=6;j>dayOfFirstDate;j--){
            $scope.newWeeks[0].days[j].numberDate = 1 + (j-dayOfFirstDate);
            $scope.newWeeks[0].days[j].month =  $scope.currentMonthNumber;
        }
        for(var i=1;i<5;i++){
            for(j=0;j<7;j++){
                if(i==1) { var numberDaysMonth = numberDaysPreviousMonth; }
                else { numberDaysMonth = numberDaysCurrentMonth; }
                $scope.newWeeks[i].days[j].numberDate = ($scope.newWeeks[i-1].days[j].numberDate+7) - (($scope.newWeeks[i-1].days[j].numberDate+7) > numberDaysMonth ? numberDaysMonth:0);
                
                $scope.newWeeks[i].days[j].month =  $scope.currentMonthNumber;
                if(i >= 3 && $scope.newWeeks[i-1].days[j].numberDate+7 > numberDaysCurrentMonth){
                    $scope.newWeeks[i].days[j].month =  ($scope.currentMonthNumber+1 > 11)? 0:($scope.currentMonthNumber+1);
                }
            }
        }
        if($scope.newWeeks[4].days[6].numberDate < numberDaysCurrentMonth && $scope.newWeeks[4].days[6].month == $scope.currentMonthNumber) {
            var days = angular.copy($scope.newWeeks[4].days);
            for(j=0;j<7;j++){
                days[j].numberDate = (days[j].numberDate+7) - ((days[j].numberDate+7) > numberDaysCurrentMonth ? numberDaysCurrentMonth:0);
                days[j].month = $scope.currentMonthNumber;
                if($scope.newWeeks[4].days[j].numberDate+7 > numberDaysCurrentMonth){
                    days[j].month =  $scope.currentMonthNumber+1;
                }
            }
            $scope.newWeeks.push( {days:days} );
        }
        else { $scope.newWeeks.splice(5,1); }

        $scope.weeks = angular.copy($scope.newWeeks);
        delete $scope.newWeeks;
    }

    $scope.backgroundMonth = function(index){
        var className = 'bkg-style ' + $scope.bkgClass[index];
		return className;
    }
    $scope.position = new Date($scope.currentDate.getFullYear(),$scope.currentDate.getMonth(),$scope.currentDateNumber,0,0,0,0);
    $scope.bkgE = 'bkg';
    $scope.showListEvent = function(day,month,year){
    	if(month > $scope.currentMonthNumber){
    		if(month == 11 && $scope.currentMonthNumber == 0) { $scope.previousMonth(); }
    		else { $scope.nextMonth(); }
    	}
    	else if(month < $scope.currentMonthNumber){
    		if(month == 0 && $scope.currentMonthNumber == 11) { $scope.nextMonth(); }
    		else { $scope.previousMonth(); }
    	}
		$scope.position = new Date(year,month,day,0,0,0,0);
    }
})

.directive('differentMonth',function($document){
    return{
        restrict: 'A',
        scope: {
            isDifferent: "=differentMonth",
            isCurrentDay: "=currentDay"
        },
        link: function(scope,element,attr){
        	var month = attr.currentMonth;
        	var year = attr.currentYear;
        	var toDay = new Date();
            scope.$watch('isCurrentDay', function(){
            	if(scope.isCurrentDay == toDay.getDate() && scope.isDifferent == toDay.getMonth() 
            	   && year == toDay.getFullYear()){
            		element.addClass('current-date-style');
            	}
            })
            scope.$watch('isDifferent', function(){
            	if(scope.isDifferent != month){
            		element.addClass('different-month-color');
            	}
            })
            element.bind('click',function(){
                var id = '#' + scope.isDifferent + scope.isCurrentDay;
                //Using find() function of JQUERY !
                $document.find(id).prop('checked',true);
            })

            $document.bind('click',function(){
                if(element.children().prop('checked') == false){
                    element.removeClass('radio-month-selected');
                }
                else{
                    if(scope.isCurrentDay == toDay.getDate() && scope.isDifferent == toDay.getMonth() 
            	   	&& year == toDay.getFullYear()){ 
                        element.addClass('current-date-style'); 
                    }
                    else { element.addClass('radio-month-selected'); }
                }
            })
        }
    };
})
/*
.directive('dayHasEvent',function($rootScope,$document){
    return{
        restrict: 'A',
        scope: {
            haveEvent: '=dayHasEvent'
        },
        link: function(scope,element,attr){
            scope.$watch('eUser.uGmailCalendar',function(){
                var index = new Date(attr.yearHasEvent,attr.monthHasEvent,scope.haveEvent,0,0,0,0);
                var toDay = new Date();
                toDay = new Date(toDay.getFullYear(),toDay.getMonth(),toDay.getDate(),0,0,0,0);
                if($rootScope.eUser.uGmailCalendar[index] !== undefined){
                    element.parent().addClass('day-has-event');
                }
                if(index == toDay) { element.parent().removeClass('day-has-event'); }
            });
        }
    };
})*/

.directive('checkFirstDay',function($document){
    return{
        restrict: 'A',
        scope: {
            isFirstDay: '=checkFirstDay'
        },
        link: function(scope,element,attr){
            element.bind('click',function(){
                var currentMonth = (new Date()).getMonth();
                if(scope.isFirstDay !== currentMonth){
                    var id = '#' + scope.isFirstDay + '1';
                    //Using find() function of JQUERY !
                    $document.find(id).prop('checked',true);
                }
            });
        }
    };
})