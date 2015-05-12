/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 12/05/2015
 * type: paticular controller
 */

var gapi=window.gapi=window.gapi||{};gapi._bs=new Date().getTime();(function(){var f=encodeURIComponent,g=window,k=decodeURIComponent,n="shift",p="replace",q="split",u="push",y="test",B="length",C="join";var D=g,E=document,aa=D.location,ba=function(){},ca=/\[native code\]/,G=function(a,b,c){return a[b]=a[b]||c},da=function(a){for(var b=0;b<this[B];b++)if(this[b]===a)return b;return-1},ea=function(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a[B];d++){var e=a[d];e!=c&&b[u](e);c=e}return b},H=function(){var a;if((a=Object.create)&&ca[y](a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a},I=G(D,"gapi",{});var J;J=G(D,"___jsl",H());G(J,"I",0);G(J,"hel",10);var K=function(){var a=aa.href,b;if(J.dpo)b=J.h;else{b=J.h;var c=RegExp("([#].*&|[#])jsh=([^&#]*)","g"),d=RegExp("([?#].*&|[?#])jsh=([^&#]*)","g");if(a=a&&(c.exec(a)||d.exec(a)))try{b=k(a[2])}catch(e){}}return b},fa=function(a){var b=G(J,"PQ",[]);J.PQ=[];var c=b[B];if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},h=0;h<c;h++)b[h](e)},L=function(a){return G(G(J,"H",H()),a,H())};var M=G(J,"perf",H()),N=G(M,"g",H()),ga=G(M,"i",H());G(M,"r",[]);H();H();var O=function(a,b,c){var d=M.r;"function"===typeof d?d(a,b,c):d[u]([a,b,c])},Q=function(a,b,c){b&&0<b[B]&&(b=P(b),c&&0<c[B]&&(b+="___"+P(c)),28<b[B]&&(b=b.substr(0,28)+(b[B]-28)),c=b,b=G(ga,"_p",H()),G(b,c,H())[a]=(new Date).getTime(),O(a,"_p",c))},P=function(a){return a[C]("__")[p](/\./g,"_")[p](/\-/g,"_")[p](/\,/g,"_")};var S=H(),T=[],U=function(a){throw Error("Bad hint"+(a?": "+a:""));};T[u](["jsl",function(a){for(var b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b];"object"==typeof c?J[b]=G(J,b,[]).concat(c):G(J,b,c)}if(b=a.u)a=G(J,"us",[]),a[u](b),(b=/^https:(.*)$/.exec(b))&&a[u]("http:"+b[1])}]);var ha=/^(\/[a-zA-Z0-9_\-]+)+$/,ia=/^[a-zA-Z0-9\-_\.,!]+$/,ja=/^gapi\.loaded_[0-9]+$/,ka=/^[a-zA-Z0-9,._-]+$/,oa=function(a,b,c,d){var e=a[q](";"),h=e[n](),l=S[h],m=null;l?m=l(e,b,c,d):U("no hint processor for: "+h);m||U("failed to generate load url");b=m;c=b.match(la);(d=b.match(ma))&&1===d[B]&&na[y](b)&&c&&1===c[B]||U("failed sanity: "+a);return m},qa=function(a,b,c,d){a=pa(a);ja[y](c)||U("invalid_callback");b=V(b);d=d&&d[B]?V(d):null;var e=function(a){return f(a)[p](/%2C/g,",")};return[f(a.e)[p](/%2C/g,",")[p](/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.a?"/am="+e(a.a):"",a.c?"/rs="+e(a.c):"",a.d?"/t="+e(a.d):"","/cb=",e(c)][C]("")},pa=function(a){"/"!==a.charAt(0)&&U("relative path");for(var b=a.substring(1)[q]("/"),c=[];b[B];){a=b[n]();if(!a[B]||0==a.indexOf("."))U("empty/relative directory");else if(0<a.indexOf("=")){b.unshift(a);break}c[u](a)}a={};for(var d=0,e=b[B];d<e;++d){var h=b[d][q]("="),l=k(h[0]),m=k(h[1]);2==h[B]&&l&&m&&(a[l]=a[l]||m)}b="/"+c[C]("/");ha[y](b)||U("invalid_prefix");c=W(a,"k",!0);d=W(a,"am");e=W(a,"rs");a=W(a,"t");return{e:b,version:c,a:d,c:e,d:a}},V=function(a){for(var b=[],c=0,d=a[B];c<d;++c){var e=a[c][p](/\./g,"_")[p](/-/g,"_");ka[y](e)&&b[u](e)}return b[C](",")},W=function(a,b,c){a=a[b];!a&&c&&U("missing: "+b);if(a){if(ia[y](a))return a;U("invalid: "+b)}return null},na=/^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,ma=/\/cb=/g,la=/\/\//g,ra=function(){var a=K();if(!a)throw Error("Bad hint");return a};S.m=function(a,b,c,d){(a=a[0])||U("missing_hint");return"https://apis.google.com"+qa(a,b,c,d)};var X=decodeURI("%73cript"),Y=function(a,b){for(var c=[],d=0;d<a[B];++d){var e=a[d];e&&0>da.call(b,e)&&c[u](e)}return c},sa=function(a){"loading"!=E.readyState?Z(a):E.write("<"+X+' src="'+encodeURI(a)+'"></'+X+">")},Z=function(a){var b=E.createElement(X);b.setAttribute("src",a);b.async="true";(a=E.getElementsByTagName(X)[0])?a.parentNode.insertBefore(b,a):(E.head||E.body||E.documentElement).appendChild(b)},ta=function(a,b){var c=b&&b._c;if(c)for(var d=0;d<T[B];d++){var e=T[d][0],h=T[d][1];h&&Object.prototype.hasOwnProperty.call(c,e)&&h(c[e],a,b)}},va=function(a,b){ua(function(){var c;c=b===K()?G(I,"_",H()):H();c=G(L(b),"_",c);a(c)})},xa=function(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);ta(a,c);var d=a?a[q](":"):[],e=c.h||ra(),h=G(J,"ah",H());if(h["::"]&&d[B]){for(var l=[],m=null;m=d[n]();){var v=m[q]("."),v=h[m]||h[v[1]&&"ns:"+v[0]||""]||e,t=l[B]&&l[l[B]-1]||null,z=t;t&&t.hint==v||(z={hint:v,b:[]},l[u](z));z.b[u](m)}var A=l[B];if(1<A){var F=c.callback;F&&(c.callback=function(){0==--A&&F()})}for(;d=l[n]();)wa(d.b,c,d.hint)}else wa(d||[],c,e)},wa=function(a,b,c){a=ea(a)||[];var d=b.callback,e=b.config,h=b.timeout,l=b.ontimeout,m=null,v=!1;if(h&&!l||!h&&l)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var t=G(L(c),"r",[]).sort(),z=G(L(c),"L",[]).sort(),A=[].concat(t),F=function(a,b){if(v)return 0;D.clearTimeout(m);z[u].apply(z,r);var d=((I||{}).config||{}).update;d?d(e):e&&G(J,"cu",[])[u](e);if(b){Q("me0",a,A);try{va(b,c)}finally{Q("me1",a,A)}}return 1};0<h&&(m=D.setTimeout(function(){v=!0;l()},h));var r=Y(a,z);if(r[B]){var r=Y(a,t),w=G(J,"CP",[]),x=w[B];w[x]=function(a){if(!a)return 0;Q("ml1",r,A);var b=function(b){w[x]=null;F(r,a)&&fa(function(){d&&d();b()})},c=function(){var a=w[x+1];a&&a()};0<x&&w[x-1]?w[x]=function(){b(c)}:b(c)};if(r[B]){var R="loaded_"+J.I++;I[R]=function(a){w[x](a);I[R]=null};a=oa(c,r,"gapi."+R,t);t[u].apply(t,r);Q("ml0",r,A);b.sync||D.___gapisync?sa(a):Z(a)}else w[x](ba)}else F(r)&&d&&d()};var ua=function(a){if(J.hee&&0<J.hel)try{return a()}catch(b){J.hel--,xa("debug_error",function(){try{g.___jsl.hefn(b)}catch(a){throw b;}})}else return a()};I.load=function(a,b){return ua(function(){return xa(a,b)})};N.bs0=g.gapi._bs||(new Date).getTime();O("bs0");N.bs1=(new Date).getTime();O("bs1");delete g.gapi._bs;})();gapi.load("client",{callback:window["handleClientLoad"],_c:{"jsl":{"ci":{"llang":"vi","client":{"headers":{"response":["Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","ETag","Expires","Last-Modified","Location","Pragma","Range","Server","Transfer-Encoding","WWW-Authenticate","Vary","X-Goog-Safety-Content-Type","X-Goog-Safety-Encoding","X-Goog-Upload-Chunk-Granularity","X-Goog-Upload-Control-URL","X-Goog-Upload-Size-Received","X-Goog-Upload-Status","X-Goog-Upload-URL","X-Goog-Diff-Download-Range","X-Goog-Hash","X-Goog-Updated-Authorization","X-Server-Object-Version","X-Guploader-Customer","X-Guploader-Upload-Result","X-Guploader-Uploadid"],"request":["Accept","Accept-Language","Authorization","Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","GData-Version","Host","If-Match","If-Modified-Since","If-None-Match","If-Unmodified-Since","Origin","OriginToken","Pragma","Range","Slug","Transfer-Encoding","X-ClientDetails","X-GData-Client","X-GData-Key","X-Goog-AuthUser","X-Goog-PageId","X-Goog-Encode-Response-If-Executable","X-Goog-Correlation-Id","X-Goog-Request-Info","X-Goog-Experiments","x-goog-iam-role","x-goog-iam-authorization-token","X-Goog-Spatula","X-Goog-Upload-Command","X-Goog-Upload-Content-Disposition","X-Goog-Upload-Content-Length","X-Goog-Upload-Content-Type","X-Goog-Upload-File-Name","X-Goog-Upload-Offset","X-Goog-Upload-Protocol","X-Goog-Visitor-Id","X-HTTP-Method-Override","X-JavaScript-User-Agent","X-Pan-Versionid","X-Origin","X-Referer","X-Upload-Content-Length","X-Upload-Content-Type","X-Use-HTTP-Status-Code-Override","X-YouTube-VVT","X-YouTube-Page-CL","X-YouTube-Page-Timestamp"]},"rms":"migrated","cors":false},"plus_layer":{"isEnabled":false},"enableMultilogin":true,"drive_share":{"useStandaloneSharingService":true},"disableRealtimeCallback":false,"isLoggedIn":true,"iframes":{"additnow":{"methods":["launchurl"],"url":"https://apis.google.com/additnow/additnow.html?usegapi\u003d1"},"person":{"url":":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"},"visibility":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"},"photocomments":{"url":":socialhost:/:session_prefix:_/widget/render/photocomments?usegapi\u003d1"},"plus_followers":{"params":{"url":""},"url":":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"},"playreview":{"url":"https://play.google.com/store/ereview?usegapi\u003d1"},"signin":{"methods":["onauth"],"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1"},"share":{"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"},"commentcount":{"url":":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"},"page":{"url":":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"},"hangout":{"url":"https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"},"plus_circle":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"},"youtube":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1"},"zoomableimage":{"url":"https://ssl.gstatic.com/microscope/embed/"},"card":{"url":":socialhost:/:session_prefix:_/hovercard/card"},"evwidget":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"},"reportabuse":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi\u003d1"},"follow":{"url":":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"},"shortlists":{"url":""},"plus":{"url":":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"},"configurator":{"url":":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"},":socialhost:":"https://apis.google.com","post":{"params":{"url":""},"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"},"community":{"url":":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"},":gplus_url:":"https://plus.google.com","rbr_s":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"},"autocomplete":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/autocomplete"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"},":source:":"3p","blogger":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1"},"savetowallet":{"url":"https://clients5.google.com/s2w/o/savetowallet"},"rbr_i":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"},"appcirclepicker":{"url":":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},"udc_webconsentflow":{"params":{"url":""},"url":"https://www.google.com/settings/webconsent?usegapi\u003d1"},"savetodrive":{"methods":["save"],"url":"https://drive.google.com/savetodrivebutton?usegapi\u003d1"},":im_socialhost:":"https://plus.googleapis.com","ytshare":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"},":signuphost:":"https://plus.google.com","plusone":{"params":{"count":"","size":"","url":""},"url":":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"},"comments":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1"},"ytsubscribe":{"url":"https://www.youtube.com/subscribe_embed?usegapi\u003d1"}},"isPlusUser":true,"debug":{"host":"https://apis.google.com","forceIm":false,"reportExceptionRate":0.05,"rethrowException":false},"deviceType":"desktop","inline":{"css":1},"lexps":[99,97,79,109,45,17,117,115,81,127,123,122,61,30],"include_granted_scopes":true,"oauth-flow":{"usegapi":false,"disableOpt":true,"authUrl":"https://accounts.google.com/o/oauth2/auth","proxyUrl":"https://accounts.google.com/o/oauth2/postmessageRelay","idpIframeUrl":"https://accounts.google.com/o/oauth2/iframe"},"report":{"apiRate":{"gapi\\.signin\\..*":0.05},"host":"https://apis.google.com","rate":0.001,"apis":["iframes\\..*","gadgets\\..*","gapi\\.appcirclepicker\\..*","gapi\\.auth\\..*","gapi\\.client\\..*"]},"csi":{"rate":0.01},"googleapis.config":{"auth":{"useFirstPartyAuthV2":true}}},"h":"m;/_/scs/apps-static/_/js/k\u003doz.gapi.vi.xOu1rTaJ5ww.O/m\u003d__features__/am\u003dIQ/rt\u003dj/d\u003d1/t\u003dzcms/rs\u003dAGLTcCMfcCwdK8B7APyOCCyNML4-_x4JdQ","u":"https://apis.google.com/js/client.js?onload\u003dhandleClientLoad","hee":true,"fp":"3b56cb80132f18d02435de4a3a2291627f86122a","dpo":false},"fp":"3b56cb80132f18d02435de4a3a2291627f86122a","annotation":["interactivepost","recobar","autocomplete","profile","signin2"],"bimodal":["signin","share"]}});

angular.module('MainApp.controllers.sync', [])

.controller('SyncController', function($scope, $rootScope, $document, eUser, eFacebook, eSync, eToast, $ionicPopup/*, facebookConnectPlugin*/) {
	
	$scope.logIN = -1;
	$scope.email = '';
	
	$scope.handleClientLoad = function () {
	
		if ($scope.logIN == -1) {
			window.setTimeout($scope.checkAuth, 1);
			//this.checkAuth();
		}

		return $scope.logIN;
	};
	
	$scope.checkAuth = function () {
	
		gapi.auth.authorize({
			client_id: eSync.clientId,
			scope: eSync.scopes,
			immediate: true,
		
		}, $scope.handleAuthResult);
	};
	
	$scope.handleAuthResult = function (authResult) {
			
		if (authResult && !authResult.error) {
			$scope.logIN = 1;
	
			//result= authResult.access_token;
			var temp;

			gapi.client.load('calendar', 'v3', function () {
				var request = gapi.client.calendar.events.list({
					'calendarId': 'primary',
					"singleEvents": "true",
					'maxResults': 1, 
					"orderBy": "startTime",
				});
				request.execute(function(resp) {
					$scope.email = resp.summary;
				});
			});
			
		} else {
			$scope.logIN = 0;
		}
	};
	
	$scope.handleAuthClick = function (event) {
		gapi.auth.authorize({
			client_id: eSync.clientId,
			scope: 	eSync.scopes,
			approval_prompt: 'force',
			include_granted_scopes: false,
			immediate: false,
			cookie_policy: 'single_host_origin'
		}, $scope.handleResult);
	};
	
	$scope.handleResult = function (authResult) {
	
		if (authResult && !authResult.error) {
			 $scope.logIN = 1;

			//result= authResult.access_token;

			// Load calendar:
			$scope.makeApiCallNoBound();
		}
	};
	
	$scope.makeApiCallNoBound = function () {
			
		// default max result = 250
		// default farthest day is one year ago

		var toDay = new Date();
		var dd = toDay.getDate();
		var mm = toDay.getMonth() + 1; //January is 0!
		var yyyy = toDay.getFullYear();

		if (dd < 10) {
			dd = '0' + dd;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}

		toDay = mm + '/' + dd + '/' + yyyy;

		// form of timeMax: "yyyy-mm-dd T hh:mm:ss - offset

		var oneYearAgo = (yyyy - 1) + '-' + mm + '-' + dd + 'T' + '00:00:00-00:00';

		// Load calendar from one year ago:

		gapi.client.load('calendar', 'v3', function () {
			var request = gapi.client.calendar.events.list({
				'calendarId': 'primary',
				"singleEvents": "true",
				'maxResults': 1000,
				"orderBy": "startTime",

				'timeMin': oneYearAgo
			});
			request.execute(function(resp) {
				
				//console.log(resp);
				eUser.uGmailCalendar = resp.items;

				eSync.convertMe();
				
				eToast.toastSuccessOne('Update successfully', 2000);
				
				//console.log(eUser.uGmailCalendar);
			});
		});
	};
	
	$scope.logMeOut = function () {
		$scope.logIN = 0;
		$scope.email = '';
		eToast.toastSuccessOne('Log out successfully', 2000);
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
	};
		
	// Using eSync, eUser, eFacebook service
	//$scope.eSync = eSync;
	$scope.eUser = eUser;
	$scope.eSync = eSync;

	//Array of all social nextworks and calendar applications
	$scope.allApps = [
		{ title: 'social', array: [ {name: 'facebook', options: [ { name: 'Log out', id: 'logout'}, {name: 'Update events', id: 'events'}]} ]},
		{ title: 'calendar', array: [ {name: 'local', options: [ {name: 'Update events', id: 'events'} ]},
									  {name: 'google', options: [ { name: 'Log out', id: 'logout'}, {name: 'Update events', id: 'events'}]}
		]},
	];

	/** Convert to arrays in eUser service
	  * eUser.uFaceCalendar
	*/
	$scope.convertMe = function (name){
		if(name == 'facebook'){
			if($scope.fbEvents.length == 0) return;

			eUser.uFacebook = [];

			/* Update events to eUser.uFaceCalendar */
			for(var i = 0; i < $scope.fbEvents.length; i++){
				/** All property of an event obj
				  * start: time to start event
				  * end: time to end event
				  * timezone: 
				  * summary: name of event
				  * location: where to organize event
				  * position: position of event in parent array of eUser.uFaceCalendar
				  * colorID: color of events, default is 0
				  * id: default is 'facebook'
				  * status: default is true
				  */

				if($scope.fbEvents[i].end_time != undefined){
					var start = new Date($scope.fbEvents[i].start_time);
					var end_time = new Date($scope.fbEvents[i].end_time);
					var duration = end_time.getDate() - start.getDate();
				}
				else { duration = 0; }

				for(var j=0; j <= duration; j++){
					end = (end_time >  new Date(start.getFullYear(),start.getMonth(),start.getDate()+1,0,0,0,0)) ? new Date(start.getFullYear(),start.getMonth(),start.getDate()+1,0,0,0,0) : end_time;

					var obj = { start: null, end: null, summary: null, location: null, id: null, position: null, colorID: 0, src: 'facebook', status: true };
					
					obj.start = angular.copy(start);
					obj.end = angular.copy(end);

					obj.summary = $scope.fbEvents[i].name;
					obj.location = $scope.fbEvents[i].place;
					obj.id = $scope.fbEvents[i].id;
					obj.position = angular.copy(obj.start);
					obj.position = new Date(obj.position.setHours(0,0,0,0));
						//Create new array if this uFaceCalendar have not has any event obj
					if(eUser.uFacebook[obj.position] == undefined || eUser.uFacebook[obj.position] == null) {
						eUser.uFacebook[obj.position] = [];
					};

					//Update a new event obj
					eUser.uFacebook[obj.position].push(obj);

					start = angular.copy(end);
				}
			}
		}
	};

	/* Update events
	 * name = facebook: from facebook
	 * name = local: from local calendar
	 * name = google: from google calendar
	 */
	//array of all user's events on facebook
	$scope.fbEvents = [];

	$scope.updateEvents = function (name){
		if(name == 'facebook'){
			//execute secondly
			facebookConnectPlugin.api("me/events", ['user_events'], 
				function (events) {
					$scope.fbEvents = angular.copy(events.data);
					$scope.convertMe('facebook');
					eToast.toastSuccessOne('Update successfully', 2000);
				},
				function (error) {
					eToast.toastError('Failed to update', 2000);
				}
			);
		}

		if(name == 'google'){
			$scope.makeApiCallNoBound();
		}

		if(name == 'local'){
			eToast.toastInfo('Coming soon...', 2000);
		}
	};

	/* Check login status
	 */
	$scope.checkLoginStatus = function (name){
		if(name == 'facebook'){
			return eFacebook.fbSetLoginStatus();
		}
		
		if(name == 'google'){
			return $scope.handleClientLoad();
		}
	}

	/* Log in
	 * name = facebook: from facebook
	 * name = google: from google calendar
	 */
	$scope.login = function(name){
		if(name == 'facebook'){
			eFacebook.fbLogin();
		}

		if(name == 'google'){
			$scope.handleAuthClick(null);
		}
	};

	/* Log out
	 * name = facebook: from facebook
	 * name = google: from google calendar
	 */

	$scope.logout = function(name){
		if(name == 'facebook'){
			eFacebook.fbLogout();
			$scope.isShowDes = {};
			setTimeOut = 0;
		}

		if(name == 'google'){
			$scope.logMeOut();
			$scope.isShowDes = {};
		}
	};

	//Handle and call correspond function
	$scope.handleOptions = function(app, option){
		if(option == 'logout'){
			if(app == 'facebook') { $scope.logout('facebook'); }
			else if(app == 'google') { $scope.logout('google'); }
		}

		else if(option == 'events'){
			if(app == 'facebook') { $scope.updateEvents('facebook'); }
			else if(app == 'local') { $scope.updateEvents('local'); }
			else if(app == 'google') { $scope.updateEvents('google'); }
		}
	}


	/* Show & Hide slide toggle
	Based on login status
	*/

	$scope.isShowDes = {};

	$scope.isShow = function (name) {
		if ($scope.isShowDes[name] == true) {
			return true;
		} else {
			return false;
		}
	};

	var activeShow = function (name) {
		$scope.isShowDes = {};
		$scope.isShowDes[name] = true;
	};

	var deactiveShow = function () {
		$scope.isShowDes = {};
	};

	var clickShow = function (name) {
		if ($scope.isShow(name) == true) {
			deactiveShow();
		} else {
			activeShow(name);
		}
	};

	var setTimeOut = 0;
	$scope.toggleFunc = function (name) {
		if(name == 'facebook'){
			facebookConnectPlugin.getLoginStatus(
				function (success){
					var loginFB = angular.copy(success.status);

					if(loginFB != 'connected'){
						var confirmPopup = $ionicPopup.confirm({
							title: 'You need to login first'
						});

						confirmPopup.then(function(res) {
							if(res) {
								$scope.login('facebook');
							}
						});
					}

					else if (loginFB == 'connected') {
						while(setTimeOut < 1) {
							eToast.toastSuccessOne('Connected', 200);
							setTimeOut = 1;
						}

						clickShow(name);
					}
				},
				function (error){
					eToast.toastError('Failed to get login status', 2000);
				}
			);
		}
		
		if(name == 'google'){
			var loginGC = $scope.checkLoginStatus('google');

			if(loginGC != 1) { 
				var confirmPopup = $ionicPopup.confirm({
					title: 'You need to login first'
				});

				confirmPopup.then(function(res) {
					if(res) {
						$scope.login('google');
					}
				});
			}

			else if (loginGC == 1){ clickShow(name); }
		}

		if(name == 'local') {
			clickShow(name);
		}
	};
});