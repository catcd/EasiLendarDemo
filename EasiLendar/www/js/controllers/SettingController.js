/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 21/04/2015
 * type: paticular con troller
 */

angular.module('MainApp.controllers.setting', [])

.controller('SettingController', function($scope, $rootScope, eSettings) {
	// inject services
	$rootScope.eSettings = eSettings;
})
