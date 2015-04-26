/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 04/04/2015
 * type: paticular controller
 */

var profile = angular.module('MainApp.controllers.profile', [])

profile.controller("ProfileController", function($scope, $ionicPopup, $rootScope,eFriend,eEasiLendar,eCheckFriend,eDatabase,eToast) {


	$scope.eEasiLendar=eEasiLendar;
	$scope.eFriend=eFriend;
	$scope.eCheckFriend=eCheckFriend;
	$scope.eDatabase=eDatabase;
	$scope.eToast = eToast;
	this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
	$scope.weekCalendar = eEasiLendar.newWeekCalendar();
	//$scope.weekCalendar.setNavDays();
	$scope.$watch('eFriend.fMultiCal', function() {
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
	});
	$scope.friends=[
	{image: 1, name:'Ngo Duc Dung', status: 1, vip: 0},
	{image: 8, name:'Nguyen Thi Luong', status: 0, vip: 0},
    {image: 1, name:'Can Duy Cat', status: 1, vip: 1},
    {image: 1, name:'Nguyen Manh Duy', status: 0, vip: 0}
	];
	$scope.notCalendar='This calendar is private. Please, add friend to view.';
	$scope.calendarOfFriend = function(){
		if(eFriend.fMultiCal==null)
			return true;
		else return false;
		};
	$scope.notFriend = function(id){
	if(eCheckFriend.isFriend(id)==false){return true;}
	}
	$scope.deleteFriend = function(id) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				eDatabase.deleteF(id);
				eToast.toastSuccess(' Deleting.', 2000);
			}
		});
	}
	$scope.addNewFriend = function(id){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Add friend!'
		});
		confirmPopup.then(function(res) {
			if(res) {
				eDatabase.request(id);
				eToast.toastSuccess('Sending request.', 2000);
			}
		});
	}
})
