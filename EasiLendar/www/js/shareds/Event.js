/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 28/04/2015
 * type: All services for event
 */

var event = angular.module('MainApp.shareds.event', []);

event.factory('eEvent', function(eSettings) {
	return {
		pointer: null,
		backState: eSettings.sDefaultView,
	};
});
