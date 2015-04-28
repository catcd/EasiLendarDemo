/**
 * starter: Can Duy Cat
 * owner: Nguyen Minh Trang
 * last update: 21/04/2015
 * type: particular controller
 */

var signIn = angular.module( "MainApp.controllers.signIn", [ "ionic" ] );

signIn.controller( "SignInController", function( $rootScope, $scope, $timeout,
		$ionicLoading, $ionicPopup, eSettings, eDatabase, eUser ) {

	// All constants
	var MAX_ID_LENGTH = 15,
	MIN_ID_LENGTH = 4,
	MAX_PASSWORD_LENGTH = 16,
	MIN_PASSWORD_LENGTH = 8,
	NUM_OF_WARNINGS = 5,

	// link to home's default view
	link = eSettings.sDefaultView,
	
	// show alert
	showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: "Registered!",
			template: "Welcome to EasiLendar!"
		});
		$timeout( function() {
			alertPopup.close(); // close the popup after 3 seconds for some
			// reason
		}, 3000 );
	};

	$scope.isRemember = false;

	// warning object contains all warnings
	$scope.warnings = {
		// array of messages
		mes: new Array(NUM_OF_WARNINGS),

		// reset all messages (set to null)
		reset: function( num ) {
			this.mes[num] = null;
		},

		// check if mes[i] is a warning or NULL
		check: function( num ) {
			if (this.mes[num] === undefined) {
				return true;
			} else
				return false;
		}
	};

	// create new user
	$scope.user = new User();

	// sign in function with firebase
	$scope.signIn = function() {
		if (!$scope.user.checkChar()) {
			$rootScope.goToState( "warning" );
		} else {
			var id = $scope.user.id;
			var pass = $scope.user.password;
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" + id);
			// loading
			eDatabase.databaseLoading();
			ref.once( "value", function( snapshot ) {
				var user = snapshot.val();
				if (user === null || user.password != pass) {
					$rootScope.goToState( "warning" );
				} else {
					// copy all user's data to eUser
					eUser.uID = id;
					eUser.uName = user.name;
					eUser.uAvata = user.avatar;
					eUser.uEmail = user.gmail;
					eUser.uPassword = pass;
					eUser.uRemember = $scope.isRemember;
					eUser.uFriend = user.friends;
					eUser.uVIP = user.VIP;
					eUser.isLogin = true;

					eUser.uRequested = user.requested;

					// convert
					eUser.uGmailCalendar = eDatabase
							.convertCal(user.g_calendar);
					eUser.uLocalCalendar = eDatabase
							.convertCal(user.local_calendar);

					eUser.uFRequest = user.noti === null ? null
							: user.noti.fRequest;
					eUser.uFAccepted = user.noti === null ? null
							: user.noti.fAccept;
					eUser.uFRLength = 0;
					eUser.uFALength = 0;

					// set uFRLength and uFALength
					eDatabase.setUFRL();
					eDatabase.setUFAL();

					$scope.user.reset();
					$rootScope.goHome();
				}
			}, function( errorObject ) {
				$rootScope.goToState( "warning" );
			});
		}
	};

	// register function
	$scope.register = function() {
		// reset all warnings
		for (var i = 0; i < NUM_OF_WARNINGS; i++) {
			$scope.warnings.reset( i );
		}

		// flag array, contains temporary warning messages
		var flag = [],
		// check if there is a warning
		check = false;

		flag[0] = $scope.user.checkID(); // ID: true or message
		flag[1] = $scope.user.checkName(); // Name: true or message
		flag[2] = $scope.user.checkEmail(); // Email: true or message
		flag[3] = $scope.user.checkPass(); // Password: true or message
		flag[4] = $scope.user.checkCPass(); // Confirm password: true or message

		// if flag[i] is a string => it's a warning
		for (var i = 0; i < NUM_OF_WARNINGS; i++) {
			if (typeof (flag[i]) == "string") {
				$scope.warnings.mes[i] = flag[i];
				check = true;
			}
		}

		// check inputs are correct (or else all users will be licked)
		if (!check) {
			// create a reference to Firebase
			var ref = new Firebase(
					"https://radiant-inferno-3243.firebaseio.com/Users/" +
					$scope.user.id);
			// loading
			eDatabase.databaseLoading();

			// get data from that link if exists, null if not
			ref.once( "value", function( snapshot ) {
				// if id existed => change ID message
				if (snapshot.val() !== null) {
					$scope.warnings.mes[0] = "Existed";
					check = true;
				}
				// if there is no warning
				if (!check) {
					// cut email string to save (get rid of
					// '@gmail.com')
					var pos = $scope.user.email.search( "@" );
					var mail;
					if (pos == -1) {
						mail = $scope.user.email;
					} else {
						mail = $scope.user.email.slice( 0, pos );
					}

					// create new user
					ref.set( {
						name: $scope.user.name,
						password: $scope.user.password,
						avatar: 0,
						VIP: 0,
						gmail: mail
					} );

					// welcome message
					showAlert();
					$scope.user.reset();
					$rootScope.goToState( "form" );
				}
			});
		}
	};

	/* class User */
	function User() {
		// all informations
		this.id = "";
		this.name = "";
		this.email = "";
		this.password = "";
		this.re_password = "";

		// reset all data
		this.reset = function() {
			this.id = "";
			this.name = "";
			this.email = "";
			this.password = "";
			this.re_password = "";
		};

		/*
		 * check ID's characters 0..9 || a..z || A..Z || _
		 */
		this.checkChar = function() {
			// check input length
			if (this.id.length > MAX_ID_LENGTH ||
			this.id.length < MIN_ID_LENGTH) {
				return false;
			}
			// check input characters (ASCII)
			for (var i = 0; i < this.id.length; i++) {
				if (this.id.charCodeAt( i ) < 48) {
					return false;
				} else if (this.id.charCodeAt( i ) > 57 && this.id.charCodeAt( i ) < 65) {
					return false;
				} else if (this.id.charCodeAt( i ) > 90 && this.id.charCodeAt( i ) < 97 &&
						this.id.charCodeAt( i ) != 95) {
					return false;
				} else if (this.id.charCodeAt( i ) > 122) {
					return false;
				}			
			}
			return true;
		};

		/*
		 * check ID Can not be empty ID must be unique (check later when connect
		 * to server)
		 */
		this.checkID = function() {
			// if valid return true else return fault's
			// string
			if (this.id === "") {
				return "Required";
			} else if (!this.checkChar()) {
				if (this.id.length < MIN_ID_LENGTH) {
					return "ID is too short";
				} else if (this.id.length > MAX_ID_LENGTH) {
					return "ID is too long";
				} else {
					return "Unexpected";
				}
			} else {
				return true;
			}
		};

		/*
		 * check Name Can not be empty
		 */
		this.checkName = function() {
			// if valid return true else return fault's
			// string
			if (this.name === "") {
				return "Required";
			}
			return true;
		};

		/*
		 * check Email can not be empty
		 */
		this.checkEmail = function() {
			// if valid return true else return fault's
			// string
			if (this.email === "") {
				return "Required";
			} else if (-1 == this.email.search( "@gmail.com" )) {
				return "Unvalid Email";
			}
			return true;
		};

		/*
		 * check Password Can not be empty
		 */
		this.checkPass = function() {
			// if valid return true else return fault's
			// string
			if (this.password === "") {
				return "Required";
			} else if (this.password.length < MIN_PASSWORD_LENGTH) {
				return "Too short";
			} else if (this.password.length > MAX_PASSWORD_LENGTH) {
				return "Too long";
			}
			return true;
		};

		/*
		 * check confirm password Can not be empty Must match with password
		 */
		this.checkCPass = function() {
			// if valid return true else return fault's
			// string
			if (this.re_password === "") {
				return "Required";
			} else if (this.re_password != this.password) {
				return "Not match";
			}
			return true;
		};
	} // End of class User

	/*
	 * // sign in function $scope.signIn = function() { if
	 * (!$scope.user.checkChar()) { $state.go('warning'); } else { var id =
	 * $scope.user.id; var pass = $scope.user.password;
	 * $http.post("php/signIn.php", {"ID": id, "pass": pass})
	 * .success(function(data,status,headers,config) { if (data == "YES") {
	 * $state.go(link); } else { $state.go(link); // should be warning } })
	 * .error(function(data,status) { $state.go(link);//should be warning});}};
	 */
});
