/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 19/04/2015
 * type: paticular controller
 */

/*SEARCH-FILTER CONTROLLER*/
angular.module('MainApp.controllers.searchFilter', [])

.controller("SearchFilterController", function($rootScope, $scope, eSearchFilter, eSettings) {
	//Using eSearchFilter, eSettings factory
	$scope.eSearchFilter = eSearchFilter;
	$scope.eSettings = eSettings;

	$scope.timeValues = {
		mDurationHour: $scope.eSettings.sDefaultDuration / 60,
		mDurationMinute: $scope.eSettings.sDefaultDuration % 60,
		mFromTime: null,
		mToTime: null,
		mFromDay: new Date(),
		mToDay: new Date()
	};
	var newSearchFilter = angular.copy($scope.eSearchFilter);
	var resetValues = angular.copy($scope.timeValues);

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
		$scope.eSearchFilter.mFrom = new Date($scope.timeValues.mFromTime);
		$scope.minTime = new Date($scope.timeValues.mFromTime);
	});
	$scope.$watch('timeValues.mToTime',function(){
		$scope.eSearchFilter.mTo = new Date($scope.timeValues.mToTime);
	});
	$scope.$watch('timeValues.mFromDay',function(){
		if($scope.timeValues.mFromDay !== null){ 
			var date = $scope.timeValues.mFromDay;
			$scope.eSearchFilter.mFromDay = new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0,0);
			$scope.minDate = $scope.timeValues.mFromDay;
		}
	});
	$scope.$watch('timeValues.mToDay',function(){
		if($scope.timeValues.mToDay !== undefined){  
			var date = $scope.timeValues.mToDay;
			$scope.eSearchFilter.mToDay = new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0,0);
		}
	});
	$scope.$watch('priorityTimes[0].values',function(){$scope.eSearchFilter.mBreakfast = $scope.priorityTimes[0].values; });
	$scope.$watch('priorityTimes[1].values',function(){$scope.eSearchFilter.mLunch = $scope.priorityTimes[1].values; });
	$scope.$watch('priorityTimes[2].values',function(){$scope.eSearchFilter.mDinner = $scope.priorityTimes[2].values; });
	$scope.$watch('priorityTimes[3].values',function(){$scope.eSearchFilter.mOffice = $scope.priorityTimes[3].values; });
	$scope.$watch('priorityTimes[4].values',function(){$scope.eSearchFilter.mHoliday = $scope.priorityTimes[4].values; });

	$scope.convertToMinute = function(){
		if($scope.timeValues.mDurationHour >= 0 && $scope.timeValues.mDurationHour < 24 
		   && $scope.timeValues.mDurationMinute >= 0 && $scope.timeValues.mDurationMinute < 60){
			$scope.eSearchFilter.mDuration = $scope.timeValues.mDurationHour*60 + $scope.timeValues.mDurationMinute;
		}
	};

	//previous state of search-filter state
	$scope.preState = '';
	$rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            if (toState.name == 'searchFilter') {
                $scope.preState = fromState.name;
            }
        })

	$scope.submit = function(form) {
        if (form.$valid) {
		   $rootScope.goToState('result');
		}
    };

	$scope.deleteValue = function(form){
		/*RESET VALUE*/
		$scope.timeValues = angular.copy(resetValues);
		$scope.eSearchFilter = angular.copy(newSearchFilter);
		$scope.list = [];
		/* RESET FORM*/
		form.$setPristine();
  		form.$setUntouched();
  		var inputs = document.getElementsByTagName('input');
  		for(var i=0; i<inputs.length; i++){
  			if(inputs[i].checked !== undefined || inputs[i].checked !== null){
  				inputs[i].checked = false;
  			}
  		}

  		$scope.mShow = false;
  		$scope.titleOfButton = 'ADVANCE FILTER';

  		if($scope.preState == 'profile'){
  			$rootScope.goToState('profile');
  		}
  		else { $rootScope.goHome(); }
	};

	$scope.mVip = 1;
	$scope.mShow = false;
	$scope.showDay = true;
	$scope.showTime = false;
  	$scope.titleOfButton = 'ADVANCE FILTER';
    $scope.toggleFunc = function(){
    	if($scope.mVip == 1){
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
    		$scope.timeValues.mDurationHour = $scope.eSettings.sDefaultDuration / 60;
    		$scope.timeValues.mDurationMinute = $scope.eSettings.sDefaultDuration % 60;
    	}
    }
})

.directive('checkUncheckRadio', function(){
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
			if(scope.isChange == false){
				element.attr('class','icon ion-arrow-down-b');
			}
			else { element.attr('class','icon ion-arrow-up-b'); }
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
