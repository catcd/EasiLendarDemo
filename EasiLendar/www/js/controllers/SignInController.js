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
			$scope.mesId = "*This field can't be empty.";
			return false;
		} else if (!checkChar(id)) {
			$scope.mesId = "You can only use letters, numbers and underline "
					+ "'_' character (4 to 15 characters)";
			return false;
		} else if (!checkAvailability()) {
			$scope.mesId = "*This ID has been used.";
			return false;
		}
		return true;
	}

	/*check Name
	 * Can not be empty
	 */
	var checkName = function(name) {
		if (name == "") {
			$scope.mesName = "*This field can't be empty.";
			return false;
		}
		return true;
	}

	/*check Email
	 */
	var checkEmail = function(email) {
		if (email == "") {
			$scope.mesEmail = "*This field can't be empty.";
			return false;
		} else if (-1 == email.search("@")) {
			$scope.mesEmail = "*Unvalid Email.";
			return false;
		}
		return true;
	}

	/*check Password
	 * Can not be empty*/
	var checkPass = function(pass) {
		if (pass == "") {
			$scope.mesPass = "*This field can't be empty.";
			return false;
		}
		return true;
	}

	/* check confirm password
	 * Can not be empty
	 * Must match with password
	 */
	var checkCPass = function(cPass, pass) {
		if (cPass != pass) {
			$scope.mesCPass = "*Confirm password did not match.";
			return false;
		}
		return true;
	}

	/* check the valid informations to register */
	$scope.check = function() {
		$scope.mesId = "";
		$scope.mesName = "";
		$scope.mesEmail = "";
		$scope.mesPass = "";
		$scope.mesCPass = "";
		if (checkID($scope.user.id) && checkName($scope.user.name)
				&& checkEmail($scope.user.email)
				&& checkPass($scope.user.password)
				&& checkCPass($scope.user.re_password, $scope.user.password))
			return true;
		return false;
	}

	/* register function */
	$scope.register = function() {
		if ($scope.check()) {
			/*Something*/
			$state.go('form');
		} else {

		}
	}
});
