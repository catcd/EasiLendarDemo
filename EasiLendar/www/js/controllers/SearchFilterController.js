/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 04/03/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.searchFilter', ['ngAnimate'])

.controller("SearchFilterController", function($rootScope, $scope, $ionicPopup) {
   		$rootScope.allValues = {
			mTitle :'',
			mDuration: '',
			mDurationMinute : '',	//minute	
			mDurationHour: '',     	//hour
			mLocation : '',
			mMessage : '',
			mFrom : '',			
			mFromHour : '',			//hour
			mFromMinute : '',		//minute
			mTo : '',		
			mToHour : '',			//hour
			mToMinute : '',			//minute
			mExpiration : '',		
			mExpirationDay : '',	//day
			mExpirationWeek : '',	//week
			mExpirationMonth : '',	//month
			mExpirationYear : '',	//year
			mBreakfast : null,
			mLunch : null,			//Avoid=true /Prioritize=false
			mDinner : null,
			mOffice : null,
			mHoliday : null
		};

		$scope.newValues = angular.copy($rootScope.allValues);
		$scope.unVip = false;
		$scope.mShow = false;
		$scope.min = 0;

		$scope.$watch('allValues.mDuration',function(){
			$rootScope.allValues.mDurationHour = parseInt($rootScope.allValues.mDuration / 60);
			$rootScope.allValues.mDurationMinute = $rootScope.allValues.mDuration % 60;
		});

		$scope.$watch('allValues.mTo',function(){
			if($rootScope.allValues.mTo > $rootScope.allValues.mFrom){
				$rootScope.allValues.mToHour = parseInt($rootScope.allValues.mTo / 60);
				$rootScope.allValues.mToMinute = $rootScope.allValues.mTo % 60;
			} 
		})

		$scope.$watch('allValues.mFrom',function(){
			$scope.min = $rootScope.allValues.mFrom;

			if($rootScope.allValues.mFrom < $rootScope.allValues.mFrom){
				$rootScope.allValues.mFromHour = parseInt($rootScope.allValues.mFrom / 60);
				$rootScope.allValues.mFromMinute = $rootScope.allValues.mFrom % 60;
			} 
		})

		$scope.$watch('allValues.mExpiration',function(){
			var date = $rootScope.allValues.mExpiration;
			$rootScope.allValues.mExpirationYear = parseInt(date / 365);
			date = date % 365;
			$rootScope.allValues.mExpirationMonth = parseInt(date / 31);
			date = date % 31;
			$rootScope.allValues.mExpirationWeek = parseInt(date / 7);
			$rootScope.allValues.mExpirationDay = date % 7;
		});
		
		$scope.passValue = function(){
		/*alert($rootScope.allValues.mDurationHour 
				+ ':' + $rootScope.allValues.mDurationMinute + ', ' +  $rootScope.allValues.mFromHour 
				+ ':' + $rootScope.allValues.mFromMinute + ', ' + $rootScope.allValues.mToHour + ':' + $rootScope.allValues.mToMinute 
				+ ', ' +  $rootScope.allValues.mExpirationDay + ', ' + $rootScope.allValues.mExpirationWeek 
				+ ', ' + $rootScope.allValues.mExpirationMonth + ', ' + $rootScope.allValues.mExpirationYear);
		*/
		}
		
		$scope.deleteValue = function(form){
			/*RESET VALUE*/
			$rootScope.allValues = angular.copy($scope.newValues);
			//alert($rootScope.allValues.mTitle + $rootScope.allValues.mDuration + $rootScope.allValues.mLocation + $rootScope.allValues.mMessage);
			delete $scope.newValues;

			/* RESET FORM*/
			form.$setPristine();
      		form.$setUntouched();
		}
})

.directive('slideToggle',function(){
		return{
			restrict: 'A',
			scope: {
				isOpen: '=slideToggle'
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

.directive('checkUncheckRadio', function(){
	return{
		restrict: 'A',
		link: function(scope,element,attr){
			var labelRadio = element.next();

			labelRadio.bind('mousedown',function(){
				
				//alert(element.prop("checked"));
				
				if(element.prop("checked") == true){
	 				labelRadio.bind('mouseup',function(){
	 					setTimeout(function(){
	 						element.prop('checked',false);
	 					},5);
	 				});

	 				
	 				var modelName = element.attr("data-ng-model");
	 				/*
	 				if(modelName == 'color1'){
	 					rootScope.color1 = 'none';
	 				}
	 				else if(modelName == 'color2'){
	 					rootScope.color2 = 'none';
	 				}
	 				
	 				else{}
	 				*/
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
});
