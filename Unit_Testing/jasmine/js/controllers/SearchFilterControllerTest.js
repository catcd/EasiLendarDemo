/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 24/04/2015
 * type: paticular controller
 * number of tests: 57
 */

/** Test for:
  * initialize data
  * convertToMinute function
  * deleteValue function
  */

describe('Search Filter', function(){
	var $controller, $rootScope, $scope;
	var eSearchFilter, eSettings, eFriend;

	beforeEach(module('MainApp.controllers.searchFilter'));

	eSearchFilter = {
		mTitle: '',		/*Name of meeting*/
		mDuration: 0,	/*Duration of meeting */
		mLocation: '',	/*Location of meeting*/

		mFrom: 0,		/*Time to start searching: Minute(s) from 24:00am*/
		mTo: 0,			/*Time to end searching: Minute(s) from 24:00am*/
		mFromDay: '',	/*Day to start searching: format: ddmmyy*/
		mToDay: '',		/*Day to end searching: format: ddmmyy*/

		mBreakfast: null,	/*Avoid/Prioritize*/
		mLunch: null,		/*avoid = true;*/
		mDinner: null,		/*prioritize = false ;*/
		mOffice: null,		/*none(default) = null;*/
		mHoliday: null, 	/**/

		resetData: function(){
			this.mTitle = '';
			this.mDuration = 0;
			this.mLocation = '';

			this.mFrom = 0;
			this.mTo = 0;
			this.mFromDay = '';
			this.mToDay = '';

			this.mBreakfast = null;
			this.mLunch = null;
			this.mDinner = null;
			this.mOffice = null;
			this.mHoliday = null;
		}
	};

	eFriend = {
		fName : '',
	};

	eSettings = {
		sDefaultDuration: 60
	};

	eUser = {
		uVIP: 0
	};

	beforeEach(inject(function(_$rootScope_, _$controller_){
		$rootScope = _$rootScope_;
		$controller = _$controller_;
		$scope = $rootScope.$new();
			
		$rootScope = {
			goToState: function(stateName){},
			$on: function(){},
			goHome: function(){}
		};

		$controller('SearchFilterController', {
			'$rootScope': $rootScope, 
			'$scope': $scope,
			'eSearchFilter': eSearchFilter,
			'eSettings': eSettings,
			'eFriend': eFriend,
			'eUser': eUser
			}
		);
	}));

	describe('Initialize data', function(){
		describe('sSearchFilter object', function(){
			it('should create eSearchFilter object with resetData function', function(){
				expect(eSearchFilter.hasOwnProperty('resetData')).toBe(true);
			});
			it('should create eSearchFilter object with default values for all properties', function(){
				expect(eSearchFilter.mTitle).toBe('');
				expect(eSearchFilter.mLocation).toBe('');
				expect(eSearchFilter.mFromDay).toBe('');
				expect(eSearchFilter.mToDay).toBe('');
				expect(eSearchFilter.mFrom).toBe(0);
				expect(eSearchFilter.mTo).toBe(0);
				expect(eSearchFilter.mDuration).toBe(0);
				expect(eSearchFilter.mBreakfast).toBe(null);
				expect(eSearchFilter.mLunch).toBe(null);
				expect(eSearchFilter.mDinner).toBe(null);
				expect(eSearchFilter.mOffice).toBe(null);
				expect(eSearchFilter.mHoliday).toBe(null);
			});
		});

		describe('eFriend.fName', function(){
			it('should initialize eFriend.fName value is "" or name of person', function(){
				expect(eFriend.fName).toBe('');
			});
		});

		describe('eUser.uVIP', function(){
			it('should initialize eUser.uVIP value is 0 or 1', function(){
				expect(eUser.uVIP).toBe(0);
			});
		});

		describe('eSettings.sDefaultDuration', function(){
			it('should initialize eSettings.sDefaultDuration value a integer number', function(){
				expect(eSettings.sDefaultDuration >= 0).toBe(true);
			});
		});

		describe('timeValues object', function(){
			it('should create timeValues object with default values for all properties', function(){
				expect($scope.timeValues.mDurationHour).toBe(eSettings.sDefaultDuration / 60);
				expect($scope.timeValues.mDurationMinute).toBe(eSettings.sDefaultDuration % 60);
				expect($scope.timeValues.mFromDay.toDateString()).toEqual((new Date()).toDateString());
				expect($scope.timeValues.mToDay.toDateString()).toEqual((new Date()).toDateString());
				expect($scope.timeValues.mFromTime).toBe(null);
				expect($scope.timeValues.mToTime).toBe(null);
			});
		});

		describe('priorityTimes array', function(){
			it('should create priorityTimes array with default values for all objects', function(){
				for(var i=0; i<$scope.priorityTimes.length; i++){
					expect($scope.priorityTimes[i].values).toBeNull();
					expect($scope.priorityTimes[i].index).toBe(i);
				}

				expect($scope.priorityTimes[0].name).toBe('Breakfast');
				expect($scope.priorityTimes[1].name).toBe('Lunch');
				expect($scope.priorityTimes[2].name).toBe('Dinner');
				expect($scope.priorityTimes[3].name).toBe('Office');
				expect($scope.priorityTimes[4].name).toBe('Holiday');
			});
		});

		describe('Some basic variables', function(){
			it('should create preState is ""', function(){
				expect($scope.preState).toBe('');
			});

			it('should create mShow is false', function(){
				expect($scope.mShow).toBe(false);
			});

			it('should create showDay is true', function(){
				expect($scope.showDay).toBe(true);
			});

			it('should create showTime is false', function(){
				expect($scope.showTime).toBe(false);
			});

			it('should create titleOfButton is ADVANCE FILTER', function(){
				expect($scope.titleOfButton).toBe('ADVANCE FILTER');
			});
		});
	});

	describe('All basic functions', function(){
		describe('Input data', function(){
			it('should return eSearchFilter.mFromDay and eSearchFilter.mToDay are Date object', function(){
				$scope.timeValues.mFromDay = new Date();
				$scope.timeValues.mToDay = new Date();
				$scope.$apply();
				expect(eSearchFilter.mFromDay.getDate()).toEqual($scope.timeValues.mFromDay.getDate());
				expect(eSearchFilter.mToDay.getDate()).toEqual($scope.timeValues.mToDay.getDate());
			});

			it('should return $scope.minDate is timeValues.mFromDay', function(){
				$scope.timeValues.mFromDay = new Date();
				$scope.$apply();
				expect($scope.minDate).toBe($scope.timeValues.mFromDay);
			});

			it('should return eSearchFilter.mFrom and eSearchFilter.mTo are Date object', function(){
				$scope.timeValues.mFromTime = new Date();
				$scope.timeValues.mToTime = new Date();
				$scope.$apply();
				expect(eSearchFilter.mFrom.getDate()).toEqual($scope.timeValues.mFromTime.getDate());
				expect(eSearchFilter.mTo.getDate()).toEqual($scope.timeValues.mToTime.getDate());
			});

			it('should return $scope.minTime is timeValues.mFromTime', function(){
				$scope.timeValues.mFromTime = new Date();
				$scope.$apply();
				expect($scope.minTime).toBe($scope.timeValues.mFromTime);
			});

			it('should call convertToMinute function', function(){
				spyOn($scope, 'convertToMinute');
				$scope.timeValues.mDurationHour = 1;
				$scope.timeValues.mDurationMinute = 60;
				$scope.$apply();
				expect($scope.convertToMinute).toHaveBeenCalled();
			});

			it('should change value of eSearchFilter.mBreakfast when priorityTimes[0].value changes', function(){
				$scope.priorityTimes[0].values = true;
				$scope.$apply();
				expect(eSearchFilter.mBreakfast).toBe(true);
			});

			it('should change value of eSearchFilter.mLunch when priorityTimes[1].value changes', function(){
				$scope.priorityTimes[1].values = false;
				$scope.$apply();
				expect(eSearchFilter.mLunch).toBe(false);
			});

			it('should change value of eSearchFilter.mDinner when priorityTimes[2].value changes', function(){
				$scope.priorityTimes[2].values = true;
				$scope.$apply();
				expect(eSearchFilter.mDinner).toBe(true);
			});

			it('should change value of eSearchFilter.mOffice when priorityTimes[3].value changes', function(){
				$scope.priorityTimes[3].values = false;
				$scope.$apply();
				expect(eSearchFilter.mOffice).toBe(false);
			});

			it('should change value of eSearchFilter.mHoliday when priorityTimes[4].value changes', function(){
				$scope.priorityTimes[4].values = true;
				$scope.$apply();
				expect(eSearchFilter.mHoliday).toBe(true);
			});
		});

		describe('Convert to minute', function(){
			it('should return correct minute when input valid hours and minutes', function(){
				$scope.timeValues.mDurationHour = 1;
				$scope.timeValues.mDurationMinute = 30;

				$scope.convertToMinute();
				expect(eSearchFilter.mDuration).toBe(90);
			});

			it('should not change eSearchFilter.mDuration when input hour is less than 0', function(){
				$scope.timeValues.mDurationHour = -1;
				$scope.timeValues.mDurationMinute = 30;

				$scope.convertToMinute();
				expect(eSearchFilter.mDuration).toBe(90);
			});

			it('should not change eSearchFilter.mDuration when input hour is greater than 24', function(){
				$scope.timeValues.mDurationHour = 24;
				$scope.timeValues.mDurationMinute = 30;

				$scope.convertToMinute();
				expect(eSearchFilter.mDuration).toBe(90);
			});

			it('should not change eSearchFilter.mDuration when input minute is greater than 59', function(){
				$scope.timeValues.mDurationHour = 1;
				$scope.timeValues.mDurationMinute = 60;

				$scope.convertToMinute();
				expect(eSearchFilter.mDuration).toBe(90);
			});

			it('should not change eSearchFilter.mDuration when input minute is less than 0 ', function(){
				$scope.timeValues.mDurationHour = 1;
				$scope.timeValues.mDurationMinute = -1;

				$scope.convertToMinute();
				expect(eSearchFilter.mDuration).toBe(90);
			});

			it('should return undefined when input invalid hours and minutes', function(){
				$scope.timeValues.mDurationHour = 25;
				$scope.timeValues.mDurationMinute = -1;
				
				$scope.convertToMinute();
				expect(eSearchFilter.mDuration).toBe(90);
			});

			it('should not change eSearchFilter.mDuration when input hour is string', function(){
				$scope.timeValues.mDurationHour = 'a';
				$scope.timeValues.mDurationMinute = 30;
				
				$scope.convertToMinute();
				expect(eSearchFilter.mDuration).toBe(90);
			});

			it('should not change eSearchFilter.mDuration when input minute is string', function(){
				$scope.timeValues.mDurationHour = 1;
				$scope.timeValues.mDurationMinute = 'a';
				
				$scope.convertToMinute();
				expect(eSearchFilter.mDuration).toBe(90);
			});

			it('should not change eSearchFilter.mDuration when input hour and minute are strings', function(){
				$scope.timeValues.mDurationHour = 'a';
				$scope.timeValues.mDurationMinute = 'a';
				
				$scope.convertToMinute();
				expect(eSearchFilter.mDuration).toBe(90);
			});

			it('should return eSearchFilter.mDuration is 0 when does not input minute and hour', function(){
				$scope.timeValues.mDurationHour = null;
				$scope.timeValues.mDurationMinute = null;

				$scope.convertToMinute();
				expect(eSearchFilter.mDuration).toBe(0);
			});
		});

		describe('Submit', function(){
			it('should call goToState function and change state when form.$valid is true', function(){
				spyOn($rootScope, 'goToState');
				var form = {
					$valid: true
				};

				$scope.submit(form);
				expect($rootScope.goToState).toHaveBeenCalled();
			});

			it('should show error inputs and not change to other state when form.$valid is false', function(){
				spyOn($rootScope, 'goToState');
				var form = {
					$valid: false
				};

				$scope.submit(form);
				expect($rootScope.goToState.calls.any()).toBe(false);
			});
		});

		describe('Delete value', function(){
			var form = {
				$setPristine: function(){},
				$setUntouched: function(){}
			};

			it('should call goToState function', function(){
				spyOn($rootScope, 'goToState');
				$scope.preState = 'profile';
				$scope.deleteValue(form);
				expect($rootScope.goToState).toHaveBeenCalled();
			});

			it('should call goHome function', function(){
				spyOn($rootScope, 'goHome');
				$scope.deleteValue(form);
				expect($rootScope.goHome).toHaveBeenCalled();
			});

			it('should call $setPristine function', function(){
				spyOn(form, '$setPristine');
				$scope.deleteValue(form);
				expect(form.$setPristine).toHaveBeenCalled();
			});

			it('should call $setUntouched function', function(){
				spyOn(form, '$setUntouched');
				$scope.deleteValue(form);
				expect(form.$setUntouched).toHaveBeenCalled();
			});

			it('should call eSearchFilter.resetData function', function(){
				spyOn(eSearchFilter, 'resetData');
				$scope.deleteValue(form);
				expect(eSearchFilter.resetData).toHaveBeenCalled();
			});

			it('should set eSearchFilter object to pristine value', function(){
				var pristine = angular.copy(eSearchFilter);

				eSearchFilter.mDuration = 60;
				eSearchFilter.mFromDay = new Date();
				eSearchFilter.mHoliday = true;

				$scope.deleteValue(form);
				expect(eSearchFilter).toEqual(pristine);
			});

			it('should set timeValues object to pristine value', function(){
				var pristine = angular.copy($scope.timeValues);

				$scope.timeValues.mDurationHour = 60;
				$scope.timeValues.mFromDay = new Date();
				$scope.timeValues.mFromTime = new Date();

				$scope.deleteValue(form);
				expect($scope.timeValues).toEqual(pristine);
			});

			it('should set priorityTimes array to pristine', function(){
				var pristine = angular.copy($scope.priorityTimes);

				$scope.priorityTimes[0].value = true;
				$scope.priorityTimes[1].value = false;
				$scope.priorityTimes[2].value = false;

				$scope.deleteValue(form);
				expect($scope.priorityTimes).toEqual(pristine);
			});

			it('should set mShow to false', function(){
				var pristine = angular.copy($scope.priorityTimes);
				$scope.mShow = true;
				$scope.deleteValue(form);
				expect($scope.mShow).toBe(false);
			});

			it('should set titleOfButton is ADVANCE FILTER', function(){
				$scope.titleOfButton = 'End';

				$scope.deleteValue(form);
				expect($scope.titleOfButton).toBe('ADVANCE FILTER');
			});
		});

		describe('Toggle function', function(){
			describe('If person is VIP user', function(){
				it('should change mShow to true when it is false', function(){
					eUser.uVIP = 1;
					$scope.mShow = false;
					$scope.toggleFunc();
					expect($scope.mShow).toBe(true);
				});

				it('should change mShow to false when it is true', function(){
					eUser.uVIP = 1;
					$scope.mShow = true;
					$scope.toggleFunc();
					expect($scope.mShow).toBe(false);
				});

				it('should change titleOfButton to ADVANCE FILTER when mShow is false', function(){
					eUser.uVIP = 1;
					$scope.mShow = true;
					$scope.toggleFunc();
					expect($scope.titleOfButton).toBe('ADVANCE FILTER');
				});

				it('should change titleOfButton to ADVANCE FILTER when mShow is true', function(){
					eUser.uVIP = 1;
					$scope.mShow = false;
					$scope.toggleFunc();
					expect($scope.titleOfButton).toBe('End');
				});
			});

			describe('If person is not VIP user', function(){
				it('should should not change mShow and titleOfButton values', function(){
					eUser.uVIP = 0;
					$scope.mShow = false;
					$scope.titleOfButton = 'ADVANCE FILTER';

					$scope.toggleFunc();
					expect($scope.mShow).toBe(false);
					expect($scope.titleOfButton).toBe('ADVANCE FILTER');
				});
			});
		});

		describe('showDate function', function(){
			it('should change showDay to false when it is true', function(){
				$scope.showDay = true;
				$scope.showDate();
				expect($scope.showDay).toBe(false);
			});

			it('should change showDay to true when it is false', function(){
				$scope.showDay = false;
				$scope.showDate();
				expect($scope.showDay).toBe(true);
			});

			it('should change showTime to false when it is true', function(){
				$scope.showTime = true;
				$scope.showDate();
				expect($scope.showTime).toBe(false);
			});

			it('should change showTime to true when it is false', function(){
				$scope.showTime = false;
				$scope.showDate();
				expect($scope.showTime).toBe(true);
			});

			it('should change eSearchFilter.mDuration to 1 when showTime is true and showDay is false', function(){
				$scope.showTime = false;
				$scope.showDate();
				$scope.$apply();
				expect(eSearchFilter.mDuration).toBe(1);
			});

			it('should change eSearchFilter.mDuration to eSettings.sDefaultDuration when showTime is false and showDay is true', function(){
				$scope.showTime = true;
				$scope.showDate();
				$scope.$apply();
				expect(eSearchFilter.mDuration).toEqual(eSettings.sDefaultDuration);
			});
		});
	});
});