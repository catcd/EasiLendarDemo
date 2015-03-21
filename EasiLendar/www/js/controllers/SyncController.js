/**
 * starter: Can Duy Cat
 * owner: Nguyen Manh Duy
 * last update: 21/03/2015
 * type: paticular controller
 */
 
angular.module('MainApp.controllers.sync', [])

.controller('SyncController', function($scope, $rootScope, $window, $document, $cordovaCalendar) {

    $scope.logIN = -1;
	
	$scope.logInResult= false;
	var email= '';
	
	var apiKey = 'AIzaSyAmBIdo6sEPU5QK3lqVrflqNNyoRhCBF7I';
    var clientId = '164260242142-4er9a46uufjlu6h6hsbv3s7479mqv6pr.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/calendar';
	
	// function should be called in the first Sign-In (for Page):
	
	$rootScope.logInToGmailCalendar = function() {
		
		// Log in to google account:
		
		gapi.auth.authorize({
            client_id: clientId,
            scope: scopes,
            immediate: true,
			approval_prompt: 'force',
            include_granted_scopes: false,
            cookie_policy: 'single_host_origin'
        }, $scope.testLogInResult);
		
		return $scope.logInResult;

	}
	
	$scope.testLogInResult = function (authResult) {
		
        if (authResult && !authResult.error) {
			$scope.logInResult= true;
			$scope.logIN= 1;
			
			makeApiCall();
		}
			
		else {
			$scope.logInResult= false;
			$scope.logIN= 0;
		}	
    }
	
	// function to load Google API and start all mode when click sync button:
	
	$scope.handleClientLoad = function(){
		if ($scope.logIN== -1){
			window.setTimeout($scope.checkAuth,1);
		}
	}
	
    $scope.checkAuth = function() { 		
        gapi.auth.authorize({
            client_id: clientId,
            scope: scopes,
            immediate: true,
            cookie_policy: 'single_host_origin'
        }, $scope.handleAuthResult);
		
    }
	
	$scope.buttonAffect = function () {
		
		var authorizeButton = document.getElementById('authorize-button');
		var updateButton = document.getElementById('update-button');
		
		var hello = document.getElementById('hello');
		
		authorizeButton.style.visibility= "visible";
		
		if ($scope.logIN == 0){
			authorizeButton.className = "button icon-left ion-social-googleplus button-calm easi-no-border";
			authorizeButton.onclick = $scope.handleAuthClick;
			authorizeButton.innerHTML = "Log in your google account";
			hello.style.visibility= "hidden";
			
			updateButton.style.visibility= "hidden";
			document.getElementById('div-log-in').style.marginTop= "-20px";
		}

		else if ($scope.logIN == 1){
			authorizeButton.className = "button icon-left icon icon ion-log-out button-calm easi-no-border";
			authorizeButton.style.backgroundColor= "#416969";
			authorizeButton.style.width = "270px";
		
			authorizeButton.onclick = $scope.logMeOut;
			authorizeButton.innerHTML = "Log out your google account";
			
			if (email != '')	{
				hello.style.visibility= "visible";
				hello.innerHTML = "Hi, " + email;
			}
			
			updateButton.style.width = "270px";
			updateButton.className = "button icon-left ion-loop";
			updateButton.style.visibility= "visible";
			updateButton.innerHTML= "Update your google calendar";
			updateButton.onclick = $scope.makeApiCall;
			document.getElementById('div-log-in').style.marginTop= "45px";
		}	
	}
	
    $scope.handleAuthResult = function (authResult) {
        var authorizeButton = document.getElementById('authorize-button');

        if (authResult && !authResult.error) {
            $scope.logIN = 1;
			//result= authResult.access_token;
			var temp;
			
			gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    "singleEvents": "true",
                    'maxResults': 1,
					"orderBy": "startTime",
                });
				request.execute(function(resp) {
					if (resp.items.length != 0) {
						email =  resp.items[0].creator.email;
						$scope.buttonAffect();
					}
				});
			});
        }
		
		else {
			$rootScope.showAlert("You have never signed in. Please log in to synchronize with your Google Calendar!");
            $scope.logIN = 0;
			$scope.buttonAffect();
        }
    }
	
	$scope.doNoThing = function(authResult) {
		
	}
	
	$scope.logMeOut = function() {
        $scope.logIN = 0;
		
		$rootScope.showAlert("In order to log out, you have to sign out your google account by your web browser");
		
		$scope.buttonAffect();
		
		// code for local host:
		
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
	
	$scope.handleResult =  function (authResult) {
       
        if (authResult && !authResult.error) {
            $scope.logIN = 1;
			
			//result= authResult.access_token;
		
			// Load calendar:
			
			$scope.makeApiCall();
		}	
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
            }, $scope.handleResult);
			
            return false;
        }
    }

    $scope.makeApiCall = function() {
        if ($scope.logIN == 1) {
            
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
			
			document.getElementById('authorize-button').onclick= $scope.doNoThing;
			document.getElementById('update-button').onclick= $scope.doNoThing;

			gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    "singleEvents": "true",
                    'maxResults': 1000,
					"orderBy": "startTime",
					
                    'timeMin': oneYearAgo
                });
				
                request.execute(function(resp) {
					
					if (resp.items.length != 0) {
						email =  resp.items[0].creator.email;
					}
					
					$scope.buttonAffect();
			
					$rootScope.eUser.uGmailCalendar = resp.items;
					
					$scope.convertMe();
					
					console.log($rootScope.eUser.uGmailCalendar);
					
					$rootScope.showAlert("Your calendar was update");
					
                });
            });
		}
    }
	
	// tomorrow of Date:
	
	$scope.tomorrow = function(today) {
		var d = today.getTime();
		var result = new Date (d + (24 * 60 * 60 * 1000));
		return result;
	}
	
	// yesterday of Date:
	
	$scope.yesterday = function(today) {
		var d = today.getTime();
		var r = new Date (d - (24 * 60 * 60 * 1000));
		return r;
	}
	
	$scope.convertMe = function() {
		if ($rootScope.eUser.uGmailCalendar.length== 0)	return;
		
		// change time:
		
		var uGC= {};
		uGC= $rootScope.eUser.uGmailCalendar;
		
		// array result is a array of array:
		
		$rootScope.eUser.uGmailCalendar = new Array();
		
		var listNewEvent = new Array();
				
		for(var i=0;i<uGC.length;i++){
			
			// Handle all-day events (event.start and event.end has value "date" instead of "dateTime"):
			
			// Convert to form 00h00 dd/mm/yyyy -> 00h00 dd/mm/yyyy:
			
			if ((uGC[i].end.dateTime== undefined || uGC[i].start.dateTime== undefined)){
				uGC[i].start.dateTime= new Date(uGC[i].start.date);
				uGC[i].end.dateTime= new Date(uGC[i].end.date);
				
				uGC[i].start.dateTime.setHours(0);
				uGC[i].start.dateTime.setMinutes(0);
				uGC[i].end.dateTime.setHours(0);
				uGC[i].end.dateTime.setMinutes(0);
			}
			
			// Handle long-time events (event.start.dateTime and event.end.dateTime have two different date) and save to array newHandleCalendar:
			
			var end = new Date(uGC[i].end.dateTime);
			var start = new Date(uGC[i].start.dateTime);
			
			// each event ends in 0h00 -> convert to 23h59 of previous day:
			
			if (end.getHours() == 0 && end.getMinutes() == 0 && end.getSeconds() == 0){
				end.setHours(23);
				end.setMinutes(59);
				end.setSeconds(59);
				end = $scope.yesterday(end);
			}
			
			// separate each long-time event to list of event:
			
			if (end.getFullYear() != start.getFullYear() || end.getDate() != start.getDate() || end.getMonth() != start.getMonth()){
				var x=0;
				
				var tempEnd= start;
				tempEnd.setHours(23);
				tempEnd.setMinutes(59);
				tempEnd.setSeconds(59);
				
				var tempStart= start;
		
				while (tempEnd.getTime() < end.getTime() + 24*60*60*1000){
				
					// start day:
	
					if (x==0){
						
						uGC[i].start.dateTime= new Date(uGC[i].start.dateTime);
						uGC[i].position = new Date(uGC[i].start.dateTime.getFullYear(), uGC[i].start.dateTime.getMonth(), uGC[i].start.dateTime.getDate());
						
						tempStart = $scope.tomorrow(tempStart);
						
						tempStart.setHours(0);
						tempStart.setMinutes(0);
						tempStart.setSeconds(0);
						
						tempEnd= $scope.tomorrow(tempEnd);
						
						uGC[i].mStatus= false;
					}
					
					// all next day from start day:
					
					else{
						var newEvent = JSON.parse( JSON.stringify( uGC[i] ) );
						newEvent.position= new Date(tempStart.getFullYear(), tempStart.getMonth(), tempStart.getDate());
						
						// all- day events:
						
						if (tempEnd.getTime() < end.getTime()){
							
							tempStart= $scope.tomorrow(tempStart);
							tempEnd= $scope.tomorrow(tempEnd);
						}
						
						// non all-day event:
						
						else{
							
							tempStart= $scope.tomorrow(tempStart);
							tempEnd= $scope.tomorrow(tempEnd);
						}
						
						newEvent.mStatus= false;
						listNewEvent.push(newEvent);
					}
					
					x++;
				}
			}
			
			else{
				var position= new Date(start.getFullYear(), start.getMonth(), start.getDate());
			
				uGC[i].position= position;
	
				uGC[i].mStatus= false;
			
				uGC[i].start.dateTime= start;
				uGC[i].end.dateTime= end;
			}
		}
	
		if (listNewEvent.length >0){
			for (var i=0; i< listNewEvent.length; i++){
				uGC.push(listNewEvent[i]);
			}
		}
		
		for (var i=0; i< uGC.length; i++){
			// make a empty array of each day:
		
			if ($rootScope.eUser.uGmailCalendar[uGC[i].position] == undefined)
				$rootScope.eUser.uGmailCalendar[uGC[i].position] = new Array();
		}
		
		for(var i=0;i<uGC.length;i++){
			$rootScope.eUser.uGmailCalendar[uGC[i].position].push(uGC[i]);
		}
	}
	
	/*  Sync to local calendar
		Use Cordova.calendar  */
		
	$scope.syncToLocal= function(){
		
		// Fail to connect:
		
		if ($window.plugins == undefined){
			$scope.showAlert("Can not sync with your local calendar");
			return;
		}
		
		// Access:
		
		$cordovaCalendar.listCalendars().then(function (result) {
			//success:
			
			$rootScope.eUser.uLocalCalendar= result;
			$scope.showAlert("Your local calendar was update");
		
		}, function (err) {
			// error:
			
			$scope.showAlert("Can not sync with your local calendar");
		});
	}
})
