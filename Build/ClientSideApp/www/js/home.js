/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 17/07/2015
 * type: main js
 */

var home = angular.module('mainAPP', ['ionic', 'MainApp.controllers', 'MainApp.shareds', 'ngCordova', 'toastr', 'ionic-timepicker', 'ionic-datepicker']);
home.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/loading');
	$stateProvider
	// abstract state
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
		.state('home', {
			url: '',
			abstract: true,
			templateUrl: 'templates/home.html',
			controller: 'HomeController'
		})
		// signIn's children
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
		// home's children
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
		// appFull's children
		.state('about', {
			parent: 'appFull',
			url: '/about',
			templateUrl: 'templates/about.html',
			controller: 'AboutController'
		})
		.state('comingSoon', {
			parent: 'appFull',
			url: '/coming-soon',
			templateUrl: 'templates/coming-soon.html',
			controller: 'ComingSoonController'
		})
		.state('editEvent', {
			parent: 'appFull',
			url: '/edit-event',
			templateUrl: 'templates/edit-event.html',
			controller: 'EditEventController'
		})
		.state('eventDetail', {
			parent: 'appFull',
			url: '/event-detail',
			templateUrl: 'templates/event-detail.html',
			controller: 'EventDetailController'
		})
		.state('export', {
			parent: 'appFull',
			url: '/export',
			templateUrl: 'templates/export.html',
			controller: 'ExportController'
		})
		.state('loading', {
			parent: 'appFull',
			url: '/loading',
			templateUrl: 'templates/loading.html',
			controller: 'LoadingController'
		})
		.state('myProfile', {
			parent: 'appFull',
			url: '/my-profile',
			templateUrl: 'templates/my-profile.html',
			controller: 'MyProfileController'
		})
		.state('profile', {
			parent: 'appFull',
			url: '/profile',
			templateUrl: 'templates/profile.html',
			controller: 'ProfileController'
		})
		.state('result', {
			parent: 'appFull',
			url: '/result',
			templateUrl: 'templates/result.html',
			controller: 'ResultController'
		})
		.state('search', {
			parent: 'appFull',
			url: '/search',
			templateUrl: 'templates/search.html',
			controller: 'SearchController'
		})
		.state('searchFilter', {
			parent: 'appFull',
			url: '/search-filter',
			templateUrl: 'templates/search-filter.html',
			controller: 'SearchFilterController'
		})
		.state('setting', {
			parent: 'appFull',
			url: '/setting',
			templateUrl: 'templates/setting.html',
			controller: 'SettingController'
		})
		.state('share', {
			parent: 'appFull',
			url: '/share',
			templateUrl: 'templates/share.html',
			controller: 'ShareController'
		})
		.state('sync', {
			parent: 'appFull',
			url: '/sync',
			templateUrl: 'templates/sync.html',
			controller: 'SyncController'
		})
});
