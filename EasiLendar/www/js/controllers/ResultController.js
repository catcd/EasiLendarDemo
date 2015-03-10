/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 10/03/2015
 * type: paticular controller
 */

var result = angular.module('MainApp.controllers.result', []);

result.controller("ResultController", function($scope, $ionicPopup) {
	/*Class option */
	function Option(score, date, from, to) {
		/* Convert functions */
		//Convert Date to dd/mm/yyyy format
		var convertDate = function (date) {
			
			return date;
		};
		//Convert time to hh:mm format
		var convertTime = function(time) {
			if (typeof(time) != "number" || time < 0 || time > 1440) return "00:00";
			var min = time%60;
			var hour = (time-min)/60;
			if (hour < 10) hour = "0"+hour;
			if (min < 10) min = "0"+min;
			return hour+":"+min;
		};
		
		/* initiate attributes */
		this.score = score;
		this.date = date;
		this.from = convertTime(from);
		this.to = convertTime(to);
		
		/* Display option */
		this.display = function() {
			return this.date + ": from " + this.from 
			+ " - to " + this.to;
		};
	};
	
	var op1 = new Option(1,"01/02/2015",150,300);
	var op2 = new Option(2,"02/02/2015",840,1410);
	var op3 = new Option(3,"06/02/2015",405,530);
	var op4 = new Option(4,"10/02/2015",510,1110);
	var op5 = new Option(5,"11/02/2015",900,1070);
	$scope.options = {
		list : [op1, op2, op3, op4, op5],
		add : function(option) {
			this.list.push(option);
		},
		selectOption : function(option) {
			$scope.showAlert("You selected option "+ option.score);
		},
		next : function() {
			$scope.showAlert("You click next");
		},
	};
});
