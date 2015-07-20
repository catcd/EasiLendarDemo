/**
 * starter: Can Duy Cat
 * owner: Nguyen Manh Duy
 * last update: 20/07/2015 by Page
 * type: all shared sync function
 */

angular.module('MainApp.shareds.sync', [])

.factory('eCopyData', function(){

	var tomorrow= function(today) {
		var d = today.getTime();
		var result = new Date(d + 86400000);
		return result;
	};

	// yesterday of Date:
	var yesterday= function(today) {
		var d = today.getTime();
		var r = new Date(d - 86400000);
		return r;
	};
		
	return {
		extraCopy : function(uGC, uGCNew){
			
			var listNewEvent = [];

			for (var i = 0; i < uGC.length; i++) {

				// Handle all-day events 
				// start and end has value "date" instead of "dateTime":

				// Convert to form 00h00 dd/mm/yyyy -> 00h00 dd/mm/yyyy:

				if (uGC[i].end.dateTime === undefined){
					if (uGC[i].start.dateTime === undefined) {
						uGC[i].start.dateTime = new Date(uGC[i].start.date);
						uGC[i].end.dateTime = new Date(uGC[i].end.date);

						uGC[i].start.dateTime.setHours(0);	
						uGC[i].start.dateTime.setMinutes(0);
						uGC[i].end.dateTime.setHours(0);
						uGC[i].end.dateTime.setMinutes(0);
					}
				}

				// Handle long-time events 
				// start.dateTime and end.dateTime have different dates 
				// and save to array newHandleCalendar:

				var end = new Date(uGC[i].end.dateTime);
				var start = new Date(uGC[i].start.dateTime);
				uGC[i].end.dateTime = new Date(uGC[i].end.dateTime);
				uGC[i].start.dateTime = new Date(uGC[i].start.dateTime);
				// each event ends in 0h00 -> convert to 23h59 of previous day:

				if (end.getHours()+end.getMinutes()+end.getSeconds()===0) {
					end.setHours(23);
					end.setMinutes(59);
					end.setSeconds(59);
					end = yesterday(end);
				}

				// separate each long-time event to list of event:
				var b1= end.getFullYear() != start.getFullYear();
				var b2= end.getDate() != start.getDate();
				var b3= end.getMonth() != start.getMonth();
				
				if (b1 || b2 || b3) {
					
					var x = 0;

					var tempEnd = start;
					tempEnd.setHours(23);
					tempEnd.setMinutes(59);
					tempEnd.setSeconds(59);

					var tempStart = start;

					while (tempEnd.getTime() < end.getTime() + 24*60*60*1000) {

						// start day:

						if (x === 0) {
							var temp= uGC[i].start.dateTime;
							uGC[i].start.dateTime= new Date(temp);
							var fy= uGC[i].start.dateTime.getFullYear();
							var mth= uGC[i].start.dateTime.getMonth();
							var dt= uGC[i].start.dateTime.getDate();
							
							uGC[i].position = new Date(fy, mth, dt);

							tempStart = tomorrow(tempStart);

							tempStart.setHours(0);
							tempStart.setMinutes(0);
							tempStart.setSeconds(0);

							tempEnd = tomorrow(tempEnd);

						}

						// all next day from start day:
						else {
							var newEvent = JSON.parse(JSON.stringify(uGC[i]));
							var teua= newEvent.start.dateTime;
							newEvent.start.dateTime = new Date(teua);
							var tewa= newEvent.end.dateTime;
							newEvent.end.dateTime = new Date(tewa);
							var fy= tempStart.getFullYear();
							var mth= tempStart.getMonth();
							var dt= tempStart.getDate();
							newEvent.position = new Date(fy, mth, dt);

							// all- day events:

							if (tempEnd.getTime() < end.getTime()) {

								tempStart = tomorrow(tempStart);
								tempEnd = tomorrow(tempEnd);
							}

							// non all-day event:
							else {

								tempStart = tomorrow(tempStart);
								tempEnd = tomorrow(tempEnd);
							}

							listNewEvent.push(newEvent);
						}

						x++;
					}
				} else {
					var y= start.getFullYear();
					var m= start.getMonth();
					var d= start.getDate();
					var position = new Date(y, m, d);

					uGC[i].position = position;

					uGC[i].start.dateTime = start;
					uGC[i].end.dateTime = end;
				}
			}

			if (listNewEvent.length > 0) {
				for (var i = 0; i < listNewEvent.length; i++) {
					uGC.push(listNewEvent[i]);
				}
			}
			
			var arrayOfEasiEvent= [];
			
			for (var i=0; i<uGC.length; i++) {
				var EasiEvent = {summary:'', start:'', end:'', location:'', id:'', colorId:'', position:'', src:'', status:''};
				
				EasiEvent.summary= uGC[i].summary;
				EasiEvent.start= uGC[i].start.dateTime;
				EasiEvent.end= uGC[i].end.dateTime;
				EasiEvent.location= uGC[i].location;
				EasiEvent.id= uGC[i].id;
				
				if (uGC[i].colorId === undefined) 	EasiEvent.colorId = 0;
				else EasiEvent.colorId = uGC[i].colorId;
				
				EasiEvent.position= uGC[i].position;
				EasiEvent.src= uGC[i].src;
				EasiEvent.status= false;
				
				arrayOfEasiEvent.push(EasiEvent);
			}
			
			for (var i = 0; i < arrayOfEasiEvent.length; i++) {
				// make a empty array of each day:

				if (uGCNew[arrayOfEasiEvent[i].position] === undefined) {
					uGCNew[arrayOfEasiEvent[i].position] = [];
				}
			}
			
			for (var i = 0; i < arrayOfEasiEvent.length; i++) {
				uGCNew[arrayOfEasiEvent[i].position].push(arrayOfEasiEvent[i]);
			}
		},
	};
})

.factory('eSync', function(eUser, eDatabase, eCopyData){
	var eUser = eUser;
	var eDataBase = eDataBase;
	var eCopyData = eCopyData;
	
	return {		
		convertMe : function() {
			if (eUser.uGmailCalendar.length === 0) {
				return;
			}
			
			// change time:

			var uGC = {};
			uGC = eUser.uGmailCalendar;
			
			for (var i=0; i<uGC.length; i++){
				uGC[i].src = "google";
			}
			
			// array result is a array of array:

			eUser.uGmailCalendar = [];

			eCopyData.extraCopy(uGC, eUser.uGmailCalendar);
		},
		
		// Change form of date to GG's valid form:
		
		makeValidDate: function(objectDate){
		
			objectDate = new Date(objectDate);
			
			var dd = objectDate.getDate();
			var mm = objectDate.getMonth(); //January is 0!
			var yyyy = objectDate.getFullYear();
			var hh = objectDate.getHours();
			var mn = objectDate.getMinutes();
			
			if (dd < 10) {
				dd = '0' + dd;
			}

			if (mm < 10) {
				mm = '0' + mm;
			}
			
			if (hh < 10) {
				hh = '0' + hh;
			}
			
			if (mn < 10) {
				mn = '0' + mn;
			}
			
			// form of timeMax: "yyyy-mm-dd T hh:mm:ss - offset

			var result = yyyy + '-' + mm + '-' + dd;
			result += ('T' + hh + ':' + mn + ':00-00:00');
			
			return result;

		},

		handleLocalCalendar : function() {
			/* form:
						- calendar_id
						- eventLocation
						- dtstart
						- dtend
						- allDay
						- title
			*/
			
			var uLC= JSON.parse(JSON.stringify(eUser.uLocalCalendar));
		
			var newULC= [];
			
			/* var event= {id:'', start: start, 
						   end: end,
						   summary: '', 
						   location: '', 
						   status: false, 
						   position: '',
						   src: "local"
						  };
			*/
			
			for (var i=0; i<uLC.length; i++){
				if (uLC[i].calendar_id == "3" || uLC[i].calendar_id == "6")
					continue;
				
				var event= {id:'', 
							start: {dateTime:''}, 
							end: {dateTime:''}, 
							summary: '', 
							location: '', 
							status: true,
							src: 'local'
						   };
				
				event.id= uLC[i].calendar_id;
				var dts= new Date(uLC[i].dtstart);
				var dte= new Date(uLC[i].dtend);
				event.start.dateTime= dts;
				event.end.dateTime= dte;
				event.summary= uLC[i].title;
				event.location= uLC[i].eventLocation;
				
				newULC.push(event);
			}
			
			eUser.uLocalCalendar= [];
			
			eCopyData.extraCopy(newULC, eUser.uLocalCalendar);
		},
	};
});