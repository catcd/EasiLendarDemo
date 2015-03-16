/**
 * starter: Can Duy Cat
 * owner: Nguyen Manh Duy
 * last update: 13/03/2015
 * type: paticular controller
 */
 
angular.module('MainApp.controllers.sync', [])

.controller('SyncController', function($scope, $rootScope,$window, $document) {

    $scope.logIN = 0;
	
	$scope.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	$scope.months = [
                    'January', 'February','March', 'April', 'May',
                    'June', 'July', 'August', 'September','October',
                     'November', 'December'
                    ];
	$scope.typesOfEvent = ['BirthDay', 'Holiday', 'Restaurant', 'Important', 'Normal'];
	
	var result;
	
	var apiKey = 'AIzaSyAmBIdo6sEPU5QK3lqVrflqNNyoRhCBF7I';
    var clientId = '164260242142-4er9a46uufjlu6h6hsbv3s7479mqv6pr.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/calendar';
	
    $scope.buttons = [{
        mClass: "button icon-right ion-chevron-right button-calm easi-no-border",
        click: "handleAuthClick()",
        text: "Login with your google account"
    }, {
        mClass: "button icon-left ion-chevron-left button-calm easi-no-border",
        click: "logMeOut()",
        text: "Log out with your google account "
    }]
	
	// function to load Google API and start all mode:
	
	$scope.handleClientLoad = function()
	{
		//gapi.client.setApiKey(apiKey);
		window.setTimeout($scope.checkAuth,1);
	}
	
	
    $scope.checkAuth = function() { 		
        gapi.auth.authorize({
            client_id: clientId,
            scope: scopes,
            immediate: true,
            cookie_policy: 'single_host_origin'
        }, $scope.handleAuthResult);
    }

    $scope.handleAuthResult = function (authResult) {
        var authorizeButton = document.getElementById('authorize-button');

        if (authResult && !authResult.error) {
            $scope.logIN = 1;
			authorizeButton.innerHTML="Loading your calendar from Google calendar...";
			authorizeButton.className="button icon-left ion-chevron-left button-calm easi-no-border";
			authorizeButton.onclick= $scope.logMeOut;
			result= authResult.access_token;
	
            $scope.makeApiCall();
			
        } else {
			$rootScope.showAlert("You have never signed in. Please log in to synchronize with your Google Calendar!");
            $scope.logIN = 0;
            authorizeButton.onclick = $scope.handleAuthClick;
        }
    }
	
	$scope.logMeOut = function() {
        $scope.logIN = 0;
		var authorizeButton = document.getElementById('authorize-button');
		
        authorizeButton.className = "button icon-right ion-chevron-right button-calm easi-no-border";
        authorizeButton.onclick = $scope.handleAuthClick;
		authorizeButton.innerHTML = "Login with your google account";
		document.getElementById("events").innerHTML="";
		
		$rootScope.showAlert("In order to log out, you have to sign out your google account by your web browser. You can synchronize by log in again...");
		
		// code for local host:
		
		gapi.auth.setToken(null);
		
		// code can not be used for local host:
		
		/*var theUrl= 'https://accounts.google.com/o/oauth2/revoke?token='+result; 
		
		var li = document.createElement('li');
		
		li.appendChild(document.createTextNode(theUrl));
		document.getElementById('events').appendChild(li);
		
		var xmlHttp = null;

		xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false );
		xmlHttp.send( null ); */
    }
	
    $scope.handleAuthClick = function(event) {
        if ($scope.logIN != 0) {
            //do nothing...
            return true;
        }
		else {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                approval_prompt: 'force',
                include_granted_scopes: false,
                immediate: false,
				cookie_policy: 'single_host_origin'
            }, $scope.handleAuthResult);
			
            return false;
        }
    }

    $scope.makeApiCall = function() {
        if ($scope.logIN !=0) {
            
			document.getElementById('events').innerHTML="";
			
            // default max result = 250
			// default farthest day is one year ago
			
			var toDay = new Date();
			var dd = toDay.getDate();
			var mm = toDay.getMonth()+1; //January is 0!
			var yyyy = toDay.getFullYear();

			if(dd<10) {
				dd='0'+dd;
			} 

			if(mm<10) {
				mm='0'+mm;
			} 

			toDay = mm+'/'+dd+'/'+yyyy;
			
			// form of timeMax: "yyyy-mm-dd T hh:mm:ss - offset
			
			var oneYearAgo= (yyyy-1) + '-' + mm + '-' + dd + 'T' + '00:00:00-00:00';
            
			// Load calendar from one year ago:
			
			gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    "singleEvents": "true",
                    'maxResults': 1000,
					"orderBy": "startTime",
					
                    'timeMin': oneYearAgo
                });
                request.execute(function(resp) {
					
					var event= document.getElementById('events');
				
					document.getElementById("authorize-button").innerHTML = "Log out with account " + resp.summary;
					
					$rootScope.uGmailCalendar = resp.items;
					
					// Test:
					
					if (resp.items.length==0)
					{
						event.innerHTML=("You have no calendar to synchronize... Please add a event and sync again later...");
						return;
					}
					
					$scope.convertMe();
					
					// result:
					
					console.log($rootScope.mLength($rootScope.uGmailCalendar));
					console.log($rootScope.uGmailCalendar);
					
					/* For info:
					
					var event= document.getElementById('events');
					var title = document.createElement('h2');
					
					title.appendChild(document.createTextNode("Everything up-to-date"));
					
					event.appendChild(title);
					*/
					
					// For test:
					
					var title = document.createElement('h4');
					title.appendChild(document.createTextNode("[DEMO] Events get from email "));
					title.appendChild(document.createTextNode(resp.summary));
					title.appendChild(document.createTextNode(": "));
					event.appendChild(title);
			
					var ol= document.createElement ('ol');
					
					// test from 1/3/2015 -> 30/3/2015:
					
					for (var i=1; i< 30; i++)
					{
						var date = new Date(2015, 3, i, 0,0,0,0);
					
						var toDay= $rootScope.uGmailCalendar[date];
						if (toDay== undefined){
							continue;
						}
						
						var li = document.createElement('li');
						li.appendChild(document.createTextNode("************Next**Day********************"));
						
						ol.appendChild(li);
						event.appendChild(ol);
						
						for (var j=0; j< toDay.length; j++){
							var li = document.createElement('li');
							var at = document.createTextNode("  on  ");
							var inn = document.createTextNode("  in  ");
                        
							li.appendChild(document.createTextNode(toDay[j].summary));
							li.appendChild(at);
							li.appendChild(document.createTextNode(toDay[j].end.dateTime + '-' + toDay[j].date + '/' + toDay[j].month + '/' + toDay[j].year));
						
							ol.appendChild(li);
						}
					}
					
					$rootScope.showAlert("Your calendar was update");
                });
            });
        } else {
            $rootScope.showAlert("You have to log in first");
        }
    }
	
	$scope.convertMe = function() {
		// change time:
		
		var uGC= {};
		uGC= $rootScope.uGmailCalendar;
		
		// array result is a array of array:
		
		$rootScope.uGmailCalendar = new Array();
		
		
		for(var i=0;i<uGC.length;i++){
			uGC[i].end.dateTime = new Date(uGC[i].end.dateTime);
			uGC[i].start.dateTime = new Date(uGC[i].start.dateTime);
			
			// value position to get the position of array of event:
			
			var position= new Date(uGC[i].start.dateTime.getFullYear(), uGC[i].start.dateTime.getMonth()+1, uGC[i].start.dateTime.getDate(), 0, 0, 0, 0);
			uGC[i].position= position;
			
			//Conver time to Day in week and Date in Month
			
			var date = uGC[i].start.dateTime.getDate();
			var day = $scope.days[uGC[i].start.dateTime.getDay()];
			var month = uGC[i].start.dateTime.getMonth() + 1;
			var year = uGC[i].start.dateTime.getFullYear();
			
			uGC[i].date = date;
			uGC[i].day = day;
			uGC[i].month = month;	
			uGC[i].year = year;
	
			//Convert time to Hour and Minute
			if(uGC[i].end.dateTime.getHours() >= 12) { var termEnd = 'PM';}
			else {termEnd = 'AM';}
			if(uGC[i].start.dateTime.getHours() >= 12) { var termStart = 'PM';}	
			else {termStart = 'AM'; }
			
			uGC[i].end.dateTime = uGC[i].end.dateTime.getHours() + ':' + (uGC[i].end.dateTime.getMinutes() < 10 ? '0':'') + uGC[i].end.dateTime.getMinutes() + termEnd ;
			uGC[i].start.dateTime = uGC[i].start.dateTime.getHours() + ':' + (uGC[i].start.dateTime.getMinutes() < 10 ? '0':'') + uGC[i].start.dateTime.getMinutes() + termStart;	
			
			uGC[i].mStatus= false;
			
			// make a empty array of each day:
		
			$rootScope.uGmailCalendar[position] = new Array();
		}
		
		for(var i=0;i<uGC.length;i++){
			$rootScope.uGmailCalendar[uGC[i].position].push(uGC[i]);
		}
	}
	
	/* */
	$rootScope.mLength= function(array) {
		var dem=0;
		for (var x in array) {
			dem++;
		}
		
		return dem;
	};
	
})
