/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 09/03/2015
 * type: main js
 */
angular.module('mainAPP', ['ionic', 'MainApp.controllers', 'MainApp.shareds'])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/form");
		$stateProvider
		/**
		 * abstract state
		 */
			.state('signIn', {
				url: '',
				abstract: true,
				templateUrl: 'templates/sign-in.html'
			}).state('appFull', {
				url: '',
				abstract: true,
				templateUrl: 'templates/app-full.html'
			}).state('appMenu', {
				url: '',
				abstract: true,
				templateUrl: 'templates/app-menu.html'
			}).state('appNone', {
				url: '',
				abstract: true,
				templateUrl: 'templates/app-none.html'
			}).state('home', {
				url: '',
				abstract: true,
				templateUrl: 'templates/home.html',
				controller: 'HomeController'
			})
			/**
			 * signIn's children
			 */
			.state('form', {
				parent: 'signIn',
				url: '/form',
				templateUrl: 'templates/form.html',
				controller: 'SignInController'
			}).state('register', {
				parent: 'signIn',
				url: '/register',
				templateUrl: 'templates/register.html',
				controller: 'SignInController'
			}).state('warning', {
				parent: 'signIn',
				url: '/warning',
				templateUrl: 'templates/warning.html',
				controller: 'SignInController'
			})
			/**
			 * appFull's children
			 */
			.state('profile', {
				parent: 'appFull',
				url: '/profile',
				templateUrl: 'templates/profile.html',
				controller: 'ProfileController'
			})
			/**
			 * home's children
			 * same as appFull but has 1 button
			 */
			.state('month', {
				parent: 'home',
				url: '/month',
				templateUrl: 'templates/month.html',
				controller: 'MonthController'
			}).state('week', {
				parent: 'home',
				url: '/week',
				templateUrl: 'templates/week.html',
				controller: 'WeekController'
			}).state('day', {
				parent: 'home',
				url: '/day',
				templateUrl: 'templates/day.html',
				controller: 'DayController'
			}).state('list', {
				parent: 'home',
				url: '/list',
				templateUrl: 'templates/list.html',
				controller: 'ListController'
			})
			/**
			 * appMenu's children
			 */
			.state('setting', {
				parent: 'appMenu',
				url: '/setting',
				templateUrl: 'templates/setting.html',
				controller: 'SettingController'
			}).state('sync', {
				parent: 'appMenu',
				url: '/sync',
				templateUrl: 'templates/sync.html',
				controller: 'SyncController'
			})
			// .state('myProfile', {
			// parent : 'appMenu',
			// url : '/my-profile',
			// templateUrl : 'templates/my-profile.html',
			// controller : 'MyProfileController'
			// })
			// .state('search', {
			// parent : 'appMenu',
			// url : '/search',
			// templateUrl : 'templates/search.html',
			// controller : 'SearchController'
			// })
			/**
			 * appNone's children
			 */
			// .state('create', {
			// parent : 'appNone',
			// url : '/create',
			// templateUrl : 'templates/create.html',
			// controller : 'EventController'
			// })
			// .state('change', {
			// parent : 'appNone',
			// url : '/change',
			// templateUrl : 'templates/change.html',
			// controller : 'EventController'
			// })
			.state('about', {
				parent: 'appNone',
				url: '/about',
				templateUrl: 'templates/about.html',
				controller: 'AboutController'
			}).state('searchFilter', {
				parent: 'appNone',
				url: '/search-filter',
				templateUrl: 'templates/search-filter.html',
				controller: 'SearchFilterController'
			}).state('result', {
				parent: 'appNone',
				url: '/result',
				templateUrl: 'templates/result.html',
				controller: 'ResultController'
			}).state('comingSoon', {
				parent: 'appNone',
				url: '/coming-soon',
				templateUrl: 'templates/coming-soon.html',
				controller: 'ComingSoonController'
			})
	})

