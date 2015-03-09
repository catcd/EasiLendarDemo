/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 04/03/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.searchFilter', ['ngAnimate'])

.controller("SearchFilterController", function($rootScope, $scope, $ionicPopup) {
   		$rootScope.eSearchFilter = {
			mTitle:'',
			mDuration:'',
			mLocation:'',
			mMessage:'',
			mFrom:'',			
			mTo:'',		
			mExpiration:'',		
			mBreakfast: null,
			mLunch: null,			//Avoid=true /Prioritize=false
			mDinner: null,
			mOffice: null,
			mHoliday: null
		};
		$scope.newValues = angular.copy($rootScope.eSearchFilter);
		
		$scope.min = 0;

		$scope.$watch('eSearchFilter.mFrom',function(){
			$scope.min = $rootScope.eSearchFilter.mFrom;
		})
		
		$scope.passValue = function(){
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
      		$scope.titleOfButton = 'MORE';
		};

		$scope.mVip = true; //user is VIP
		$scope.mShow = false;
      	$scope.titleOfButton = 'MORE';
        $scope.toggleFunc = function(){
        	if($scope.mVip == true){
	            $scope.mShow = !$scope.mShow;
	            if($scope.mShow == true) {$scope.titleOfButton = 'End';}
	            else {$scope.titleOfButton = 'MORE...';}
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

