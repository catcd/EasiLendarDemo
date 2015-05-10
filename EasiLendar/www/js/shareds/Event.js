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
			if (this.backState.length > 1) {
				var temp = angular.copy( this.backState[
				this.backState.length - 1] );
				delete this.backState[this.backState.length--];
				return temp;
			} else {
				return false;
			}
		}
	};
})
.run(function($rootScope, eEvent) {
	// event must be EasiEvent object
	$rootScope.viewEvent = function(event) {
		if (event === null) return false;
		eEvent.pointer = event;
		eEvent.pushBackState( $rootScope.currentState );
		$rootScope.goToState( "eventDetail" );
	};
	
	// type is "create" or "edit"
	$rootScope.toEventForm = function( type ) {
		if (type === null) return false;
		if (type == "create") {
			eEvent.pointer = null;
		}
		eEvent.type = type;
		eEvent.pushBackState( $rootScope.currentState );
		$rootScope.goToState( "editEvent" );
	};
});