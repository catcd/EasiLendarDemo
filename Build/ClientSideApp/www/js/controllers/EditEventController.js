/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 12/05/2015
 * type: EditEventController
 */

var editEvent = angular.module('MainApp.controllers.editEvent', []);

editEvent.controller('EditEventController', function ($scope, $rootScope,
	eEvent, eEasiLendar, eSync, eCalendar) {

	// check if obj is null/undefined/"" or not
	var isNull = function (obj) {
		if (obj === null || obj === undefined || obj === '') {
			return true;
		}
		return false;
	};

	/*
	 * PRIVATE
	 * convert date to string
	 * date is Date object
	 */
	var dateToStr = function (date) {
		if (isNull(date)) {
			return null;
		}
		var year, month, d;
		year = date.getFullYear();
		month = date.getMonth() + 1; // 1 - 12
		d = date.getDate();

		if (d < 10) {
			d = '0' + d;
		}
		if (month < 10) {
			month = '0' + month;
		}
		return d + '/' + month + '/' + year;
	};

	/*
	 * PRIVATE
	 * convert time to string
	 * time is Date object
	 */
	var timeToStr = function(time) {
		if (isNull(time)) {
			return null;
		}
		var h = time.getHours();
		var m = time.getMinutes();

		if (h < 10) {
			h = '0' + h;
		}
		if (m < 10) {
			m = '0' + m;
		}
		return h + ':' + m;
	};

	$scope.form = new Form();
	$scope.$watch('currentState', function() {
		$scope.form = new Form();
	});

	$scope.newEventForm = function(event) {
		return new EventForm(event);
	};
	$scope.newForm = function() {
		return new Form();
	};

	/* 
	 * class EventForm
	 * event is EasiEvent
	 */
	function EventForm( event ) {
		this.location = isNull( event ) ? null : event.location;
		this.title = isNull( event ) ? null : event.summary;
		this.date1 = isNull( event ) ? null : dateToStr(event.start);
		this.date2 = isNull( event ) ? null : dateToStr(event.end);
		this.time1 = isNull( event ) ? null : timeToStr(event.start);
		this.time2 = isNull( event ) ? null : timeToStr(event.end); 
		this.id = isNull( event ) ? null : event.id;
	} // end of EventForm

	/*
	 * class Form
	 */
	function Form() {
		/*
		 * PRIVATE
		 * set event depends on type of eEvent
		 */
		var setEvent = function() {
			if (eEvent.type == 'create') {
				return new EventForm();
			} else {
				return new EventForm( eEvent.pointer );
			}
		};

		/*
		 * PRIVATE
		 * convert string to date
		 * str1 is dd/mm/yyyy
		 * str2 is hh:mm
		 */
		var strToDate = function(str1, str2) {
			// form is not dd/mm/yyyy or hh:mm
			if (isNull( str1 ) || str1.length != 10 || isNull( str2 ) ||
				str2.length != 5) {	
				return null;
			}
			var d, m, y, hour, min;
			d = parseInt( str1.slice( 0, 2 ) );
			m = parseInt( str1.slice( 3, 5 ) );
			y = parseInt( str1.slice( 6, 10 ) );
			hour = parseInt( str2.slice( 0, 2 ) );
			min = parseInt( str2.slice( 3, 5 ) );

			// if they are not numbers
			if (isNaN(d) || isNaN( m ) || isNaN( y ) || isNaN( hour ) ||
				isNaN( min )) {
				return null;
			} else {
				return new Date( y, m-1, d, hour, min, 0 );
			}
		};

		this.allday = false;
		
		this.event = setEvent();

		/*
		 * close function
		 */
		this.close = function() {
			// clear data
			eEvent.type = null;
			$rootScope.goToState( eEvent.popBackState() );
		};

		/*
		 * save function
		 */
		this.save = function() {
			var date1, date2;
			// user chose all-day
			if (this.allday) {
				date1 = strToDate(this.event.date1, '00:00');
				date2 = strToDate(this.event.date2, '00:00');
			} else {
				date1 = strToDate(this.event.date1, this.event.time1);
				date2 = strToDate(this.event.date2, this.event.time2);
			}
			// user change something
			if (this.event.title != eEvent.pointer.summary ||
				this.event.location != eEvent.pointer.location ||
				!eEasiLendar.areSameDate(date1,
					eEvent.pointer.start) ||
				!eEasiLendar.areSameDate(date2, eEvent.pointer.end)) {
				// input is valid
				if (!isNull( date1 ) && !isNull( date2 )) {
					if (this.allday) {
						date2 = eCalendar.tomorrow(date2);
					}
					if (eEvent.type == 'create') {
						eSync.addSingleEvent(this.event.title, date1,
							date2, this.event.location);
					} else if (eEvent.type == 'edit') {
						if (!isNull( this.event.id )) {
							var e = eEasiLendar.newEasiEvent(this.event.title,
								date1, date2, this.event.location);
							eSync.editEventWithId(this.event.id, e);
						} else {
							console.log('event doesn\'t have id, something is \
								wrong');
						}
					}
				}
			}
			// close form
			this.close();
		};
	}	// end of class Form
});