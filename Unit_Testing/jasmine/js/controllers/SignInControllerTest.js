/**
 * starter: Can Duy Cat 
 * owner: Nguyen Minh Trang 
 * last update: 18/04/2015 
 * type: unit test
 */

describe('Sign In', function() {
	beforeEach(module('MainApp.controllers.signIn'));
	var $controller, $rootScope, $scope;
	beforeEach(inject(function(_$rootScope_, _$controller_) {
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		
		$rootScope.eSettings = {sDefaultView : ""};
		$controller('SignInController', {'$rootScope' : $rootScope, '$scope': $scope });
	}));
	
	describe('User', function() {		
		it('should create new user', function() {
			var user = $scope.user;
			expect(user).not.toBeUndefined();
		});
		
		describe('should check ID', function() {
			it('should check id is required', function() {
				$scope.user.id = '';
				expect($scope.user.checkID()).toBe("Required");
			});
			
			it('should check a valid id', function() {
				$scope.user.id = "test1";
				expect($scope.user.checkChar()).toBe(true);
			});
		
			it('should check an unvalid id', function() {
				$scope.user.id = "^iasifd 91";
				expect($scope.user.checkChar()).not.toBe(true);
			});
		
			it('should check id is too short', function() {
				$scope.user.id = "a";
				expect($scope.user.checkID()).toBe("ID is too short");
			});
		
			it('should check id is too long', function() {
				$scope.user.id = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
				expect($scope.user.checkID()).toBe("ID is too long");
			});
		});
		
		describe('should check Name', function() {
			it('should check name is required', function() {
				$scope.user.name = "";
				expect($scope.user.checkName()).toBe("Required");
			});
			
			it('should check a valid name', function() {
				$scope.user.name = "test1";
				expect($scope.user.checkName()).toBe(true);
			});
		});
		
		describe('should check Email', function() {
			it('should check email is required', function() {
				$scope.user.email = "";
				expect($scope.user.checkEmail()).toBe("Required");
			});
	
			it('should check valid email', function() {
				$scope.user.email = "abc@gmail.com";
				expect($scope.user.checkEmail()).toBe(true);
			});

			it('should check unvalid email', function() {
				$scope.user.email = "jdas abc@@hhihi.yahoo";
				expect($scope.user.checkEmail()).toBe("Unvalid Email");
			});
		});

		describe('should check password', function() {
			it('should check password is required', function() {
				$scope.user.password = "";
				expect($scope.user.checkPass()).toBe("Required");
			});
			
			it('should check password is too short', function() {
				$scope.user.password = "1234567";
				expect($scope.user.checkPass()).toBe("Too short");
			});

			it('should check password is too long', function() {
				$scope.user.password = "12345678901234567890";
				expect($scope.user.checkPass()).toBe("Too long");
			});

			it('should check a valid password', function() {
				$scope.user.password = "12341234";
				expect($scope.user.checkPass()).toBe(true);
			});

			it('should check confirm password is match', function() {
				$scope.user.password = "easilendar1";
				$scope.user.re_password = "easilendar1";
				expect($scope.user.checkCPass()).toBe(true);
			});

			it('should check confirm password is not match', function() {
				$scope.user.password = "12341234";
				$scope.user.re_password = "1234123123";
				expect($scope.user.checkCPass()).toBe("Not match");
			});
		});

		afterEach(function() {
			$scope.user.reset();
		});
	});
	
	describe('Warnings', function() {
		var warnings;
		beforeEach(function() {
			warnings = $scope.warnings;
		});
		
		it('should create warnings Object', function() {
			expect(warnings).toBeDefined();
		});
		
		it('should have no warning by default', function() {
			for (var i=0; i < 5; i++) {
				expect(warnings.mes[i]).toBe("");
			}
		});
		
		it('ID should have a warning', function() {
			warnings.mes[0] = "Too short";
			expect(warnings.check(0)).toBe(false);
		});
		
		it('Name should have a warning', function() {
			warnings.mes[1] = "Required";
			expect(warnings.check(1)).toBe(false);
		});
		
		it('Email should have a warning', function() {
			warnings.mes[2] = "Unvalid";
			expect(warnings.check(2)).toBe(false);
		});
		
		it('Password should have no warning', function() {
			expect(warnings.check(3)).toBe(true);
		});
		
		it('should reset all warnings to default', function() {
			for (var i=0; i < 5; i++) {
				warnings.reset(i);
				expect(warnings.check(i)).toBe(true);
			}
		});
		
		afterEach(function() {
			for(var i=0; i < 5; i++) {
				warnings.reset(i);
			}
		});
	});
});
