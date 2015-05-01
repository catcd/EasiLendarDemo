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
		backState: [eSettings.sDefaultView],
		type: null,		// "create"/"edit"
		pushBackState: function( state ) {
			if (state !== null && state !== undefined) {
				this.backState[this.backState.length] = state;
			}
		},
		popBackState: function() {
			var temp = angular.copy( this.backState[
			this.backState.length - 1] );
			delete this.backState[this.backState.length--];
			return temp;
		}
	};
});
