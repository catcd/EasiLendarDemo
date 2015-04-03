/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 2/4/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.searchFilter', [])

//Service for google-map
.service('Map',function($q){
	this.init = function(){
		//Create a map
        var mapOptions = {
            zoom: 13
        };
        map = new google.maps.Map(document.getElementById('map'),
            mapOptions);
        // Try HTML5 geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);
                
                var marker = new google.maps.Marker({
					map: map,
					position: pos
				});

                map.setCenter(pos);
            }, function() {
                handleNoGeolocation(true);
            });
        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }

        this.places = new google.maps.places.PlacesService(map);
	}
	
	this.handleNoGeolocation = function(errorFlag) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} 
		else {
			var content = "Error: Your browser doesn't support geolocation.";
		}

		var options = {
			map: this.map,
			position: new google.maps.LatLng(60, 105),
			content: content
		};

		var infowindow = new google.maps.InfoWindow(options);
		this.map.setCenter(options.position);
	}
	
	this.search = function(str){
		this.map = new google.maps.Map(document.getElementById('map'),
        {zoom: 13});
		var d = $q.defer();
		this.places.textSearch({query: str}, function(results,status){
			if(status == 'OK'){
				d.resolve(results[0]);
			}
			else d.reject(status);
		});
		return d.promise;
	}

	this.addMarker = function(res){
		if(this.marker) this.marker.setMap(null);
		this.marker = new google.maps.Marker({
			map: this.map,
			position: res.geometry.location,
			animation: google.maps.Animation.DROP
		});
		
		this.map.setCenter(res.geometry.location);
	}
})

.controller("SearchFilterController", function($rootScope, $scope, $ionicPopup, Map) {
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

	$scope.submit = function(form) {
        if (form.$valid) {
		   $rootScope.goToState('result');
		}
    };

	$scope.deleteValue = function(form){
		/*RESET VALUE*/
		$scope.timeValues = angular.copy(resetValues);
		$rootScope.eSearchFilter = {};
		$scope.list = new Array();
		/* RESET FORM*/
		form.$setPristine();
  		form.$setUntouched();
  		$scope.mShow = false;
  		$scope.titleOfButton = 'ADVANCE FILTER';
  		$rootScope.goToState('profile');
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
    		$scope.timeValues.mDurationHour = 0;
    		$scope.timeValues.mDurationMinute = 15;
    	}
    }

    //Add someone whose you want to appoint the time to meet
    $scope.$watch("eFriend.fName",function(){
    	if($rootScope.eFriend.fName !== ''){ 
    		$scope.showButtonDelete = true;
    	}
    	else { $scope.showButtonDelete = false; }
    });
    //remove
    $scope.cancelMeeting = function(){
    	$rootScope.eFriend.fName = '';
    }
    
    //Google Map
    $scope.place = {};
	$scope.search = function(){
		$scope.apiError = false;
		Map.search($rootScope.eSearchFilter.mLocation).then(
			function(res){
				Map.addMarker(res);
				$scope.place.name = res.name;
				$scope.place.lat = res.geometry.location.lat();
				$scope.place.lng = res.geometry.location.lng();
			},
			function(status){
				$scope.apiError = true;
				$scope.apiStatus = status;
			}
		);
	}

	Map.init();
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
