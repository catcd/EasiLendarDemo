/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 21/03/2015
 * type: all shared module 
 */

angular.module('MainApp.shareds', [
	'MainApp.shareds.application',
	'MainApp.shareds.calendar',
	'MainApp.shareds.dataBase',
	'MainApp.shareds.directive',
	'MainApp.shareds.easiLendarClass',
	'MainApp.shareds.multiCalendar',
	'MainApp.shareds.sync',
	'MainApp.shareds.timeHeap'
])

.run(function($rootScope, $ionicPopup, $timeout, $state, $ionicPlatform, $ionicHistory) {
	// Menu list
	$rootScope.eMenu = {
		mMenus: [
			{ name: 'Create', icon: 'ion-plus-circled', sref: 'comingSoon' },
			{ name: 'Month', icon: 'ion-calendar', sref: 'month' },
			{ name: 'Week', icon: 'ion-calendar', sref: 'week' },
			{ name: 'Day', icon: 'ion-calendar', sref: 'day' },
			{ name: 'List', icon: 'ion-clipboard', sref: 'list' },
			{ name: 'Sync', icon: 'ion-loop', sref: 'sync' }
		],
		mTools: [
			{ name: 'Share', icon: 'ion-share', sref: 'comingSoon' },
			{ name: 'Export', icon: 'ion-document-text', sref: 'comingSoon' },
			{ name: 'EasiVIP', icon: 'ion-ribbon-b easi-vip-color', sref: 'comingSoon' },
			{ name: 'Helps', icon: 'ion-help-circled', sref: 'comingSoon' },
			{ name: 'Settings', icon: 'ion-android-settings', sref: 'setting' }
		]
	}
})
