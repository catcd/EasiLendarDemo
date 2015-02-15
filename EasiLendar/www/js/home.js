angular.module('mainAPP', ['ionic', 'MainApp.controllers'])

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
				controller : 'AboutController',
				templateUrl : 'about.html'
			}
		}
	})
	.state('app.profile', {
		url : '/profile',
		views : {
			'appContent' : {
				controller: 'ProfileController',
				templateUrl: 'profile.html'
			}
		}
	})
	.state('app.search', {
		url : '/search',
		views : {
			'appContent' : {
				templateUrl: 'search.html',
				controller: 'SearchController'
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
				$ionicPopup.alert({title:'<h3>Canceling...</h3>'});
			}
		});
	}
	$rootScope.showAlert = function(mtitle, url) {
		var confirmPopup = $ionicPopup.alert({
			title: mtitle,
			templateUrl: url
		});
	}

	$rootScope.allValues = {
		mTitle ='',
		mDuration = '',		//hours
		mLocation = '',
		mMessage = '',
		mFrom = '',			//hours
		mTo = '',			//hours
		mExpiration = '',	//hours
		mDate = '',  		//Days/Weeks/Months/Years
		mBreakfast ='',
		mLunch = '',		//Avoid/Prioritize
		mDinner = '',
		mOfficeTime = '',
		mHoliday = ''
	};
})
