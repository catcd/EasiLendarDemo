/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 24/04/2015
 * type: paticular controller
 */
/*test for:
 * calendarOfFriend function
 */

describe('Profile',function(){

	var $controller, $rootScope, $scope,$ionicPopup;
	var eFriend,eEasiLendar,eDatabase,eCheckFriend,eToast;
	
	beforeEach(module('MainApp.controllers.profile'));
	var eFriend = {
		fMultical: null, 
		};
	var eEasiLendar = {
		WeekCalendar: function(){
		 },
		newWeekCalendar: function(){
		//return new WeekCalendar();
		},
		};
	
	
	
	var eCheckFriend={
		isFriend:function(id){return false;},};
	var eDatabase={};
	var eToast = {};
	
	beforeEach(inject(function(_$controller_, _$rootScope_){
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();
		
		$controller('ProfileController', 
			{'$rootScope' : $rootScope,
			 '$scope': $scope, 
			 '$ionicPopup': $ionicPopup,
			 'eFriend': eFriend,
			 'eEasiLendar': eEasiLendar,
			 'eCheckFriend': eCheckFriend,
			 'eDatabase': eDatabase,
			 'eToast': eToast,
		});
	}));
	describe('See calendar', function(){
	
		it('Not see calendar', function(){
			expect($scope.calendarOfFriend()).toBe(true);
		});
		it('See calendar', function(){
			expect($scope.calendarOfFriend()).not.toBe(false);
		});
	});
	describe('Check not Friend', function(){
		it('Shoulld be not friend', function(){
			expect($scope.notFriend('11')).toBe(true);
			});
		
		});
	
});
