/**
 * starter: Nguyen Minh Trang
 * owner: Nguyen Minh Trang
 * last update: 10/05/2015
 * type: unit test
 * base on: javascript
 */
 
describe('Edit Event Controller Test', function() {
	var $controller, $rootScope, $scope;
	var eEvent, eEasiLendar, eCalendar, eSync;

	beforeEach(module('MainApp.controllers.editEvent'));
	beforeEach(module('MainApp.shareds.calendar'));
	
	// simulate services
	eEvent = {
		pointer: null,
		type: null,
		pushBackState: function() {},
		popBackState: function() {},
	};
	eEasiLendar = {
		eventColor: ["#09c","#0cf","#36f","#93f","#ff9999","#fc0",
	                  "#f60","#0c6","#666","#99f","#393","#c30"],
		isType: function() {},
		areSameDate: function() {},
		newEasiEvent: function(title, date1, date2, location) {
			return {
				summary: title,
				state: {
					dateTime: date1,
				},
				end: {
					dateTime: date2,
				},
				location: location,
			}
		},
	};
	eSync = {
		deleteEventWithId: function() {},
		addSingleEvent: function(title, date1, date2, location) {},
		editEventWithId: function(id, event) {},
	};
	
	beforeEach(function() {
		inject(function(_$rootScope_, _$controller_, _eCalendar_) {
			$rootScope = _$rootScope_;
			$controller = _$controller_;
			$scope = $rootScope.$new();
			eCalendar = _eCalendar_;
			$controller('EditEventController', {
				'$rootScope': $rootScope,
				'$scope': $scope,
				'eEvent': eEvent,
				'eEasiLendar': eEasiLendar,
				'eCalendar': eCalendar,
				'eSync': eSync
			});
		});
		$rootScope.goToState = function() {};
	});
	
	describe("EventForm Class", function() {
		var event, eventForm1, eventForm2;
		beforeEach(function() {
			event = {
				summary: "Test",
				location: "Home",
				start: {
					dateTime: new Date(2015,4,10,1,16,0)
				},
				end: {
					dateTime: new Date(2015,4,10,18,30,0)
				},
				id: "abcxyz",
				colorId: 5
			};
			eventForm1 = $scope.newEventForm( event );
			eventForm2 = $scope.newEventForm();
		});
		
		it("location should be null if missing argument", function() {
			expect(eventForm2.location).toBeNull();
		});
		it("title should be null if missing argument", function() {
			expect(eventForm2.title).toBeNull();
		});
		it("date1 should be null if missing argument", function() {
			expect(eventForm2.date1).toBeNull();
		});
		it("date2 should be null if missing argument", function() {
			expect(eventForm2.date2).toBeNull();
		});
		it("time1 should be null if missing argument", function() {
			expect(eventForm2.time1).toBeNull();
		});
		it("time2 should be null if missing argument", function() {
			expect(eventForm2.time2).toBeNull();
		});
		it("id should be null if missing argument", function() {
			expect(eventForm2.id).toBeNull();
		});
		
		it("location should be 'Home'", function() {
			expect(eventForm1.location).toBe("Home");
		});
		it("title should be 'Test'", function() {
			expect(eventForm1.title).toBe("Test");
		});
		it("date1 should be '10/05/2015'", function() {
			expect(eventForm1.date1).toBe("10/05/2015");
		});
		it("date2 should be '10/05/2015'", function() {
			expect(eventForm1.date2).toBe("10/05/2015");
		});
		it("time1 should be '01:16'", function() {
			expect(eventForm1.time1).toBe("01:16");
		});
		it("time2 should be '18:30'", function() {
			expect(eventForm1.time2).toBe("18:30");
		});
		it("id should be 'abcxyz'", function() {
			expect(eventForm1.id).toBe("abcxyz");
		});
	});
	
	describe("Form Class", function() {
		describe("when create new event", function() {
			var form;
			beforeEach(function() {
				eEvent.type = "create";
				form = $scope.newForm();
			});
			it("allday should be initailized as false", function() {
				expect(form.allday).toBe(false);
			});
			it("should create new EventForm", function() {
				expect(form.event).toBeDefined();
			});
			
			describe("save() function", function() {
				
			});
		});
		
		describe("when edit an existed event", function() {
			var form;
			beforeEach(function() {
				eEvent.type = "edit";
				eEvent.pointer = {
					summary: "Test",
					location: "Home",
					start: {
						dateTime: new Date(2015,4,10,13,16,0)
					},
					end: {
						dateTime: new Date(2015,4,10,18,30,0)
					},
					id: "abcxyz",
					colorId: 5
				};
				form = $scope.newForm();
			});
			
			it("allday should be initailized as false", function() {
				expect(form.allday).toBe(false);
			});
			it("should create new EventForm", function() {
				expect(form.event).toBeDefined();
			});
			it("event.title should be 'Test'", function() {
				expect(form.event.title).toEqual('Test');
			});
			it("event.location should be 'home'", function() {
				expect(form.event.location).toBe('Home');
			});
			it("event.date1 should be '10/05/2015'", function() {
				expect(form.event.date1).toBe('10/05/2015');
			});
			it("event.date2 should be '10/05/2015'", function() {
				expect(form.event.date2).toBe('10/05/2015');
			});
			it("event.id should be 'abcxyz'", function() {
				expect(form.event.id).toBe("abcxyz");
			});
			
			describe("save() function", function() {
				
			});
		});
		
		describe("close() function", function() {
			var form;
			beforeEach(function() {
				form = $scope.newForm();
				spyOn($rootScope, 'goToState');
				form.close();
			});
			it("eEvent.type should be null", function() {
				expect(eEvent.type).toBeNull();
			});
			it("should call to $rootScope.goToState", function() {
				expect($rootScope.goToState).toHaveBeenCalled();
			});
		});
	});
});