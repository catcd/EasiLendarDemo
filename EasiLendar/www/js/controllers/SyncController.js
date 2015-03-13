/**
 * starter: Can Duy Cat
 * owner: Nguyen Manh Duy
 * last update: 11/03/2015
 * type: paticular controller
 */

angular.module('MainApp.controllers.sync', [])

.controller('SyncController', function($scope, $rootScope,$window, $document) {

    $scope.logIN = 0;
	
	var result;
	
	var apiKey = 'AIzaSyAmBIdo6sEPU5QK3lqVrflqNNyoRhCBF7I';
    var clientId = '164260242142-f2upehfvganujti5mfn53p7m2ii30i14.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/calendar';
	
    $scope.buttons = [{
        mClass: "button icon-right ion-chevron-right button-calm easi-no-border",
        click: "handleAuthClick()",
        text: "Login with your google acount"
    }, {
        mClass: "button icon-left ion-chevron-left button-calm easi-no-border",
        click: "logMeOut()",
        text: "Log out with your google acount "
    }]
	
	// function to load Google API and start all mode:
	
	$scope.handleClientLoad = function()
	{
		document.getElementById('request').style.display="none";
		document.getElementById('authorize-button').style.visibility="visible";
		document.getElementById('loadCalendar').style.visibility="visible";
		
		gapi.client.setApiKey(apiKey);
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
			alert("You have never signed in. Please log in to synchronize with your Google Calendar!");
            $scope.logIN = 0;
            authorizeButton.onclick = $scope.handleAuthClick;
        }
    }
	
	$scope.logMeOut = function() {
        $scope.logIN = 0;
		var authorizeButton = document.getElementById('authorize-button');
		
        authorizeButton.className = "button icon-right ion-chevron-right button-calm easi-no-border";
        authorizeButton.onclick = $scope.handleAuthClick;
		authorizeButton.innerHTML = "Login with your google acount";
		document.getElementById("events").innerHTML="";
		
		alert ("Inorder to log out, you have to sign out your google acount. You can synchronize by log in again...");
		
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
			
            gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    "singleEvents": "true",
                    "orderBy": "startTime",
                    'maxResults': 500
                        //'timeMin': '2015-03-08T09:43:00-04:00'
                });
                request.execute(function(resp) {
					var event= document.getElementById('events');
					
					document.getElementById("authorize-button").innerHTML = "Log out with acount " + resp.summary;
					
					$rootScope.uGmailCalendar = resp.items;
					
					if (resp.items.length==0)
					{
						event.innerHTML=("You have no calendar to synchronize... Please add a event and sync again later...");
						return;
					}
					
					var title = document.createElement('h2');
					title.appendChild(document.createTextNode("[DEMO] Events get from email "));
					title.appendChild(document.createTextNode(resp.summary));
					title.appendChild(document.createTextNode(": "));
					event.appendChild(title);
					
					var ol= document.createElement ('ol');
					
                    for (var i = 0; i < resp.items.length; i++) {
                        var li = document.createElement('li');
                        var at = document.createTextNode("  on  ");
                        var inn = document.createTextNode("  in  ");
                        
                        li.appendChild(document.createTextNode(resp.items[i].summary));
                        li.appendChild(at);
                        li.appendChild(document.createTextNode(resp.items[i].end.dateTime));
						
						if (document.createTextNode(resp.items[i].location) == "undefined")
						{
							li.appendChild(inn);
							li.appendChild(document.createTextNode(resp.items[i].location));
						}
						
                        ol.appendChild(li);
                    }
					
					event.appendChild(ol);
					
					alert("Your calendar was Synchronized");
                });
            });
        } else {
            alert("You have to log in first");
        }
    }
})
