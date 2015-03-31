/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 31/03/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.searchFilter', ['ngAnimate'])

.controller("SearchFilterController", function($rootScope, $scope, $ionicPopup) {
   		/*
   		$rootScope.eSearchFilter = {
			mTitle:'',
			mDuration:0,
			mLocation:'',

			mFrom:0,				//date Object
			mTo:0,					//date Object
			mFromDay:'',			//date Object
			mToDay:'',				// date Object

			mBreakfast: null,
			mLunch: null,			
			mDinner: null,
			mOffice: null,
			mHoliday: null
		};*/
	$scope.timeValues = {
		mDurationHour: 0,
		mDurationMinute: 15,
		mFromTime: null,
		mToTime: null,
		mFromDay: null,
		mToDay: null
	};
	var resetValues = $scope.timeValues;

	$scope.priorityTimes = [
						{ name: 'Breakfast', values: null, index: 0},
						{ name: 'Lunch', values: null, index: 1},
						{ name: 'Dinner', values: null, index: 2},
						{ name: 'Office', values: null, index: 3},
						{ name: 'Holiday', values: null, index: 4}
						];

	$scope.$watch('timeValues.mDurationHour',function(){ $scope.convertToMinute(); });
	$scope.$watch('timeValues.mDurationMinute',function(){ $scope.convertToMinute(); });
	$scope.$watch('timeValues.mFromTime',function(){
		$rootScope.eSearchFilter.mFrom = new Date($scope.timeValues.mFromTime);
		$scope.minTime = new Date($scope.timeValues.mFromTime);
	});
	$scope.$watch('timeValues.mToTime',function(){
		$rootScope.eSearchFilter.mTo = new Date($scope.timeValues.mToTime);
	});
	$scope.$watch('timeValues.mFromDay',function(){
		if($scope.timeValues.mFromDay !== null){ 
			var date = $scope.timeValues.mFromDay;
			$rootScope.eSearchFilter.mFromDay = new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0,0);
			$scope.minDate = $scope.timeValues.mFromDay;
		}
	});
	$scope.$watch('timeValues.mToDay',function(){
		if($scope.timeValues.mToDay !== null){  
			var date = $scope.timeValues.mToDay;
			$rootScope.eSearchFilter.mToDay = new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0,0);
		}
	});
	$scope.$watch('priorityTimes[0].values',function(){$rootScope.eSearchFilter.mBreakfast = $scope.priorityTimes[0].values; });
	$scope.$watch('priorityTimes[1].values',function(){$rootScope.eSearchFilter.mLunch = $scope.priorityTimes[1].values; });
	$scope.$watch('priorityTimes[2].values',function(){$rootScope.eSearchFilter.mDinner = $scope.priorityTimes[2].values; });
	$scope.$watch('priorityTimes[3].values',function(){$rootScope.eSearchFilter.mOffice = $scope.priorityTimes[3].values; });
	$scope.$watch('priorityTimes[4].values',function(){$rootScope.eSearchFilter.mHoliday = $scope.priorityTimes[4].values; });

	$scope.convertToMinute = function(){
		if($scope.timeValues.mDurationHour >= 0 && $scope.timeValues.mDurationHour < 24 
		   && $scope.timeValues.mDurationMinute >= 0 && $scope.timeValues.mDurationMinute < 60){
			$rootScope.eSearchFilter.mDuration = $scope.timeValues.mDurationHour*60 + $scope.timeValues.mDurationMinute;
		}
	};
	$scope.deleteValue = function(form){
		/*RESET VALUE*/
		$scope.timeValues = resetValues;
		$rootScope.eSearchFilter = {};
    	$scope.cancelMeeting();
		/* RESET FORM*/
		form.$setPristine();
  		form.$setUntouched();
  		$scope.mShow = false;
  		$scope.titleOfButton = 'ADVANCE FILTER';
  		$rootScope.goToState('profile');
	};

	$scope.mVip = true; //user is VIP
	$scope.mShow = false;
	$scope.showDay = true;
	$scope.showTime = false;
  	$scope.titleOfButton = 'ADVANCE FILTER';
    $scope.toggleFunc = function(){
    	if($scope.mVip == true){
            $scope.mShow = !$scope.mShow;
            if($scope.mShow == true) {$scope.titleOfButton = 'End';}
            else {$scope.titleOfButton = 'ADVANCE FILTER';}
    	}
    };
    $scope.showDate = function(){
    	$scope.showDay = !$scope.showDay;
    	$scope.showTime = !$scope.showTime;
    	if($scope.showTime == true){
    		$scope.timeValues.mDurationHour = 0;
    		$scope.timeValues.mDurationMinute = 1;
    	}
    	else {
    		$scope.timeValues.mDurationHour = 0;
    		$scope.timeValues.mDurationMinute = 15;
    	}
    }

    $scope.$watch("eFriend.fName",function(){
    	if($rootScope.eFriend.fName !== ''){ $scope.showDelButton = true; }
    });
    //remove someone from list of people whose you are appointing the time to meet
    $scope.cancelMeeting = function(){
    	$rootScope.eFriend.fName = '';
    	$scope.showDelButton = false;
    	$rootScope.goToState('profile');
    }
})

.directive('checkUncheckRadio', function($rootScope){
	return{
		restrict: 'A',
		scope:{
			isChecked: '='
		},
		link: function(scope,element,attr){
			var labelRadio = element.next();
			labelRadio.bind('mousedown',function(){
				if(element.prop("checked") == true){
		 			labelRadio.bind('mouseup',function(){
		 				setTimeout(function(){
		 					element.prop('checked',false);
		 				},5);
		 			});
			 		scope.isChecked = null;
		 		}
		 		else{
		 			labelRadio.bind('mouseup',function(){
		 				setTimeout(function(){
		 					element.prop('checked',true);
		 				},5);
		 			});
		 		}
			});
		}
	};
})

.directive('slideToggle', function() {  
  return {
    restrict: 'A',      
    scope:{
      isOpen: "=slideToggle"
    },  
    link: function(scope, element, attr) {
    	if(element.attr('class') !== 'hide-div'){ 
        	element.hide();
    	}
      	scope.$watch('isOpen', function(newVal,oldVal){
	        if(newVal !== oldVal){ 
	          element.stop().slideToggle("slow");
	        }
	    });
    }
  };  
})

.directive('changeIcon',function(){
	return{
		restrict: 'A',
		scope: {
			isChange: '=changeIcon'
		},
		link:function(scope,element,attr){
			scope.$watch('isChange',function(){
				if(scope.isChange == false){
					element.attr('class','icon ion-arrow-down-b');
				}
				else { element.attr('class','icon ion-arrow-up-b'); }
			});
		}
	};
})

.directive('autoFocusInput', function($timeout){
	return{
		restrict: 'A',
		scope:{
			maxlength: '=autoFocusInput'
		},
		link: function(scope,element,attr){
		  element.bind('input',function(){
		    if(element.val().length >= scope.maxlength){
			    $timeout(function(){
			      element.parent().parent().find('input')[1].focus();
			    });
			}
		  });
		}
	};
})
