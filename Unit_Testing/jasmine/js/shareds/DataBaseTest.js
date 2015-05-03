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
	
	describe("set notifications' lengths functions", function() {
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
	
	describe("addFriend function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not add friend if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.addFriend("test2");
			expect(temp).toBe(false);
		});
		it("should not add friend if missing argument", function() {
			var temp = eDatabase.addFriend();
			expect(temp).toBe(false);
		});
		it("should not add friend if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.addFriend("test2");
			expect(temp).toBe(false);
		});
	});
	
	describe("getCalendar function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not get calendar if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.getCalendar("test2");
			expect(temp).toBe(false);
		});
		it("should not get calendar if missing argument", function() {
			var temp = eDatabase.getCalendar();
			expect(temp).toBe(false);
		});
		it("should not get calendar if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.getCalendar("test2");
			expect(temp).toBe(false);
		});
	});
	
	describe("request function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not request friend if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.request("test2");
			expect(temp).toBe(false);
		});
		it("should not request friend if missing argument", function() {
			var temp = eDatabase.request();
			expect(temp).toBe(false);
		});
		it("should not request friend if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.request("test2");
			expect(temp).toBe(false);
		});
	});
	
	describe("deleteFN function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not delete friend's noti if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.deleteFN("test2");
			expect(temp).toBe(false);
		});
		it("should not delete friend's noti if missing argument", function() {
			var temp = eDatabase.deleteFN();
			expect(temp).toBe(false);
		});
		it("should not delete friend's noti if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.deleteFN("test2");
			expect(temp).toBe(false);
		});
	});
	
	describe("deleteF function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not delete friend if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.deleteF("test2");
			expect(temp).toBe(false);
		});
		it("should not delete friend if missing argument", function() {
			var temp = eDatabase.deleteF();
			expect(temp).toBe(false);
		});
		it("should not delete friend if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.deleteF("test2");
			expect(temp).toBe(false);
		});
	});
	
	describe("rejectF function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not reject friend if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.rejectF("test2");
			expect(temp).toBe(false);
		});
		it("should not reject friend if missing argument", function() {
			var temp = eDatabase.rejectF();
			expect(temp).toBe(false);
		});
		it("should not reject friend if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.rejectF("test2");
			expect(temp).toBe(false);
		});
	});
	
	describe("searchFriend function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not search friend if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.searchFriend("test2");
			expect(temp).toBe(false);
		});
		it("should not search friend if missing argument", function() {
			var temp = eDatabase.searchFriend();
			expect(temp).toBe(false);
		});
		it("should not search friend if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.searchFriend("test2");
			expect(temp).toBe(false);
		});
	});
	
	describe("searchEvent function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not search event if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.searchEvent("Hoc Toan");
			expect(temp).toBe(false);
		});
		it("should not search event if missing argument", function() {
			var temp = eDatabase.searchEvent();
			expect(temp).toBe(false);
		});
		it("should not search event if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.searchEvent("Hoc Toan");
			expect(temp).toBe(false);
		});
	});
	
	describe("getInformation function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not get information if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.getInformation("test2");
			expect(temp).toBe(false);
		});
		it("should not get information if missing argument", function() {
			var temp = eDatabase.getInformation();
			expect(temp).toBe(false);
		});
		it("should not get information if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.getInformation("test2");
			expect(temp).toBe(false);
		});
	});
	
	describe("refresh function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not refresh if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.refresh();
			expect(temp).toBe(false);
		});
		it("should not refresh if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.refresh();
			expect(temp).toBe(false);
		});
	});

	describe("updateCalendar function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not update if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.updateCalendar();
			expect(temp).toBe(false);
		});
		it("should not update if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.updateCalendar();
			expect(temp).toBe(false);
		});
	});
	
	describe("viewProfile function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not get friend's profile if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.viewProfile("test2");
			expect(temp).toBe(false);
		});
		it("should not get friend's profile if missing argument", function() {
			var temp = eDatabase.viewProfile();
			expect(temp).toBe(false);
		});
		it("should not get friend's profile if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.viewProfile("test2");
			expect(temp).toBe(false);
		});
	});
	
	describe("getFriend function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not get friend's friend list if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.getFriend("test2");
			expect(temp).toBe(false);
		});
		it("should not get friend's friend list if missing argument", function() {
			var temp = eDatabase.getFriend();
			expect(temp).toBe(false);
		});
		it("should not get friend's friend list if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.getFriend("test2");
			expect(temp).toBe(false);
		});
	});
	
	describe("updateEvent function", function() {
		var event1, type, event2;
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
			event1 = {
				summary: "Hoc Toan",
				start: {dateTime: new Date(2015,4,4,1,0,0)},
				end: {dateTime: new Date(2015,4,4,3,50,0)},
				location: "Home",
				id: "12341234"
			};
		});
		
		it("should not update event if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.updateEvent(event1, "del");
			expect(temp).toBe(false);
		});
		it("should not update event if missing argument", function() {
			var temp = eDatabase.updateEvent();
			expect(temp).toBe(false);
		});
		it("should not update event if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.updateEvent(event1, "del");
			expect(temp).toBe(false);
		});
	});
	
	describe("updateTodo function", function() {
		beforeEach(function() {
			eUser.isLogin = true;
			eUser.uID = "test1";
		});
		
		it("should not update todo if user have not sign in", function() {
			eUser.isLogin = false;
			var temp = eDatabase.updateTodo();
			expect(temp).toBe(false);
		});
		it("should not update todo if user's id is empty or null", function() {
			eUser.uID = "";
			var temp = eDatabase.updateTodo();
			expect(temp).toBe(false);
		});
	});
});