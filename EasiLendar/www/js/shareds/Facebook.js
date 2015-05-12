/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 08/05/2015
 * type: facebook service
 */

angular.module('MainApp.shareds.facebook', [])

.factory('eFacebook', function(eToast){
	return {
		/** Login Facebook
		  * Publick profile
		  * User events
		  * User friends: list of friends that also use this app
		  * Rsvp_event: provides the ability to set a person's attendee status on Facebook Events
		  */
		loginStatus: null,

		fbLogin : function(){
			facebookConnectPlugin.login(
				["public_profile"],
				function (success){
					loginStatus = angular.copy(success.status);
					eToast.toastSuccessOne('Login successfully', 2000);
				}, function (error) {
					eToast.toastError('Failed to log in', 2000);
				}
			);
		},

		/** Get login status
		  * if log in successfully, login.status = 'connected'
		  */

		fbSetLoginStatus: function(){
			facebookConnectPlugin.getLoginStatus(
				function (success){
					loginStatus = angular.copy(success.status);
				},
				function (error){
					eToast.toastError('Failed to get login status', 2000);
				}
			);

			return loginStatus;
		},

		/** Logout Facebook */
		fbLogout : function(){
			facebookConnectPlugin.logout(
				function (success) {
					eToast.toastSuccessOne('Log out successfully', 2000);
				}, function (error) {
					eToast.toastError('Failed to log out', 2000);
				}
			);
		},

		/** Facebook get list of events
		  * You hosted
		  * You joined
		  */
		/** An event include
		  * start_time & end_time
		  * location
		  * rsvp_status: status of the user's reply to the event inivitation
		  * name: name of event
		  */
		fbApiEvent : function(){
			facebookConnectPlugin.api("me/events", ['user_events'],
				function (events) {},
				function (error) {
					eToast.toastError('Failed to update', 2000);
				});
		},

		/** Facebook feed dialog
		  * This includes captions that your app manages 
		    and a personal comment from the person sharing the content
		  */
		fbFeed : function(){
			/** Options
			  * method: feed or share
			  * app_id: of app
			  * display: page or popup
			  * link: the link attached to this post
			  * picture: the URL of a picture attached to this post
			  * caption: the caption of the link. If not specifed, this field
			  			 is automatically populated with the URL of the link
			  */
			var options = {
					method: "feed",
					display:"popup",
					link: "https://www.youtube.com/channel/UC3tYd_GAkPAAp_QXKOTdsxw",
					caption: "From EasiLendar"
				};

			facebookConnectPlugin.showDialog(options,
				function (success) {
					eToast.toastSuccessOne('Share successfully', 2000);
				},
				function (error) {
					eToast.toastError('Failed to share', 2000);
				}
			);
		},

		/** Facebook share
		  * does not require Facebook Login or any extended permissions
		  */
		fbShare : function(){
			/** Options
			  * method: feed or share
			  * app_id: of app
			  * display: page or popup
			  (use for share)
			  * href: the link attached to this post.
			  		  Include open graph meta tags in the page at this URL to customize the story that is shared
			  (use for share_open_graph)
			  * action_type: a string specifying which Open Graph action type to publish
			  				 e.g., og.likes for built in like type
			  */

			var options = {
				method: "share",
				display: "popup",
				href: "https://www.youtube.com/channel/UC3tYd_GAkPAAp_QXKOTdsxw"
			};

			facebookConnectPlugin.showDialog(options,
				function (success) {
					eToast.toastSuccessOne('Share successfully', 2000);
				},
				function (error) {
					eToast.toastError('Failed to share', 2000);
				}
			);
		},

		fbSend : function(){
			/** Options
			  * method: feed or share
			  * app_id: of app
			  * display: page or popup
			  */
			var options = {
				method: "send",
				link: "https://www.youtube.com/channel/UC3tYd_GAkPAAp_QXKOTdsxw"
			};

			facebookConnectPlugin.showDialog(options, 
				function (success) {
					eToast.toastSuccessOne('Send message successfully', 2000);
				},
				function (error) {
					eToast.toastError('Failed to send', 2000);
				}
			);
		}

		/*fbLikeEasiLendar : function(access_token){
			var fanpage = 'https://www.facebook.com/EasiLendar';
			var url = '/me/og.likes?access_token=' + access_token + '&method=POST' + '&object=' + fanpage;
			 
			facebookConnectPlugin.api(
				url, ['publish_actions'],
				function (success){
					eToast.toastSuccessOne('Thanks for supporting us', 2000);
				},
				function (error){
					eToast.toastSuccessOne('Oops, please try again', 2000);
				}
			);
		}*/
	};
});
