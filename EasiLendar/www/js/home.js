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
				templateUrl : 'month.html',
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
				controller : 'HomeController'
			}
		}
	})
	.state('app.profile', {
		url : '/profile',
		views : {
			'appContent' : {
				templateUrl: 'profile.html',
				controller: 'HomeController'
			}
		}
	})

	$urlRouterProvider.otherwise("/app/home");
})

.controller('sideMenuController', function($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

.controller("HomeController", function($scope) {

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