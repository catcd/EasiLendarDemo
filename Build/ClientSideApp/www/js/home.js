/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 05/07/2015
 * type: main js
 */

angular.module('mainAPP', ['ionic', 'MainApp.controllers', 'MainApp.shareds',
		'ngCordova', 'toastr', 'ionic-timepicker', 'ionic-datepicker'
	])
	.config(function($stateProvider, $urlRouterProvider) {
		/**
		 * open when nothing have been called
		 */
		$urlRouterProvider.otherwise('/loading');
		/**
		 * Provide all state router
		 */
		$stateProvider
		/**
		 * abstract state
		 */
			.state('signIn', {
				url: '',
				abstract: true,
				templateUrl: 'templates/sign-in.html'
			})
			.state('appFull', {
				url: '',
				abstract: true,
				templateUrl: 'templates/app-full.html'
			})
			.state('appMenu', {
				url: '',
				abstract: true,
				templateUrl: 'templates/app-menu.html'
			})
			.state('appNone', {
				url: '',
				abstract: true,
				templateUrl: 'templates/app-none.html'
			})
			.state('home', {
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
			})
			.state('register', {
				parent: 'signIn',
				url: '/register',
				templateUrl: 'templates/register.html',
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
				templateUrl: 'templates/calendar-month.html',
				controller: 'MonthController'
			})
			.state('list', {
				parent: 'home',
				url: '/list',
				templateUrl: 'templates/calendar-list.html',
				controller: 'ListController'
			})
			.state('day', {
				parent: 'home',
				url: '/day',
				templateUrl: 'templates/calendar-day.html',
				controller: 'DayController'
			})
			.state('week', {
				parent: 'home',
				url: '/week',
				templateUrl: 'templates/calendar-week.html',
				controller: 'WeekController'
			})
			/**
			 * appMenu's children
			 */
			.state('search', {
				parent: 'appMenu',
				url: '/search',
				templateUrl: 'templates/search.html',
				controller: 'SearchController'
			})
			.state('setting', {
				parent: 'appMenu',
				url: '/setting',
				templateUrl: 'templates/setting.html',
				controller: 'SettingController'
			})
			.state('sync', {
				parent: 'appMenu',
				url: '/sync',
				templateUrl: 'templates/sync.html',
				controller: 'SyncController'
			})
			/**
			 * appNone's children
			 */
			.state('about', {
				parent: 'appNone',
				url: '/about',
				templateUrl: 'templates/about.html',
				controller: 'AboutController'
			})
			.state('comingSoon', {
				parent: 'appNone',
				url: '/coming-soon',
				templateUrl: 'templates/coming-soon.html',
				controller: 'ComingSoonController'
			})
			.state('editEvent', {
				parent: 'appNone',
				url: '/edit-event',
				templateUrl: 'templates/edit-event.html',
				controller: 'EditEventController'
			})
			.state('eventDetail', {
				parent: 'appNone',
				url: '/event-detail',
				templateUrl: 'templates/event-detail.html',
				controller: 'EventDetailController'
			})
			.state('export', {
				parent: 'appNone',
				url: '/export',
				templateUrl: 'templates/export.html',
				controller: 'ExportController'
			})
			.state('loading', {
				parent: 'appNone',
				url: '/loading',
				templateUrl: 'templates/loading.html',
				controller: 'LoadingController'
			})
			.state('myProfile', {
				parent: 'appNone',
				url: '/my-profile',
				templateUrl: 'templates/my-profile.html',
				controller: 'MyProfileController'
			})
			.state('result', {
				parent: 'appNone',
				url: '/result',
				templateUrl: 'templates/result.html',
				controller: 'ResultController'
			})
			.state('searchFilter', {
				parent: 'appNone',
				url: '/search-filter',
				templateUrl: 'templates/search-filter.html',
				controller: 'SearchFilterController'
			})
			.state('share', {
				parent: 'appNone',
				url: '/share',
				templateUrl: 'templates/share.html',
				controller: 'ShareController'
			})
	});
