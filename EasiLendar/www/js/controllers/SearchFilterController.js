/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 28/02/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.searchFilter', ['ngAnimate'])

.controller("SearchFilterController", function($rootScope, $scope, $ionicPopup) {
   		$rootScope.allValues = {
			mTitle :'',
			mDuration : '',		//hours
			mLocation : '',
			mMessage : '',
			mFrom : '',			//hours
			mTo : '',			//hours
			mExpiration : '',	//hours
			mDate : '',  		//Days/Weeks/Months/Years
			mBreakfast : 'none',
			mLunch : 'none',		//Avoid/Prioritize
			mDinner : 'none',
			mOffice : 'none',
			mHoliday : 'none'
		};

		$scope.newValues = angular.copy($rootScope.allValues);
		$scope.unVip = false;
		$scope.mShow = false;
		
		/*$scope.passValue = function(){
			alert($rootScope.allValues.mTitle + $rootScope.allValues.mDuration + $rootScope.allValues.mLocation + $rootScope.allValues.mMessage);
		}*/
		$scope.deleteValue = function(){
			$rootScope.allValues = angular.copy($scope.newValues);
			alert($rootScope.allValues.mTitle + $rootScope.allValues.mDuration + $rootScope.allValues.mLocation + $rootScope.allValues.mMessage);
			$scope.newValues = null;
		}

		$('label').mousedown(function() { 
 			var x = '#' + $(this).attr("for");
 			var $input = $(x); 
 			if($input.prop("checked") == true){
 				$(this).mouseup(function(){
 					setTimeout(function(){
 						$input.prop('checked',false);
 					},5);
 				});
	 			var modelName = $input.attr("data-ng-model");
			 	if(modelName == 'allValues.mBreakfast'){
			 		$scope.allValues.mBreakfast = 'none';
			 	}
			 	else if(modelName == 'allValues.mLunch'){
			 		$scope.allValues.mLunch = 'none';
			 	}
			 	else if(modelName == 'allValues.mDinner'){
			 		$scope.allValues.mDinner = 'none';
			 	}
			 	else if(modelName == 'allValues.mOffice'){
			 		$scope.allValues.mOffice = 'none';
			 	}
			 	else if(modelName == 'allValues.mHoliday'){
			 		$scope.allValues.mHoliday = 'none';
			 	}
			 	else {} 
 			}
 			else{
 				$(this).mouseup(function(){
 					setTimeout(function(){
 						$input.prop('checked',true);
 					},5);
 				});
 			}
 		});
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
});
