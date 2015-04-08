/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 04/04/2015
 * type: paticular controller
 */

var profile = angular.module('MainApp.controllers.profile', [])

profile.controller("ProfileController", function($scope, $ionicPopup, $rootScope) {
	
	this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
	$scope.weekCalendar = $rootScope.newWeekCalendar();
	$scope.weekCalendar.setNavDays();
	$scope.$watch('eFriend.fMultiCal', function() {
		$scope.weekCalendar = $rootScope.newWeekCalendar();
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
		if($rootScope.eFriend.fMultiCal==null)
			return true;
		};
	$scope.notFriend = function(id){
	if($rootScope.isFriend(id)==false){return true;}}
	 $scope.y =false;
	//if(x ==  false){$scope.y = true;}
	
	$scope.deleteFriend = function(id) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$rootScope.deleteF(id);
				$rootScope.toastSuccess(' Deleting.', 2000);
			}
		});
	}
	$scope.addNewFriend = function(id){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Add friend!'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$rootScope.request(id);
				$rootScope.toastSuccess('Sending request.', 2000);
			}
		});
	}
	// add person call
	$scope.addPerson = function(ID) {
		$rootScope.request(ID);

		// toast
		$rootScope.toastSuccess('Sending request.', 2000);
	}
})
