/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 11/03/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.searchFilter', ['ngAnimate'])

.controller("SearchFilterController", function($rootScope, $scope, $ionicPopup) {
   		$rootScope.eSearchFilter = {
			mTitle:'',
			mDuration:0,
			mLocation:'',
			mMessage:'',
			mFrom:0,			
			mTo:0,		
			mFromDay:0,
			mToDay:0,		
			mBreakfast: null,
			mLunch: null,			//Avoid=true /Prioritize=false
			mDinner: null,
			mOffice: null,
			mHoliday: null
		};

		$scope.timeValues = {
			mDurationHour:'',
			mDurationMinute:'',
			mFromHour:'',
			mFromMinute:'',
			mToHour:'',
			mToMinute:'',
			mFromDay: new Date(),
			mToDay: new Date(2015,12,1)
		};

		$scope.newValues = angular.copy($rootScope.allValues);
		$scope.unVip = false;
		$scope.mShow = false;
		$scope.min = 0;

		$scope.$watch('timeValues.mFromHour',function(){ $scope.min = $scope.timeValues.mFromHour;});
		$scope.$watch('timeValues.mDurationHour', function(){ $scope.convertmDurationToMinute(); });
		$scope.$watch('timeValues.mDurationMinute', function(){ $scope.convertmDurationToMinute(); });
		$scope.$watch('timeValues.mFromHour', function(){ $scope.convertmFromToMinute(); });
		$scope.$watch('timeValues.mFromMinute', function(){ $scope.convertmFromToMinute(); });
        $scope.$watch('timeValues.mToHour', function(){ $scope.convertmToToMinute(); });
		$scope.$watch('timeValues.mToMinute', function(){ $scope.convertmToToMinute(); });
		$scope.$watch('timeValues.mFromDay',function(){ $scope.convertmFromDaytoDays(); });
		$scope.$watch('timeValues.mToDay',function(){ $scope.convertmToDaytoDays(); });

		$scope.convertmDurationToMinute = function(){
			$rootScope.eSearchFilter.mDuration = $scope.timeValues.mDurationHour*60 + $scope.timeValues.mDurationMinute;
		};
		$scope.convertmFromToMinute = function(){
			$rootScope.eSearchFilter.mFrom = $scope.timeValues.mFromHour*60 + $scope.timeValues.mFromMinute;
		};
		$scope.convertmToToMinute = function(){
			$rootScope.eSearchFilter.mTo = $scope.timeValues.mToHour*60 + $scope.timeValues.mToMinute;
		};
		$scope.convertmFromDaytoDays = function(){
			var day =  $scope.timeValues.mFromDay.getDate();
			var month = $scope.timeValues.mFromDay.getMonth()+1;
			var year = $scope.timeValues.mFromDay.getFullYear();
			var numberDaysOfYear = new Date(year,month+1,0);
			var daysOfMonth = numberDaysOfMonth.getDate();
		};
		$scope.convertmToDaytoDays = function(){
			var day =  $scope.timeValues.mFromDay.getDate();
			var month = $scope.timeValues.mFromDay.getMonth()+1;
			var year = $scope.timeValues.mFromDay.getFullYear();
			var numberDaysOfMonth = new Date(year,month,0);
			var daysOfMonth = numberDaysOfMonth.getDate();
		};

		$scope.deleteValue = function(form){
			/*RESET VALUE*/
			$rootScope.eSearchFilter = angular.copy($scope.newValues);
			//alert($rootScope.eSearchFilter.mTitle + $rootScope.eSearchFilter.mDuration + $rootScope.eSearchFilter.mLocation + $rootScope.eSearchFilter.mMessage);
			delete $scope.newValues;
			/* RESET FORM*/
			form.$setPristine();
      		form.$setUntouched();
      		$scope.mShow = false;
      		$scope.titleOfButton = 'ADVANCE FILTER';
		};

		$scope.mVip = true; //user is VIP
		$scope.mShow = false;
      	$scope.titleOfButton = 'ADVANCE FILTER';
        $scope.toggleFunc = function(){
        	if($scope.mVip == true){
	            $scope.mShow = !$scope.mShow;
	            if($scope.mShow == true) {$scope.titleOfButton = 'End';}
	            else {$scope.titleOfButton = 'ADVANCE FILTER';}
        	}
        };
})

.directive('checkUncheckRadio', function($rootScope){
	return{
		restrict: 'A',
		link: function(scope,element,attr){
			var labelRadio = element.next();
			labelRadio.bind('mousedown',function(){
				if(element.prop("checked") == true){
		 			labelRadio.bind('mouseup',function(){
		 				setTimeout(function(){
		 					element.prop('checked',false);
		 				},5);
		 			});
		 			var modelName = element.attr("data-ng-model");

		 			if(modelName == 'eSearchFilter.mBreakfast'){
		 				$rootScope.eSearchFilter.mBreakfast = null;
		 			}
		 			else if(modelName == 'eSearchFilter.mLunch'){
		 				$rootScope.eSearchFilter.mLunch = null;
		 			}
		 			else if(modelName == 'eSearchFilter.mDinner'){
		 				$rootScope.eSearchFilter.mDinner = null;
		 			}
		 			else if(modelName == 'eSearchFilter.mOffice'){
		 				$rootScope.eSearchFilter.mOffice = null;
		 			}
		 			else if(modelName == 'eSearchFilter.mHoliday'){
		 				$rootScope.eSearchFilter.mHoliday = null;
		 			}
		 			else{}	
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
        element.hide();

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