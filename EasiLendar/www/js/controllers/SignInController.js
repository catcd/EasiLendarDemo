/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 09/03/2015
 * type: particular controller
 */

var signIn = angular.module('MainApp.controllers.signIn', []);

signIn.controller('SignInController',function($scope, $http, $state) {
	
	$scope.isRemember = false;
	
	/* warning object contains all warnings*/
	$scope.warnings = {
		mesId: "",
		mesName: "",
		mesEmail: "",
		mesPass: "",
		mesCPass: "",
			
		reset: function() {
			this.mesId = "";
			this.mesName = "";
			this.mesEmail = "";
			this.mesPass= "";
			this.mesCPass = "";
		}
	};
	
	/* class User */
	function User() {
		this.id ="";
		this.name="";
		this.email="";
		this.password="";
		this.re_password="";
		
		/* reset all data */
		this.reset = function() {
			this.id ="";
			this.name="";
			this.email="";
			this.password="";
			this.re_password="";
		};
		
		/*check ID's availability
		 * return true if user can use that ID*/
		var checkAvailability = function() {
			return true;
		};
		
		/*check ID's characters
		 * 0..9 || a..z || A..Z || _ */
		this.checkChar = function() {
			if (this.id.length > 15 || this.id.length < 4)
				return false;
			for (var i = 0; i < this.id.length; i++) {
				if (this.id.charCodeAt(i) < 48)
					return false;
				else if (this.id.charCodeAt(i) > 57 && this.id.charCodeAt(i) < 65)
					return false;
				else if (this.id.charCodeAt(i) > 90 && this.id.charCodeAt(i) < 97
						&& this.id.charCodeAt(i) != 95)
					return false;
				else if (this.id.charCodeAt(i) > 122)
					return false;
			}
			return true;
		};
		
		/*check ID
		 * Can not be empty
		 * ID must be unique*/
		this.checkID = function() {
			if (this.id == "") {
				return "Required";
			} else if (!this.checkChar()) {
				if (this.id.length < 4) {
					return "ID is too short";
				} else if (this.id.length > 15) {
					return "ID is too long";
				} else {
					return "Unexpected";
				}
			} else if (!checkAvailability()) {
				return "Existed";
			}
			return true;
		};
		
		/*check Name
		 * Can not be empty
		 */
		this.checkName = function() {
			if (this.name == "") {
				return "Required";
			}
			return true;
		};

		/*check Email
		 * can not be empty
		 */
		this.checkEmail = function() {
			if (this.email == "") {
				return "Required";
			} else if (-1 == this.email.search("@")) {
				return "Unvalid Email";
			}
			return true;
		};

		/*check Password
		 * Can not be empty*/
		this.checkPass = function() {
			if (this.password == "") {
				return "Required";
			}
			return true;
		};

		/* check confirm password
		 * Can not be empty
		 * Must match with password
		 */
		this.checkCPass = function() {
			if (this.re_password =="") {
				return "Required";
			} else if (this.re_password != this.password) {
				return "Not match";
			}
			return true;
		};
	}; // End of class User

	/* create new user */
	$scope.user = new User();
	
	/* sign in function */
	$scope.signIn = function() {
		if (!$scope.user.checkChar()) {
			$state.go('warning');
		} else {
			var id = $scope.user.id;
			var pass = $scope.user.password;
			$http.post("php/signIn.php", {"ID": id, "pass": pass})
			.success(function(data,status,headers,config) {
				if (data == "YES") {
					$state.go('home');
				} else {
					$state.go('home');	// should be warning
				}
			})
			.error(function(data,status) {
				$state.go('home');	// should be warning
			});
		}
	};
	
	/* confirm the warning when sign in */
	$scope.confirm = function() {
		$state.go('form');
	};

	/* check the valid informations to register */
	$scope.check = function(num) {
		switch (num) {
			case 1: 
				$scope.warnings.mesId = $scope.user.checkID();
				if (typeof($scope.warnings.mesId) !== "string") {
					return true;
				} else return false;
			case 2:
				$scope.warnings.mesName = $scope.user.checkName();
				if (typeof($scope.warnings.mesName) !== "string") {
					return true;
				} else return false;
			case 3:
				$scope.warnings.mesEmail = $scope.user.checkEmail();
				if (typeof($scope.warnings.mesEmail) !== "string") {
					return true;
				} else return false;
			case 4:
				$scope.warnings.mesPass = $scope.user.checkPass();
				if (typeof($scope.warnings.mesPass) !== "string") {
					return true;
				} else return false;
			case 5: 
				$scope.warnings.mesCPass = $scope.user.checkCPass();
				if (typeof($scope.warnings.mesCPass) !== "string") {
					return true;
				} else return false;
		}
	};

	/* register function */
	$scope.register = function() {
		var flag;
		for (var i=1; i <=5; i++) {
			flag = $scope.check(i);
			if (flag == false) break;
		}
		if (flag) {
			/*Something*/
			$state.go('form');
		} else {

		}
	};

	/*back to form*/
	$scope.back = function() {
		$state.go('form');
	};
});
