angular.module('mainAPP', [ 'ionic' ])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('app', {
		url : '/app',
		abstract : true,
		templateUrl : 'app.html'
	})
	.state('app.home', {
		url : '/home',
		views : {
			'appContent' : {
				templateUrl : 'day.html',
				controller : 'HomeController'
			}
		}
	})
	.state('app.month', {
		url : '/month',
		views : {
			'appContent' : {
				templateUrl : 'month.html',
				controller : 'HomeController'
			}
		}
	})
	.state('app.week', {
		url : '/week',
		views : {
			'appContent' : {
				templateUrl : 'week.html',
				controller : 'HomeController'
			}
		}
	})
	.state('app.day', {
		url : '/day',
		views : {
			'appContent' : {
				templateUrl : 'day.html',
				controller : 'HomeController'
			}
		}
	})
	.state('app.list', {
		url : '/list',
		views : {
			'appContent' : {
				templateUrl : 'list.html',
				controller : 'HomeController'
			}
		}
	})
	.state('app.setting', {
		url : '/setting',
		views : {
			'appContent' : {
				templateUrl : 'setting.html',
				controller : 'SettingController'
			}
		}
	})
	.state('app.about', {
		url : '/about',
		views : {
			'appContent' : {
				templateUrl : 'about.html',
				controller : 'AboutController'
			}
		}
	})
	.state('app.profile', {
		url : '/profile',
		views : {
			'appContent' : {
				templateUrl: 'profile.html',
				controller: 'ProfileController'
			}
		}
	})
	.state('app.search', {
		url : '/search',
		views : {
			'appContent' : {
				templateUrl: 'search.html',
				controller: 'FilterController'
			}
		}
	})
	.state('app.result', {
		url : '/result',
		views : {
			'appContent' : {
				templateUrl: 'result.html',
				controller: 'ResultController'
			}
		}
	})

	$urlRouterProvider.otherwise("/app/home");
})

.run(function($rootScope, $ionicPopup){
	$rootScope.showPopup = function(mtitle, url) {
		var confirmPopup = $ionicPopup.confirm({
			title: mtitle,
			templateUrl: url
		});
		confirmPopup.then(function(res) {
			if(res) {
				$ionicPopup.alert({title:'<h3>Saving...</h3>'});
			} else {
				$ionicPopup.alert({title:'</h3>Canceling...</h3>'});
			}
		});
	}	
	$rootScope.showAlert = function(mtitle, url) {
		var confirmPopup = $ionicPopup.alert({
			title: mtitle,
			templateUrl: url
		});
	}
})

.controller('SettingController', function($scope, $ionicPopup) {
	$scope.theme="Blue";
	$scope.mlang="English";
	$scope.local=true;
	$scope.gmail=true;
	$scope.sunrise=false;
	$scope.sync=true;
	$scope.mView="Day";
	$scope.mDayView="Event list";
})

.controller('sideMenuController', function($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

.controller("HomeController", function($scope) {

})

.controller("AboutController", function($scope) {
	$scope.ver = "1.0.6"
})

.controller("ProfileController", function($scope) {

})

.controller("FilterController", function($scope){
	$scope.fShow = false;
	$scope.showAdvanceFilter = function(){
		$scope.fShow = !($scope.fShow);
	}
})

.controller("ResultController", function($scope) {
	$scope.numOfOps = 5;
	$scope.options = [
	    {score: 1, date:"01/02/2015", begin:"02:30", end:"05:00"},
	    {score: 2, date:"02/02/2015", begin:"14:00", end:"23:30"},
	    {score: 3, date:"06/02/2015", begin:"06:45", end:"08:50"},
	    {score: 4, date:"10/02/2015", begin:"08:30", end:"18:30"},
	    {score: 5, date:"11/02/2015", begin:"15:00", end:"17:50"}
	];
	
	$scope.addOption = function(option) {
		$scope.options.push(option);
		$scope.numOfOps++;
	};
	
	$scope.next = function() {
		window.alert("You click next");
	};
	
	$scope.selectOption = function(option) {
		window.alert("You select option "+option.score);
	};
	
	$scope.display = function(option) {
		$scope.option = option.score+". "+option.date+": From "+option.begin+" - To "+option.end;
		return $scope.option;
	}

})

.controller('PopOverController', function($scope, $ionicPopover) {
	$scope.popover = $ionicPopover.fromTemplate(template, {
		scope : $scope,
	});

	// .fromTemplateUrl() method
	$ionicPopover.fromTemplateUrl('my-popover.html', {
		scope : $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});

	$scope.openPopover = function($event) {
		$scope.popover.show($event);
	};
	$scope.closePopover = function() {
		$scope.popover.hide();
	};
	//Cleanup the popover when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});
});