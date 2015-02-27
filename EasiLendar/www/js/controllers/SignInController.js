/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 27/02/2015
 * type: particular controller
 */

var signIn = angular.module('MainApp.controllers.signIn', []);

signIn.controller('SignInController', function($scope, $state) {
	$scope.isRemember = false;
	$scope.users = [ {
		id : "TEXAS",
		password : "easilendar"
	}, {
		id : "catcd",
		password : "easilendar"
	} ];
	$scope.user = {
		id : "",
		name : "",
		email : "",
		password : "",
		re_password : ""
	};

	/* validate user to sign in */
	$scope.validate = function() {
		if (!checkChar($scope.user.id))
			return false;
		for (var i = 0; i < $scope.users.length; i++) {
			if ($scope.user.id == $scope.users[i].id
					&& $scope.user.password == $scope.users[i].password) {
				return true;
			}
		}
		return false;
	};

	/* sign in function */
	$scope.signIn = function() {
		if ($scope.validate()) {

			/* Something here */

			$state.go('home');
		} else {
			$state.go('warning');
		}
	};

	/* confirm the warning */
	$scope.confirm = function() {
		$state.go('form');
	}

	/*check ID's availability
	 * return true if user can use that ID*/
	var checkAvailability = function() {
		return true;
	}

	/*check ID's characters
	 * 0..9 || a..z || A..Z || _ */
	var checkChar = function(str) {
		if (str.length > 15 || str.length < 4)
			return false;
		for (var i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) < 48)
				return false;
			else if (str.charCodeAt(i) > 57 && str.charCodeAt(i) < 65)
				return false;
			else if (str.charCodeAt(i) > 90 && str.charCodeAt(i) < 97
					&& str.charCodeAt(i) != 95)
				return false;
			else if (str.charCodeAt(i) > 122)
				return false;
		}
		return true;
	}

	/*check ID
	 * Can not be empty
	 * ID must be unique*/
	var checkID = function(id) {
		if (id == "") {
			$scope.mesId = "Required";
			return false;
		} else if (!checkChar(id)) {
			if (id.length < 4) {
				$scope.mesId = "ID is too short.";
			} else if (id.length > 15) {
				$scope.mesId = "ID is too long.";
			} else {
				$scope.mesId = "Unexpected";
			}
			return false;
		} else if (!checkAvailability()) {
			$scope.mesId = "Existed";
			return false;
		}
		return true;
	}

	/*check Name
	 * Can not be empty
	 */
	var checkName = function(name) {
		if (name == "") {
			$scope.mesName = "Required";
			return false;
		}
		return true;
	}

	/*check Email
	 */
	var checkEmail = function(email) {
		if (email == "") {
			$scope.mesEmail = "Required";
			return false;
		} else if (-1 == email.search("@")) {
			$scope.mesEmail = "Unvalid Email.";
			return false;
		}
		return true;
	}

	/*check Password
	 * Can not be empty*/
	var checkPass = function(pass) {
		if (pass == "") {
			$scope.mesPass = "Required";
			return false;
		}
		return true;
	}

	/* check confirm password
	 * Can not be empty
	 * Must match with password
	 */
	var checkCPass = function(cPass, pass) {
		if (cPass =="") {
			$scope.mesCPass="Required";
			return false;
		} else if (cPass != pass) {
			$scope.mesCPass = "Not match.";
			return false;
		}
		return true;
	}

	/* check the valid informations to register */
	$scope.check = function(num) {
		$scope.mesId = "";
		$scope.mesName = "";
		$scope.mesEmail = "";
		$scope.mesPass = "";
		$scope.mesCPass = "";
		var flag1 = checkID($scope.user.id);
		var flag2 = checkName($scope.user.name);
		var flag3 = checkEmail($scope.user.email);
		var flag4 = checkPass($scope.user.password);
		var flag5 = checkCPass($scope.user.re_password, $scope.user.password);
		if (num==1) return flag1; 
		if (num==2) return flag2;
		if (num==3) return flag3;
		if (num==4) return flag4;
		if (num==5) return flag5;
		if (num==0) return flag1 && flag2 && flag3 && flag4 && flag5;
	}

	/* register function */
	$scope.register = function() {
		if ($scope.check(0)) {
			/*Something*/
			$state.go('form');
		} else {

		}
	}
});
