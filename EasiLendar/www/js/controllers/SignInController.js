/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 12/03/2015
 * type: particular controller
 */

var signIn = angular.module('MainApp.controllers.signIn', []);

signIn.controller('SignInController',function($rootScope, $scope, $http, $state) {
	
	// link to home's default view
	var link = $rootScope.eSettings.sDefaultView;
	
	$scope.isRemember = false;
	
	// warning object contains all warnings
	$scope.warnings = {
		// array of messages (5 mes)
		mes: [],
		
		// reset all messages (set to null)
		reset: function() {
			for (var i=0; i < 5; i++) {
				this.mes[i] = null;
			}
		}
	};
	
	/* class User */
	function User() {
		// all informations
		this.id ="";
		this.name="";
		this.email="";
		this.password="";
		this.re_password="";
		
		// reset all data 
		this.reset = function() {
			this.id ="";
			this.name="";
			this.email="";
			this.password="";
			this.re_password="";
		};
		
		/* check ID's availability
		 * return true if user can use that ID 
		 */
		var checkAvailability = function() {
			return true;
		};
		
		/* check ID's characters
		 * 0..9 || a..z || A..Z || _ 
		 */
		this.checkChar = function() {
			// check input length
			if (this.id.length > 15 || this.id.length < 4)
				return false;
			// check input characters (ASCII)
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
		
		/* check ID
		 * Can not be empty
		 * ID must be unique 
		 */
		this.checkID = function() {
			// if valid return true else return fault's string
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
		
		/* check Name
		 * Can not be empty
		 */
		this.checkName = function() {
			// if valid return true else return fault's string
			if (this.name == "") {
				return "Required";
			}
			return true;
		};

		/* check Email
		 * can not be empty
		 */
		this.checkEmail = function() {
			// if valid return true else return fault's string
			if (this.email == "") {
				return "Required";
			} else if (-1 == this.email.search("@")) {
				return "Unvalid Email";
			}
			return true;
		};

		/* check Password
		 * Can not be empty
		 */
		this.checkPass = function() {
			// if valid return true else return fault's string
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
			// if valid return true else return fault's string
			if (this.re_password =="") {
				return "Required";
			} else if (this.re_password != this.password) {
				return "Not match";
			}
			return true;
		};
	}; // End of class User

	// create new user 
	$scope.user = new User();
	
	// sign in function with firebase
	$scope.signIn = function() {
		if (!$scope.user.checkChar()) {
			$state.go('warning');
		} else {
			var id = $scope.user.id;
			var pass = $scope.user.password;
			var ref = new Firebase("https://radiant-inferno-3243.firebaseio.com/Users/"+id);
			
			ref.on("value", function(snapshot) {
	  			var user = snapshot.val();
				if (user == null || user.password != pass) {
					$state.go("warning");
				} else {
					$state.go(link);
				}
			}, function (errorObject) {
				$state.go("warning");
			});
		}
	};
	/*
	// sign in function 
	$scope.signIn = function() {
		if (!$scope.user.checkChar()) {
			$state.go('warning');
		} else {
			var id = $scope.user.id;
			var pass = $scope.user.password;
			$http.post("php/signIn.php", {"ID": id, "pass": pass})
			.success(function(data,status,headers,config) {
				if (data == "YES") {
					$state.go(link);
				} else {
					$state.go(link);	// should be warning
				}
			})
			.error(function(data,status) {
				$state.go(link);	// should be warning
			});
		}
	};
	*/
	
	// confirm the warning when sign in
	$scope.confirm = function() {
		$state.go('form');
	};

	// register function 
	$scope.register = function() {
		// flag array, contains temporary warning messages
		var flag = [];
		// count number of warnings
		var count = 0;
		flag[0] = $scope.user.checkID();	// ID
		flag[1] = $scope.user.checkName();	// Name
		flag[2] = $scope.user.checkEmail();	// Email
		flag[3] = $scope.user.checkPass();	// Password
		flag[4] = $scope.user.checkCPass();	// Confirm password
		
		// if flag[i] is a string => it's a warning
		for (var i=0; i < 5; i++) {
			if (typeof(flag[i]) == "string") {
				$scope.warnings.mes[i] = flag[i];
				count++;
			}
		}
		
		// if there is no warning
		if (count == 0) {
			//something
			$state.go('form');
		} else {

		}
	};
	
	// check if mes[i] is a warning or NULL
	$scope.check = function(num) {
		if ($scope.warnings.mes[num] == null) {
			return true;
		} else return false;
	};
	
	// back to form
	$scope.back = function() {
		$state.go('form');
	};
});
