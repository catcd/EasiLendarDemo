/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 09/05/2015
 * type: module all shared variables and functions used for this app
 * test: 94 specs
 */

// load the module.
beforeEach(module('MainApp.shareds.application'));

describe('eToast service test', function() {
	var eToast;
	var toastrFake, toastrConfigFake;

	// fake services
	var toastrFake = {
		success: function(message, object) {},
		info: function(message, object) {},
		error: function(message, object) {},
		warning: function(message, object) {},
	};

	var toastrConfigFake = {
		allowHtml: true,
		positionClass: '',
		tapToDismiss: true,
		newestOnTop: true,
		extendedTimeOut: 0,
		preventDuplicates: false,
		maxOpened: 0,
		onShown: null,
		onHidden: null,
	};

	// excuted before each "it" is run.
	beforeEach(function() {
		module('MainApp.shareds.application', function($provide) {
			$provide.value('toastr', toastrFake);
			$provide.value('toastrConfig', toastrConfigFake);
		});

		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eToast_) {
			eToast = _eToast_;
		});
	});

	// excuted after each "it" is run.
	afterEach(function() {
		toastrConfigFake.allowHtml = true;
		toastrConfigFake.positionClass = '';
		toastrConfigFake.tapToDismiss = true;
		toastrConfigFake.newestOnTop = true;
		toastrConfigFake.extendedTimeOut = 0;
		toastrConfigFake.preventDuplicates = false;
		toastrConfigFake.maxOpened = 0;
		toastrConfigFake.onShown = null;
		toastrConfigFake.onHidden = null;
	});

	describe('toastSuccess test', function() {
		it('toastSuccess should call toastr.success', function() {
			spyOn(toastrFake, 'success')
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrFake.success).toHaveBeenCalled();
		});

		it('toastSuccess should call toastr.success with right parameter', function() {
			spyOn(toastrFake, 'success')
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrFake.success).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastSuccess should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastSuccess should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-success');
		});

		it('toastSuccess should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastSuccess should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastSuccess display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastSuccess should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastSuccess should be able to open many as users want', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(0);
		});

		it('onShown toastSuccess action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.onShown).toBeNull();
		});

		it('onHidden toastSuccess action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccess(message, delay);

			expect(toastrConfigFake.onHidden).toBeNull();
		});
	});

	describe('toastSuccessOne test', function() {
		it('toastSuccessOne should call toastr.success', function() {
			spyOn(toastrFake, 'success')
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrFake.success).toHaveBeenCalled();
		});

		it('toastSuccessOne should call toastr.success with right parameter', function() {
			spyOn(toastrFake, 'success')
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrFake.success).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastSuccessOne should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastSuccessOne should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-success');
		});

		it('toastSuccessOne should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastSuccessOne should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastSuccessOne display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastSuccessOne should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastSuccessOne should be able to open once in the screen', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(1);
		});

		it('onShown toastSuccessOne action should change preventDuplicates to true', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			toastrConfigFake.onShown();

			expect(toastrConfigFake.preventDuplicates).toBe(true);
		});

		it('onHidden toastSuccessOne action should change preventDuplicates to false', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastSuccessOne(message, delay);

			toastrConfigFake.onHidden();

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});
	});

	describe('toastInfo test', function() {
		it('toastInfo should call toastr.info', function() {
			spyOn(toastrFake, 'info')
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrFake.info).toHaveBeenCalled();
		});

		it('toastInfo should call toastr.info with right parameter', function() {
			spyOn(toastrFake, 'info')
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrFake.info).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastInfo should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastInfo should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-info');
		});

		it('toastInfo should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastInfo should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastInfo display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastInfo should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastInfo should be able to open many as users want', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(0);
		});

		it('onShown toastInfo action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.onShown).toBeNull();
		});

		it('onHidden toastInfo action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfo(message, delay);

			expect(toastrConfigFake.onHidden).toBeNull();
		});
	});

	describe('toastInfoOne test', function() {
		it('toastInfoOne should call toastr.info', function() {
			spyOn(toastrFake, 'info')
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrFake.info).toHaveBeenCalled();
		});

		it('toastInfoOne should call toastr.info with right parameter', function() {
			spyOn(toastrFake, 'info')
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrFake.info).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastInfoOne should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastInfoOne should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-info');
		});

		it('toastInfoOne should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastInfoOne should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastInfoOne display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastInfoOne should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastInfoOne should be able to open once in the screen', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(1);
		});

		it('onShown toastInfoOne action should change preventDuplicates to true', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			toastrConfigFake.onShown();

			expect(toastrConfigFake.preventDuplicates).toBe(true);
		});

		it('onHidden toastInfoOne action should change preventDuplicates to false', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastInfoOne(message, delay);

			toastrConfigFake.onHidden();

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});
	});

	describe('toastError test', function() {
		it('toastError should call toastr.error', function() {
			spyOn(toastrFake, 'error')
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrFake.error).toHaveBeenCalled();
		});

		it('toastError should call toastr.error with right parameter', function() {
			spyOn(toastrFake, 'error')
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrFake.error).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastError should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastError should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-error');
		});

		it('toastError should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastError should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastError display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastError should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastError should be able to open many as users want', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(0);
		});

		it('onShown toastError action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.onShown).toBeNull();
		});

		it('onHidden toastError action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastError(message, delay);

			expect(toastrConfigFake.onHidden).toBeNull();
		});
	});

	describe('toastErrorOne test', function() {
		it('toastErrorOne should call toastr.error', function() {
			spyOn(toastrFake, 'error')
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrFake.error).toHaveBeenCalled();
		});

		it('toastErrorOne should call toastr.error with right parameter', function() {
			spyOn(toastrFake, 'error')
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrFake.error).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastErrorOne should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastErrorOne should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-error');
		});

		it('toastErrorOne should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastErrorOne should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastErrorOne display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastErrorOne should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastErrorOne should be able to open once in the screen', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(1);
		});

		it('onShown toastErrorOne action should change preventDuplicates to true', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			toastrConfigFake.onShown();

			expect(toastrConfigFake.preventDuplicates).toBe(true);
		});

		it('onHidden toastErrorOne action should change preventDuplicates to false', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastErrorOne(message, delay);

			toastrConfigFake.onHidden();

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});
	});

	describe('toastWarning test', function() {
		it('toastWarning should call toastr.warning', function() {
			spyOn(toastrFake, 'warning')
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrFake.warning).toHaveBeenCalled();
		});

		it('toastWarning should call toastr.warning with right parameter', function() {
			spyOn(toastrFake, 'warning')
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrFake.warning).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastWarning should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastWarning should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-warning');
		});

		it('toastWarning should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastWarning should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastWarning display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastWarning should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastWarning should be able to open many as users want', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(0);
		});

		it('onShown toastWarning action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.onShown).toBeNull();
		});

		it('onHidden toastWarning action should be null', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarning(message, delay);

			expect(toastrConfigFake.onHidden).toBeNull();
		});
	});

	describe('toastWarningOne test', function() {
		it('toastWarningOne should call toastr.warning', function() {
			spyOn(toastrFake, 'warning')
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrFake.warning).toHaveBeenCalled();
		});

		it('toastWarningOne should call toastr.warning with right parameter', function() {
			spyOn(toastrFake, 'warning')
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrFake.warning).toHaveBeenCalledWith("demo toast", {
				timeOut: 0
			});
		});

		it('toastWarningOne should allow HTML', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.allowHtml).toBe(true);
		});

		it('toastWarningOne should config class correctly', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.positionClass).toEqual('easi-toast-warning');
		});

		it('toastWarningOne should be able to tab to dismis', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.tapToDismiss).toBe(true);
		});

		it('new toastWarningOne should be on top', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.newestOnTop).toBe(true);
		});

		it('toastWarningOne display 1 second after hover', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.extendedTimeOut).toEqual(1000);
		});

		it('toastWarningOne should not prevent Duplicate', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});

		it('toastWarningOne should be able to open once in the screen', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			expect(toastrConfigFake.maxOpened).toEqual(1);
		});

		it('onShown toastWarningOne action should change preventDuplicates to true', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			toastrConfigFake.onShown();

			expect(toastrConfigFake.preventDuplicates).toBe(true);
		});

		it('onHidden toastWarningOne action should change preventDuplicates to false', function() {
			var message = "demo toast";
			var delay = 0;

			eToast.toastWarningOne(message, delay);

			toastrConfigFake.onHidden();

			expect(toastrConfigFake.preventDuplicates).toBe(false);
		});
	});
});

describe('eCheckFriend service test', function() {
	var eCheckFriend;
	var eUserFake;

	// fake services
	var eUserFake = {
		uFriend: {},
		uRequested: {},
	};

	// excuted before each "it" is run.
	beforeEach(function() {
		module('MainApp.shareds.application', function($provide) {
			$provide.value('eUser', eUserFake);
		});

		// inject your service for testing.
		// The _underscores_ are a convenience thing
		// so you can have your variable name be the
		// same as your injected service.
		inject(function(_eCheckFriend_) {
			eCheckFriend = _eCheckFriend_;
		});
	});

	describe('isFriend function test', function() {
		afterEach(function() {
			eUserFake.uFriend = {};
		});

		it('Should return false if eUserFake.uFriend == null', function() {
			eUserFake.uFriend = null;
			id = "catdz95";

			var check = eCheckFriend.isFriend(id);

			expect(check).toBe(false);
		});

		it('Should return false if eUserFake.uFriend[] is undefined', function() {
			eUserFake.uFriend["catdz9x"] = {name: "Cat Can"};
			id = "catdz95";

			var check = eCheckFriend.isFriend(id);

			expect(check).toBe(false);
		});

		it('Should return true if eUserFake.uFriend[] is defined', function() {
			eUserFake.uFriend["catdz9x"] = {name: "Cat Can"};
			id = "catdz9x";

			var check = eCheckFriend.isFriend(id);

			expect(check).toBe(true);
		});
	});

	describe('isRequested function test', function() {
		afterEach(function() {
			eUserFake.uRequested = {};
		});

		it('Should return false if eUserFake.uRequested == null', function() {
			eUserFake.uRequested = null;
			id = "catdz95";

			var check = eCheckFriend.isRequested(id);

			expect(check).toBe(false);
		});

		it('Should return false if eUserFake.uRequested[] is undefined', function() {
			eUserFake.uRequested["catdz9x"] = {name: "Cat Can"};
			id = "catdz95";

			var check = eCheckFriend.isRequested(id);

			expect(check).toBe(false);
		});

		it('Should return true if eUserFake.uRequested[] is defined', function() {
			eUserFake.uRequested["catdz9x"] = {name: "Cat Can"};
			id = "catdz9x";

			var check = eCheckFriend.isRequested(id);

			expect(check).toBe(true);
		});
	});
});
