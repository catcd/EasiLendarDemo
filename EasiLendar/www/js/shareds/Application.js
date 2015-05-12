/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 12/05/2015
 * type: module all shared functions used for this app
 */

angular.module('MainApp.shareds.application', [])
/**
 * All functions
 */

/**
 * Toast service
 */
.factory('eToast', function(toastr, toastrConfig){
	'use strict';
	return {
		// toast success
		// lots of toast show a time
		// color #419696
		// width 50%
		// position center bottom
		toastSuccess: function(message, delay) {
			toastrConfig.allowHtml = true;
			toastrConfig.positionClass = 'easi-toast-success';
			toastrConfig.tapToDismiss = true;
			toastrConfig.newestOnTop = true;
			toastrConfig.extendedTimeOut = 1000;
			toastrConfig.preventDuplicates = false;
			toastrConfig.maxOpened = 0;
			toastrConfig.onShown = null;
			toastrConfig.onHidden = null;

			toastr.success(message, {
				timeOut: delay
			});
		},

		// toast success one
		// only 1 toast show a time
		// color #419696
		// width 50%
		// position center bottom
		toastSuccessOne: function(message, delay) {
			toastrConfig.allowHtml = true;
			toastrConfig.positionClass = 'easi-toast-success';
			toastrConfig.tapToDismiss = true;
			toastrConfig.newestOnTop = true;
			toastrConfig.extendedTimeOut = 1000;
			toastrConfig.maxOpened = 1;
			toastrConfig.onShown = function(){
				toastrConfig.preventDuplicates = true;
			};
			toastrConfig.onHidden = function(){
				toastrConfig.preventDuplicates = false;
			};

			toastr.success(message, {
				timeOut: delay
			});
		},

		// toast info
		// lots of toast show a time
		// color #33CCCC
		// width 50%
		// position center bottom
		toastInfo: function(message, delay) {
			toastrConfig.allowHtml = true;
			toastrConfig.positionClass = 'easi-toast-info';
			toastrConfig.tapToDismiss = true;
			toastrConfig.newestOnTop = true;
			toastrConfig.extendedTimeOut = 1000;
			toastrConfig.preventDuplicates = false;
			toastrConfig.maxOpened = 0;
			toastrConfig.onShown = null;
			toastrConfig.onHidden = null;

			toastr.info(message, {
				timeOut: delay
			});
		},

		// toast info one
		// only 1 toast show a time
		// color #33CCCC
		// width 50%
		// position center bottom
		toastInfoOne: function(message, delay) {
			toastrConfig.allowHtml = true;
			toastrConfig.positionClass = 'easi-toast-info';
			toastrConfig.tapToDismiss = true;
			toastrConfig.newestOnTop = true;
			toastrConfig.extendedTimeOut = 1000;
			toastrConfig.maxOpened = 1;
			toastrConfig.onShown = function(){
				toastrConfig.preventDuplicates = true;
			};
			toastrConfig.onHidden = function(){
				toastrConfig.preventDuplicates = false;
			};

			toastr.info(message, {
				timeOut: delay
			});
		},

		// toast error
		// lots of toast show a time
		// color #D65930
		// width 50%
		// position center bottom
		toastError: function(message, delay) {
			toastrConfig.allowHtml = true;
			toastrConfig.positionClass = 'easi-toast-error';
			toastrConfig.tapToDismiss = true;
			toastrConfig.newestOnTop = true;
			toastrConfig.extendedTimeOut = 1000;
			toastrConfig.preventDuplicates = false;
			toastrConfig.maxOpened = 0;
			toastrConfig.onShown = null;
			toastrConfig.onHidden = null;

			toastr.error(message, {
				timeOut: delay
			});
		},

		// toast error one
		// only 1 toast show a time
		// color #D65930
		// width 50%
		// position center bottom
		toastErrorOne: function(message, delay) {
			toastrConfig.allowHtml = true;
			toastrConfig.positionClass = 'easi-toast-error';
			toastrConfig.tapToDismiss = true;
			toastrConfig.newestOnTop = true;
			toastrConfig.extendedTimeOut = 1000;
			toastrConfig.maxOpened = 1;
			toastrConfig.onShown = function(){
				toastrConfig.preventDuplicates = true;
			};
			toastrConfig.onHidden = function(){
				toastrConfig.preventDuplicates = false;
			};

			toastr.error(message, {
				timeOut: delay
			});
		},

		// toast warning
		// lots of toast show a time
		// color #646464
		// width 50%
		// position center bottom
		toastWarning: function(message, delay) {
			toastrConfig.allowHtml = true;
			toastrConfig.positionClass = 'easi-toast-warning';
			toastrConfig.tapToDismiss = true;
			toastrConfig.newestOnTop = true;
			toastrConfig.extendedTimeOut = 1000;
			toastrConfig.preventDuplicates = false;
			toastrConfig.maxOpened = 0;
			toastrConfig.onShown = null;
			toastrConfig.onHidden = null;

			toastr.warning(message, {
				timeOut: delay
			});
		},

		// toast warning one
		// only 1 toast show a time
		// color #646464
		// width 50%
		// position center bottom
		toastWarningOne: function(message, delay) {
			toastrConfig.allowHtml = true;
			toastrConfig.positionClass = 'easi-toast-warning';
			toastrConfig.tapToDismiss = true;
			toastrConfig.newestOnTop = true;
			toastrConfig.extendedTimeOut = 1000;
			toastrConfig.maxOpened = 1;
			toastrConfig.onShown = function(){
				toastrConfig.preventDuplicates = true;
			};
			toastrConfig.onHidden = function(){
				toastrConfig.preventDuplicates = false;
			};

			toastr.warning(message, {
				timeOut: delay
			});
		},
	};
})

/**
 * Check friend service
 * Local functions
 */
.factory('eCheckFriend', function(eUser){
	'use strict';
	return {
		// is friend function
		// return true if ID is my friend
		isFriend: function(ID) {
			if (eUser.uFriend === null) {
				return false;
			}

			return (eUser.uFriend[ID] !== undefined);
		},

		// is requested function
		// return true if ID is my friend
		isRequested: function(ID) {
			if (eUser.uRequested === null) {
				return false;
			}

			return (eUser.uRequested[ID] !== undefined);
		},

		// is requested me function
		// return true if ID is my friend
		isRequestedMe: function(ID) {
			if (eUser.uFRequest === null) {
				return false;
			}

			return (eUser.uFRequest[ID] !== undefined);
		}
	};
});