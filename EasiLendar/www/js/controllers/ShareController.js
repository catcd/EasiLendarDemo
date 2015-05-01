/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 01/05/2015
 * type: Share state controller
 */

angular.module('MainApp.controllers.share', [])

.controller('ShareController', function($scope, $rootScope, eUser, eFacebook, $ionicPopup) {
	$scope.eUser = eUser;

	$scope.allSites = [
		{ name: 'facebook' , options: [{id: 'share', name: 'Share'}, {id: 'send', name: 'Send message'},
									   {id: 'like', name: 'Like our fanpage'}, {id: 'logout', name: 'Logout'}] }
	];

	/* Check login status
	 */
	$scope.checkLoginStatus = function(name){
		if(name == 'facebook'){
			return eFacebook.fbSetLoginStatus();
		}
	}

	$scope.handleOptions = function(site, option){
		if(site == 'facebook'){
			//check login status
			facebookConnectPlugin.getLoginStatus(
				function (success){
					var loginFB = angular.copy(success.status);

					if(loginFB != 'connected'){
						var confirmPopup = $ionicPopup.confirm({
							title: 'You need to login first'
						});

						confirmPopup.then(function(res) {
							if(res) {
								//Log in
								eFacebook.fbLogin();

								var continueOption = $ionicPopup.confirm({
									title: 'Do you want to continue ?'
								});

								continueOption.then(function(res) {
									if(res) {
										//Share
										if(option == 'share'){
											eFacebook.fbFeed();
										}
										//Send message to your friends on facebook
										if(option == 'send'){
											eFacebook.fbSend();
										}

										//Like EasiLendar fanpage
										if(option == 'like'){
											$rootScope.showAlert('Comming soon..');
										}
									}
								});
							}
						});
					}

					else{
						//Share to facebook
						if(option == 'share'){
							eFacebook.fbFeed();
						}

						//Send message to your friends on facebook
						if(option == 'send'){
							eFacebook.fbSend();
						}

						//Like EasiLendar fanpage
						if(option == 'like'){
							$rootScope.showAlert('Comming soon..');
						}

						//Logout
						if (option == 'logout'){
							eFacebook.fbLogout();
							$scope.checkLoginStatus('facebook');
						}
					}
				},
				function (error){
					$rootScope.showAlert('Failed: ' + JSON.stringify(error));
				}
			);
		}
	};
})

.directive('showHideOptions', function(){
	return {
		restrict: 'E',
		link: function(scope, element, attr){
			scope.show = false;
			scope.showHideOptions = function(){
				scope.show = !scope.show;
			};
		}
	};
})

.directive('animation', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attr){
			element.bind('click', function(){
				if(scope.show == true){
					element.find('img').addClass('share-img-clicked');
					element.next().addClass('share-options-show');
				}

				else{
					element.find('img').removeClass('share-img-clicked');
					element.next().removeClass('share-options-show');
				}
			});
		}
	};
})

