/**
 * 
 */
(function() {
	var app = angular.module('result', ['ionic'])
	.run(function($ionicPlatform) {
		  $ionicPlatform.ready(function() {
		    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		    // for form inputs)
		    if(window.cordova && window.cordova.plugins.Keyboard) {
		      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		    }
		    if(window.StatusBar) {
		      StatusBar.styleDefault();
		    }
		  }
		)}); 
	
	app.controller("BarController", function($scope) {
		$scope.back = function () {
			window.alert("You click back button");
		};
		$scope.done = function () {
			window.alert("You are done");
		}
		$scope.count = 1;
	});

	app.controller("ResultController", function($scope) {
		$scope.count = 0;
		$scope.options = [
		    {date:"01/02/2015", begin:"02:30", end:"05:00"},
		    {date:"02/02/2015", begin:"14:00", end:"23:30"},
		    {date:"06/02/2015", begin:"06:45", end:"08:50"},
		    {date:"10/02/2015", begin:"08:30", end:"18:30"},
		    {date:"11/02/2015", begin:"15:00", end:"17:50"}
		];
		
		$scope.addOption = function(option) {
			$scope.options.push(option);
			$scope.count++;
		};
		
		$scope.next = function() {
			window.alert("You click next");
		};
		
		$scope.selectOption = function(num) {
			window.alert("You select option "+(num+1));
		};
		
		$scope.display = function(num) {
			$scope.option = $scope.options[num].date+": From "+$scope.options[num].begin+" - To "+$scope.options[num].end;
			return $scope.option;
		}
	
	});
	
})();