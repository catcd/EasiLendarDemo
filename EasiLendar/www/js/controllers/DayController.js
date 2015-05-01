/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 30/04/2015
 * type: day controller
 */

angular.module('MainApp.controllers.day', [])

.controller("DayController", function($scope, $rootScope,eSettings,eCalendar, eEasiLendar,eUser) {
	$scope.eUser = eUser;
	$scope.eCalendar = eCalendar;
	$scope.eEasiLendar = eEasiLendar;
	$scope.eSettings = eSettings;
	$scope.bkgE = 'bkg';
	function DayCalendar(){
	var curDate = new Date();
	this.Day = eEasiLendar.newDay(curDate);
	var setNavDate = function(date){
		var check = date.date %10;
		if(check == 1) {
		return date.date+ "st";
		}else if(check ==2){
			return date.date + "nd";}
		else{return date.date + "th";}
		
	
	};
	var setHours = function () {
			var hours = [];
			for (var i = 0; i < 24; i++) {
				if (i == 0) {
					hours[i] = "12AM";
				} else if (i < 12) {
					hours[i] = i + "AM";
				} else if (i == 12) { 
					hours[i] = i + "PM";
				} else {
					hours[i] = (i - 12) + "PM";
				} 
			}
			return hours;
	};
	var setNavMonth = function(month1, month2) {
		if (month1 == month2) {
			return eCalendar.months[month1];
		} else {
			return eCalendar.months[month1] + "-" + eCalendar.months[month2];
		}
	};
	function FirstLastDay (day){
		var start =eSettings.sFirstDay;
		var pos,sub,add,posOfDay;
		switch(start){	case "Monday":	pos = 6;
						case "Saturday":	pos = 1;
						case "Sunday":	pos = 0;
				};
		var FirstLastDay =[];		
		for(var i=0; i<7;i++){
			if(day.day == eCalendar.weekDays[i])
			{posOfDay = i; break;}
		}
		sub = (posOfDay +pos)%7;
		add = 7-sub;
		for(var i=0; i<sub;i++){
			day = day.prevDay();
			}
		FirstLastDay[0] = day;
		for(var i=0; i<6; i++){
			day = day.nextDay();
			}
		FirstLastDay[1] = angular.copy(day);
		for(var i=0; i<add; i++){
			day = day.prevDay();
			}
			
		return FirstLastDay;
	};
	
	
	
	//set Navigation time 
	this.setNavTime = function(day){
		 week = FirstLastDay(day);
		this.FirstDayInWeek = week[0].date;
		this.LastDayInWeek = week[1].date;	
	
		this.navMonth = eCalendar.months[day.month];// Time grid
		this.nav_Month= setNavMonth(week[0].month,week[1].month) ;//event list
		
		this.navYear = day.year;
		
		this.navDate = setNavDate(day);//Time grid
		this.nav_Date = day.date;//event list
		
		this.navDay = day.day;//time grid
		this.nav_Day = new Date(day.year, day.month, day.date,0,0,0,0);
		this.indexOfNavDay = this.nav_Day.toString();
		
		this.navBackground = 'bkg-style ' +"easi-" + eCalendar.shortMonths[day.month] + "-bkg";//Time grid
		this.nav_Background = 'bkg ' +"easi-" + eCalendar.shortMonths[day.month] + "-bkg";//Time grid
		this.Day = day;
	
	};
	/* hours to display in calendar
		 * 0 - 23
		 */
	this.hours = setHours();
	// day-content height
	this.contentHeight = {
		"height": "80%",
	};
	// set content height function
	this.setContentHeight = function() {
		var max = 0;			
			if (this.Day.events != null) {
				if(this.Day.events.length > max) {
					max = this.Day.events.length;
				}
			}
			var height = 25 + 30 + max*22;
		this.contentHeight = {
			"height": 'calc(100% - '+height+'px)',
		}	
	};
	
	var week = FirstLastDay(this.Day);
	this.FirstDayInWeek = week[0].date;
	this.LastDayInWeek = week[1].date;
	
	this.navMonth = eCalendar.months[this.Day.month];//Time grid;
	this.nav_Month= setNavMonth(week[0].month,week[1].month) ;//event list
	
	this.navYear = this.Day.year;
	this.navDate = setNavDate(this.Day);
	this.nav_Date = this.Day.date;
	this.navDay = this.Day.day;
	this.nav_Day = new Date(this.Day.year, this.Day.month, this.Day.date,0,0,0,0);
	this.indexOfNavDay = this.nav_Day.toString();
	
	this.navBackground = 'bkg-style ' +"easi-" + eCalendar.shortMonths[this.Day.month] + "-bkg";//Time grid
	this.nav_Background = 'bkg ' +"easi-" + eCalendar.shortMonths[this.Day.month] + "-bkg";//Event list
	this.nextDay = function(){
	this.setNavTime(this.Day.nextDay());};
	
	this.prevDay = function(){
	this.setNavTime(this.Day.prevDay());}
	};
	
/* 
	 * convert navDays from array of Object Day
	 * to array of Object WeekDay
	 * most important function*/     	
	
	this.setNavDay = function(){
		this.navDay = new set_Day(this.navDay);
		if(this.navDay.events !=null){
			var length = this.navDay.events.length;
			Console.log('4');
			for(var j=0; j<length;j++){
				if(this.navDay.events[j].event.type =="over"){
					var next_Day = this.navDay.nextDay();
					var dur = this.navDay.events[j].duration;
					for(var k=1;k<dur;k++){
						if(next_Day.events !=null && next_Day.events[j]!=null){
							for(var t=length; t>j;t--)
							{
								next_Day.events[t] = next_Day.events[t-1];
							}
							next_Day.events[j]= new EmptyEvent(this.navDay.events[j]);
						}else if(next_Day.events != null){
						var kLength = next_Day.events.length;
						for(var t=kLength;t<j;t++){
						next_Day.events[t] = new EmptyEvent(next_Day.events[j]);
						}
						}else {
						next_Day.events = [];
							for(var t=0;t<=j;t++)
							{
								next_Day.events[t] = new EmptyEvent(this.navDay.events[j]);
							}
						}
						next_Day = next_Day.nextDay();
					}
				}
			}
		}
	// set height for the day content
			this.setContentHeight();
	};

	function set_Day(day){
	//the original day
		this.origin = day;
		/*private set events to match type, null if don't have*/
		this.setEvent = function(type){
			if(this.origin!= null && this.origin.events != null){
				var event = [];
				var j=0;
				//not normal
				if(type == null){
					for(var i=0;i<this.origin.events.length;i++){
						switch(this.origin.events[i].type){
							case "all":
								event[j++] = new AllEvent(this.origin.events[i]);break;
							case "over": 
								var start = this.origin.events[i].origin.start.dateTime;
								var date = this.origin.date;
								var year = this.origin.year;
								var month = this.origin.month;
								if(start.getFullYear() == year && start.getMonth()==month && start.getDate()==date)
								{
									event[j++] = new OverEvent(this.origin.events[i],this.origin);
								}
						}
					}
				} else{
					for(var i=0;i<this.origin.events.length;i++)
					{
						if(this.origin.events[i].type == type){
							event[j++] = new NorEvent(this.origin.events[i]);
						}
					}
				}
				if(j==0) return null;
				return event;
			} else return null;
		};
	// array of allday, overday and empty events
		this.events = this.setEvent();
		// array of normal event
		this.norEvent = this.setEvent("normal");
	};	
	
	/*
	 * class NorEvent
	 * event is the Object Event of rootScope
	 */
	function NorEvent(event) {
		// copy the original event
		this.event = event;

		// re-construct dateTime to calculate (mins)
		this.start = eEasiLendar.newTime(event.origin.start.dateTime);
		
		// re-construct dateTime to calculate (mins)
		this.end = eEasiLendar.newTime(event.origin.end.dateTime);
		
		/*
		 * PRIVATE
		 * this function find height (in px)
		 * of this event
		 * from start to end (in minutes)
		 * each 12 mins is 8px
		 */
		this.durationToPx = function() {
			// assume that it's in one day
			var dur = this.end.minutes - this.start.minutes;
			if (parseInt(dur/12 * 8) > 20)
				return parseInt(dur/12 * 8)+"px";
			else return 20+"px";
		};
	
		/* 
		 * PRIVATE
		 * this function set margin (in px)
		 * from 00:00
		 * to the start time of this event
		 * Note: 24 hour is 960px height
		 * => each hour is 40px
		 * => each 12 minutes is 8px
		 */
		this.startToPx = function() {
			// time in minutes
			var min = this.start.minutes;
			return parseInt(min/12 * 8) + "px";
		};
		
		// all display variable
		this.height = this.durationToPx();
		this.margin = this.startToPx();
		this.style = {
			"height": this.height,
			"margin-top": this.margin,
			"background-color": this.event.color,
		};
	}; // end of class NorEvent
	
	/*
	 * class AllEvent
	 * event is the Object Event of rootScope
	 */
	function AllEvent(event) {
		// copy the original event
		this.event = event;
		
		this.style = {
			"background-color": this.event.color,
			'width': '100%',
			'height': '20px',
			'color': 'white',
			'text-align': 'left',
			'margin-top': '2px',
			'font-size': '15px',
			'overflow': 'hidden',
			'position': 'relative',
			'z-index': '1',
		};
		
	}; // end of class AllEvent
	
	/*
	 * class OverEvent
	 * event is the Object Event of rootScope
	 * date is object Day (the first day of event or first day of week)
	 */
	function OverEvent(event, date) {
		// copy the original event
		this.event = event;
		
		/*
		 * PRIVATE
		 * set the width of this event (in %)
		 * depends on how many days
		 */
		this.setWidth = function() {
			var startDate = date.toDate();
			var endDate = event.origin.end.dateTime;
			var duration = endDate.getDate() - startDate.getDate() + 1;	// the remain duration of event since "date"
			var startDay = (startDate.getDay()+6) % 7;	// 0(Mon) - 6(Sun)
			var startOfWeek = eSettings.sFirstDay.slice(0,3);	// Mon - Sun

			var endOfWeek = 6; // always is 6
			switch(startOfWeek) {
				case "Mon": break;	// Mon(0) - Sun(6)
				case "Sat": startDay = (startDay+2)%7; break; // Sat(0) - Fri(6)
				case "Sun": startDay = (startDay+1)%7; break;	// Sun(0) - Sat(6)
			};
			var tempDuration = endOfWeek - startDay + 1; // the duration within this week
			
			// if this event cross over the next week
			if (duration >= tempDuration) {
				return tempDuration*100;
			} else {
				return duration*100;
			}
		};
		this.duration = this.setWidth() / 100;
		this.width = (this.setWidth()+3) + "%";
		this.style = {
			"width": this.width,
			"background-color": this.event.color,
			'height': '20px',
			'font-size': '15px',
			'color': 'white',
			'overflow': 'hidden',
			'text-align': 'left',
			'margin-top': '2px',
			'position': 'relative',
			'z-index': '1',
		};
	}; // end of class OverEvent
	
	/*
	 * class EmptyEvent
	 * for display over-day event
	 */
	function EmptyEvent(event) {
		// set function
		var set = function() {
			var temp = angular.copy(event.event);
			temp.origin.summary = null;
			return temp;
		};
		
		this.event = set();
		
		this.style = {
			"height" : "20px",
			"width": "90%",
			"margin-top": "2px",
			'position': 'relative',
			'z-index': '1',
		};
	}; // end of class EmptyEvent
	$scope.newDayCalendar = function() {
		return new DayCalendar();
	};
	$scope.navigationDay = $scope.newDayCalendar();
	var view = eSettings.sDayView;
	$scope.viewCalendar = function(view){
	if(view=="timeGrid") return true
	};
	$scope.view_Calendar = function(view){
	if(view=="eventList") return true
	};
	
});




