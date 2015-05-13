/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 12/05/2015
 * type: loading controller test
 */

describe('Test Loading controller', function() {
	var $controller, $rootScope, $scope,
		$cordovaNetwork, $ionicLoading,
		eSettings;

	var networkFake,
		navigatorFake;

	var $cordovaNetwork = {
		getNetwork: function() {
			return networkFake;
		},
	};

	var $ionicLoading = {
		show: function(obj) {
			alert('memssage');
		},
	};

	var eSettings = {
		sInternet: "",
		sTimeZone: "",
	};

	beforeEach(module('MainApp.controllers.loading'), function($provide) {
		$provide.constant('Connection');
	});

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$rootScope.goToState = function(state) {};
		spyOn($ionicLoading, 'show');

		$controller('LoadingController', {
			'$rootScope': $rootScope,
			'$scope': $scope,
			'$cordovaNetwork': $cordovaNetwork,
			'$ionicLoading': $ionicLoading,
			'eSettings': eSettings,
		});
	}));

	describe('Initialize data and loading show', function() {
		it('should call $ionicLoading.show', function() {
			expect($ionicLoading.show).toHaveBeenCalled();
		});

		it('should show loading at least 4000 miliseconds', function() {
			expect($ionicLoading.show).toHaveBeenCalledWith(jasmine.objectContaining({
				duration: 4000,
			}));
		});

		it('should show loading with a template', function() {
			expect($ionicLoading.show).toHaveBeenCalledWith(jasmine.objectContaining({
				template: '<ion-content class="easi-full-blue"><center><img src="img/logo.png" class="easi-logo"><br><p class="easi-font easi-big-name">EasiLendar</p><br><div id="followingBallsG"><div id="followingBallsG_1" class="followingBallsG"></div><div id="followingBallsG_2" class="followingBallsG"></div><div id="followingBallsG_3" class="followingBallsG"></div><div id="followingBallsG_4" class="followingBallsG"></div></div></center></ion-content>',
			}));
		});

		it('should defined checkConnection function', function() {
			var func = $scope.checkConnection;

			expect(func).toBeDefined();
		});

		it('should defined getTimezone function', function() {
			var func = $scope.getTimezone;

			expect(func).toBeDefined();
		});
	});

	describe('loadingFunction test', function() {
		beforeEach(function() {
			navigator.connection = undefined;
		});

		afterEach(function() {
			navigator.connection = undefined;
		});

		it('should call $scope.checkConnection() if navigator.connection != undefined', function() {
			spyOn($scope, 'checkConnection');
			navigator.connection = !undefined;

			$scope.loadingFunction();

			expect($scope.checkConnection).toHaveBeenCalled();
		});

		it('should not call $scope.checkConnection() if navigator.connection == undefined', function() {
			spyOn($scope, 'checkConnection');
			navigator.connection = undefined;

			$scope.loadingFunction();

			expect($scope.checkConnection).not.toHaveBeenCalled();
		});

		it('should call $scope.getTimezone()', function() {
			spyOn($scope, 'getTimezone');

			$scope.loadingFunction();

			expect($scope.getTimezone).toHaveBeenCalled();
		});

		it('should go to state form', function() {
			spyOn($rootScope, 'goToState');

			$scope.loadingFunction();

			expect($rootScope.goToState).toHaveBeenCalled();
			expect($rootScope.goToState).toHaveBeenCalledWith("form");
		});
	});

	describe('checkConnection test', function() {
		beforeEach(function() {
			networkFake = "";
			// Connection.CELL_2G = "2G";
			// Connection.CELL_3G = "3G";
			// Connection.CCELL_4G = "4G";
			// Connection.CELL = "CELL";
			// Connection.ETHERNET = "ETHERNET";
			// Connection.WIFI = "WIFI";
			// Connection.UNKNOWN = "UNKNOWN";
			// Connection.NONE = "NONE";
		});

		afterEach(function() {
			networkFake = "";
		});

		// it('should call getNetwork()', function() {
		// 	spyOn($cordovaNetwork, 'getNetwork');
		// 	networkFake = "2G";

		// 	$scope.checkConnection();

		// 	expect($cordovaNetwork.getNetwork).toHaveBeenCalled();
		// });
	});

	describe('getTimezone test', function() {
		it('should apply true timezone', function() {
			$scope.getTimezone();
			var timezone = -(new Date().getTimezoneOffset())/60;

			expect(eSettings.sTimeZone).toEqual(timezone);
		});
	});
});
