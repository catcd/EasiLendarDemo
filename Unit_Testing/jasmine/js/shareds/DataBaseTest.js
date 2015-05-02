/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 02/05/2015
 * type: unit test
 */

describe('Database', function() {
	var eEasiLendarMock, eCalendarMock, eUserMock, eSettingsMock, eFriendMock,
		eTodoMock, eToastMock, eMultiCalendarMock, eDatabase;
	angular.module("moduleMock", [])
	.factory("$ionicLoading", function() {
		return {};
	})
	.factory("eEasiLendar", function() {
		return {};
	})
	.factory("eCalendar", function() {
		return {};
	})
	.factory("eUser", function() {
		return {};
	})
	.factory("eFriend", function() {
		return {};
	})
	.factory("eSettings", function() {
		return {};
	})
	.factory("eTodo", function() {
		return {};
	})
	.factory("eToast", function() {
		return {};
	})
	.factory("eMultiCalendar", function() {
		return {};
	});
	
	beforeEach(function() {
		module('moduleMock');
		module('MainApp.shareds.dataBase');
		inject(function(_$rootScope_, _eDatabase_, _$ionicLoading_, _eEasiLendar_,
			_eCalendar_, _eUser_, _eFriend_, _eSettings_, _eTodo_, _eToast_,
			_eMultiCalendar_) {
			$rootScope = _$rootScope_;
			eDatabase = _eDatabase_;
			$ionicLoading = _$ionicLoading_;
			eEasiLendar = _eEasiLendar_;
			eCalendar = _eCalendar_;
			eUser = _eUser_;
			eFriend = _eFriend_;
			eSettings = _eSettings_;
			eTodo = _eTodo_;
			eToast = _eToast_;
			eMultiCalendar = _eMultiCalendar_;
		});
	});

	describe("should set notifications' lengths", function() {
		beforeEach(function() {
			eUser = {
				uFRequest : null,
				uFAccepted : null,
				uFRLength : 0,
				uFALength : 0,
			};
		});
		
		it('should have no friend requests', function() {
			eDatabase.setUFRL();
			expect(eUser.uFRLength).toBe(0);
		});
	});
});