/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 11/03/2015
 * type: day controller
 */

angular.module('MainApp.controllers.day', [])

.controller("DayController", function($scope) {
	$scope.currentDate=new Date();
    $scope.currentDateNumber = $scope.currentDate.getDate();
    $scope.currentMonthNumber = $scope.currentDate.getMonth();
    $scope.currentYear = $scope.currentDate.getFullYear(); 
/*Day*/
    $scope.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
/* Month*/
    $scope.months = [
                    'January', 'February','March', 'April', 'May',
                    'June', 'July', 'August', 'September','October',
                     'November', 'December'
                    ];
	$scope.cmonths = [
					  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.weeks = [
                {days: [
                    {numberDate: 1, month: 2}, {numberDate: 2, month: 2}, {numberDate: 3, month: 2}, {numberDate: 4, month: 2}, {numberDate: 5, month: 2}, {numberDate: 6, month: 2}, {numberDate: 7, month: 2}
                ]},
                {days: [
                    {numberDate: 8, month: 2}, {numberDate: 9, month: 2}, {numberDate: 10, month: 2}, {numberDate: 11, month: 2}, {numberDate: 12, month: 2}, {numberDate: 13, month: 2}, {numberDate: 14, month: 2}
                ]},
                {days: [
                    {numberDate: 15, month: 2}, {numberDate: 16, month: 2}, {numberDate: 17, month: 2}, {numberDate: 18, month: 2}, {numberDate: 19, month: 2}, {numberDate: 20, month: 2}, {numberDate: 21, month: 2}
                ]},
                {days: [
                    {numberDate: 22, month: 2}, {numberDate: 23, month: 2}, {numberDate: 24, month: 2}, {numberDate: 25, month: 2}, {numberDate: 26, month: 2}, {numberDate: 27, month: 2}, {numberDate: 28, month: 2}
                ]},
                {days: [
                    {numberDate: 29, month: 2}, {numberDate: 30, month: 2}, {numberDate: 31, month: 2}, {numberDate: 1, month: 3}, {numberDate: 2, month: 3}, {numberDate: 3, month: 3}, {numberDate: 4, month: 3}
                ]}
            ];
	
	$scope.currentMonthCstring = $scope.cmonths[$scope.currentMonthNumber];
    $scope.currentMonthString = $scope.months[$scope.currentMonthNumber];
    $scope.currentDayInWeek = $scope.days[$scope.currentDate.getDay()];
	 

	var sub;
	var add;
		if($scope.currentDayInWeek == 'Mon'){
			$scope.numberLastDayInWeek = $scope.currentDateNumber + 6;
			$scope.numberFirstDayInWeek = $scope.currentDateNumber - 0;
		}
		else if($scope.currentDayInWeek == 'Tue'){
			$scope.numberLastDayInWeek = $scope.currentDateNumber + 5;
			$scope.numberFirstDayInWeek = $scope.currentDateNumber - 2;
		}
		else if($scope.currentDayInWeek == 'Wed'){
			$scope.numberLastDayInWeek = $scope.currentDateNumber + 4;
			$scope.numberFirstDayInWeek = $scope.currentDateNumber - 3;
		}
		else if($scope.currentDayInWeek == 'Thu'){
			$scope.numberLastDayInWeek = $scope.currentDateNumber + 3;
			$scope.numberFirstDayInWeek = $scope.currentDateNumber - 4;
		}
		else if($scope.currentDayInWeek == 'Fri'){
			$scope.numberLastDayInWeek = $scope.currentDateNumber + 2;
			$scope.numberFirstDayInWeek = $scope.currentDateNumber - 5;
		}
		else if($scope.currentDayInWeek == 'Sat'){
			$scope.numberLastDayInWeek = $scope.currentDateNumber + 1;
			$scope.numberFirstDayInWeek = $scope.currentDateNumber - 6;
		}
		else{
			$scope.numberLastDayInWeek = $scope.currentDateNumber + 0;
			$scope.numberFirstDayInWeek = $scope.currentDateNumber - 7;
		}
		var firstDayInWeek = $scope.currentDate.getDay() - sub;
		
		$scope.lastDayInWeek = $scope.currentDate.getDay() + add;
		
	
    $scope.previousMonth = function(form){
        form.$setPristine();
        form.$setUntouched();
        $scope.currentMonthNumber = ($scope.currentMonthNumber-1 >= 0 ? 0 : 12) + ($scope.currentMonthNumber-1);
        $scope.currentMonthString = $scope.months[$scope.currentMonthNumber];
        if($scope.currentMonthNumber == 11) { $scope.currentYear --; }
        $scope.buildWeeks();
    };
	$scope.backgroundMonth = function(){
        if($scope.currentMonthString == 'January'){
            $scope.backgroundMonthName = 'bkg-01';
        }
        else if($scope.currentMonthString == 'February'){
            $scope.backgroundMonthName = 'bkg-02';
        }
        else if($scope.currentMonthString == 'March'){
            $scope.backgroundMonthName = 'bkg-03';
        }
        else if($scope.currentMonthString == 'April'){
            $scope.backgroundMonthName = 'bkg-04';
        }
        else if($scope.currentMonthString == 'May'){
            $scope.backgroundMonthName = 'bkg-05';
        }
        else if($scope.currentMonthString == 'June'){
            $scope.backgroundMonthName = 'bkg-06';
        }
        else if($scope.currentMonthString == 'July'){
            $scope.backgroundMonthName = 'bkg-07';
        }
        else if($scope.currentMonthString == 'August'){
            $scope.backgroundMonthName = 'bkg-08';
        }
        else if($scope.currentMonthString == 'September'){
            $scope.backgroundMonthName = 'bkg-09';
        }
        else if($scope.currentMonthString == 'October'){
            $scope.backgroundMonthName = 'bkg-10';
        }
        else if($scope.currentMonthString == 'November'){
            $scope.backgroundMonthName = 'bkg-11';
        }
        else{
            $scope.backgroundMonthName = 'bkg-12';
        }
        return $scope.backgroundMonthName;
    };
   /* $scope.previousMonth = function(form)
	{
		form.$setPristine();
        form.$setUntouched();
		if($scope.currentDateNumber == 1) {
			if($scope.currentMonthNumber == 3 )
			{
				
				if($scope.currentYear%4==0){$scope.currentDateNumber = 28;} else{$scope.currentDateNumber = 29;}
				$scope.currentMonthNumber = $scope.currentMonthNumber - 1
			}
			
			
			
			$scope.currentDateNumber =  $scope.currentDateNumber - 1;
				
	
			}
			$scope.currentDateNumber = ($scope.currentDateNumber-1 >= 0 ? 0 : 28) + ($scope.currentDateNumber-1);
			$scope
		$scope.currentDateNumber = ($scope.currentDateNumber-1 >= 0 ? 0 : 30) + ($scope.currentDateNumber-1);
		 
	};*/
})
