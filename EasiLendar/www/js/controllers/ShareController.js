/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 12/05/2015
 * type: Share state controller
 */

angular.module('MainApp.controllers.share', [])

.controller('ShareController',
	function($scope, $rootScope, eUser,
	eFacebook, eToast, $ionicPopup) {
	$scope.eUser = eUser;

	$scope.allSites = [
		{name: 'facebook',options: [{id: 'share', name: 'Share'},
									{id: 'send', name: 'Send message'},
									{id: 'logout', name: 'Logout'}]},
		{name: 'twitter', options: [{id: 'share', name: 'Share'},
									{id: 'send', name: 'Send message'},
									{id: 'logout', name: 'Logout'}]},
		{name: 'gmail', options: [{id: 'send', name: 'Send mail'},
								  {id: 'logout', name: 'Logout'}]},
		{name: 'sms', options: [{id: 'send', name: 'Send sms'}]}
	];

	$scope.isShowDes = {};

	$scope.isShow = function (name) {
		if($scope.isShowDes[name] === true) {
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

	$scope.showOptions = function (name) {
		if($scope.isShow(name) === true) {
			deactiveShow();
		} else {
			activeShow(name);
		}
	};

	/* Check login status
	 */
	$scope.checkLoginStatus = function (name){
		if(name == 'facebook') {
			return eFacebook.fbSetLoginStatus();
		}
	};

	$scope.handleOptions = function (site, option){
		if(site == 'facebook') {
			//check login status
			facebookConnectPlugin.getLoginStatus(
				function (success) {
					var loginFB = angular.copy(success.status);

					if(loginFB != 'connected') {
						var confirmPopup = $ionicPopup.confirm({
							title: 'You need to login first'
						});

						confirmPopup.then(function(res) {
							if(res) {
								//Log in
								eFacebook.fbLogin();

								if(option != 'like'  && option != 'logout') {
									var continueOption = $ionicPopup.confirm({
										title: 'Do you want to continue ?'
									});

									continueOption.then( function(res) {
										if(res) {
											//Share
											if(option == 'share') {
												eFacebook.fbFeed();
											}
											//Send message
											if(option == 'send') {
												eFacebook.fbSend();
											}
										}
									});
								}
							}
						});
					}

					else{
						//Share to facebook
						if(option == 'share') {
							eFacebook.fbFeed();
						}

						//Send message to your friends on facebook
						if(option == 'send') {
							eFacebook.fbSend();
						}

						//Logout
						if (option == 'logout') {
							eFacebook.fbLogout();
							$scope.checkLoginStatus('facebook');
						}
					}
				},
				function (error) {
					eToast.toastSuccessOne('Failed to get login status', 2000);
				}
			);
		}

		if(site != 'facebook'){
			eToast.toastInfoOne('Comming soon', 1000);
		}
	};
});