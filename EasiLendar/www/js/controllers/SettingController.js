/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 12/05/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.setting', [])

.controller('SettingController', function($scope, $rootScope, eSettings) {
	// inject services
	$rootScope.eSettings = eSettings;
});
