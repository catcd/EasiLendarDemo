/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 15/07/2015
 * type: friend panel controller
 */

angular.module('MainApp.controllers.sideMenu.friendPanel', [])

.controller('friendPanelController',
	function($scope, $rootScope, $location, $ionicScrollDelegate,
	$ionicPopup, eUser, eFriend, eDatabase, $ionicPopover) {
	//Using eUser, eFriend, eDatebase factory
	$scope.eUser = eUser;
	$scope.eFriend = eFriend;
	$scope.eDatabase = eDatabase;

	$scope.searchFriend = '';
	$scope.mShow = true;

	/** FRIEND POPOVER **/
	/**
	 * popover variable
	 */
	// class
	$scope.mFPopoverStatus = {};
	$scope.mFPopoverStatus[true] = 'active';
	$scope.mFPopoverStatus[false] = '';

	$scope.mFPopoverActive = '';

	/**
	 * popover function
	 */
	$scope.tabFActive = function(tabName) {
		if (tabName == 'request' ||
			tabName == 'accepted') {
			$scope.mFPopoverActive = tabName;
		}
	};

	var template = '';

	$scope.fbPopover = $ionicPopover.fromTemplate(template, {
		scope: $scope,
	});

	$ionicPopover.fromTemplateUrl('templates/noti-friend-panel-popover.html', {
		scope: $scope
	}).then(function(popover) {
		$scope.fbPopover = popover;
	});

	$scope.openFPopover = function($event) {
		$scope.fbPopover.show($event);
	}

	$scope.closeFPopover = function() {
		$scope.fbPopover.hide();
	}

	//Cleanup the popover when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.fbPopover.remove();
	});

	/**
	 * action sheet
	 */
	// friend action sheet
	$scope.friendAction = function(friend) {
		// Show the action sheet
		$ionicActionSheet.show({
			buttons: [{
				text: 'View'
			}, {
				text: 'Comfirm request'
			}],
			destructiveText: 'Delete request',
			titleText: friend.name + ' request',
			cancelText: 'Cancel',
			cancel: function() {
				// TODO cancel code here
			},
			destructiveButtonClicked: function() {
				eDatabase.rejectFriend(friend.id);

				return true;
			},
			buttonClicked: function(index) {
				if (index === 0) {
					// TODO view code here
					eDatabase.viewProfile(friend.id);

					$scope.closePopover();
				} else {
					// TODO confirm code here
					eDatabase.acceptFriend(friend.id);
				}

				return true;
			}
		});
	};

	/**
	 * class variable
	 */
	// style for friend tab
	$scope.friendTabClass = {};
	$scope.friendTabClass[true] = 'noti-margin-down';
	$scope.friendTabClass[false] = 'noti-margin-top';


	/** FRIEND LÍT **/
	$scope.deleteFriend = function(friend) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure ?'
		});

		confirmPopup.then(function(res) {
			if(res) {
				eDatabase.deleteFriend(friend.id);
			}
		});
	};

	$scope.appointMeeting = function(friend) {
		eFriend.fName = friend.name;
		eDatabase.getCalendar(friend.id);
		$rootScope.goToState('searchFilter');
	};

	$scope.viewProfile = function(friend) {
		eDatabase.viewProfile(friend.id);
	};

	//auto scroll to top of panel
	$rootScope.gotoTop = function() {
		// set the location.hash to the id of
		// the element you wish to scroll to.
		$location.hash('friend-top');
		$ionicScrollDelegate.anchorScroll(true);
	};
})

.directive('slideToggleFunc', function($document) {
	return {
		restrict: 'E',
		link: function(scope) {
			scope.visible = { index: false, value: false};
			scope.toggleFunc = function() {
				scope.visible.value = !scope.visible.value;
			};
			$document.bind('click', function() {
				if(scope.visible.index === true){
					scope.visible.index = false;
					scope.visible.value = false;
				}

				if(scope.visible.value === true){
					scope.visible.index = true;
				}

				scope.$apply();
			});
		}
	};
})

.directive('opacitySearchInput', function() {
	return {
		restrict: 'A',
		link: function(scope, element) {
			var parent = element.parent().parent();
			parent.addClass('friend-search-input-blur');
			element.bind('focus', function() {
				parent.removeClass('friend-search-input-blur');
				parent.addClass('friend-search-input-focus');
			});
			element.bind('blur', function() {
				parent.addClass('friend-search-input-blur');
			});
		}
	};
})

//filter friends list
.filter('findingFriend',function(){
	//items = friends array
	return function(items, searchFriend){
		if(!searchFriend){
			return items;
		}
		var results = [];
		searchFriend = searchFriend.toLowerCase();
		angular.forEach(items, function(item){
			if (item.name.toLowerCase().indexOf(searchFriend) > -1){
				results.push(item);
			}
		});

		return results;
	};
})

.directive('notiFriendContent', function() {
	return {
		restrict: 'E',
		templateUrl: function(elem, attr) {
			return 'templates/noti-friend-' + attr.type + '.html';
		}
	};
});