/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 03/05/2015
 * type: todo controller
 */

angular.module('MainApp.controllers.todo', [])

.controller("TodoController", function($scope, $rootScope, $ionicPopup, $ionicModal, $ionicActionSheet, eUser, eToast, eDatabase) {
	// inject services
	$scope.eUser = eUser;
	$scope.eDatabase = eDatabase;

	// initialize variable
	$scope.data = {}; // temp data
	$scope.todoIcon = ["ion-ios-star-outline", "ion-ios-star-half", "ion-ios-star"];
	$scope.todoButton = {
		"false": "ion-android-radio-button-off",
		"true": "ion-android-checkmark-circle"
	};
	$scope.orderChecklist = angular.copy(eUser.uTodo);
	$scope.viewList = null;
	$scope.getTaskData = {};
	$scope.getDoneChecklistData = [];
	$scope.shouldShowDelete = false;
	$scope.shouldShowReorder = false;
	$scope.isShowDes = {};
	$scope.isCreate = false;
	$scope.semaphore = true;

	// controller functions
	$scope.findIndexOf = function(checklist) {
		return $scope.orderChecklist.indexOf(checklist);
	};

	$scope.updateOrderChecklist = function() {
		$scope.orderChecklist = angular.copy(eUser.uTodo);
	};

	$scope.checkImportantList = function(checklist) {
		checklist.important = (checklist.important + 1) % 3;
	};

	$scope.countTask = function() {
		var countRecently = 0;
		var countImportant = 0;
		var countVeryImportant = 0;

		eUser.uTodo.forEach(function(element, index) {
			if (!element.done) {
				element.list.forEach(function(elementIn, indexIn) {
					if (!elementIn.done) {
						switch (elementIn.important) {
							case 1:
								countImportant++;
								break;
							case 2:
								countVeryImportant++;
								break;
						}
						countRecently++;
					}
				});
			}
		});

		return {
			important: countImportant,
			veryImportant: countVeryImportant,
			recently: countRecently
		};
	};

	$scope.makeChangeTodoList = function() {
		$scope.getTaskNow();
		$scope.updateOrderChecklist();
		$scope.getDoneChecklistNow();
	};

	$scope.getTaskNow = function() {
		$scope.getTaskData = $scope.getTask();
	};

	$scope.getTask = function() {
		var getRecently = [];
		var getImportant = [];
		var getVeryImportant = [];
		var getDoneList = [];

		eUser.uTodo.forEach(function(element, index) {
			if (!element.done) {
				element.list.forEach(function(elementIn, indexIn) {
					if (!elementIn.done) {
						switch (elementIn.important) {
							case 1:
								getImportant.push({
									task: elementIn,
									checklist: element
								});
								break;
							case 2:
								getVeryImportant.push({
									task: elementIn,
									checklist: element
								});
								break;
						}
						getRecently.push({
							task: elementIn,
							checklist: element
						});
					} else {
						getDoneList.push({
							task: elementIn,
							checklist: element
						});
					}
				});
			}
		});

		return {
			important: getImportant,
			veryImportant: getVeryImportant,
			recently: getRecently,
			doneList: getDoneList,
		};
	};

	$scope.getDoneChecklistNow = function() {
		$scope.getDoneChecklistData = $scope.getDoneChecklist();
	};

	$scope.getDoneChecklist = function() {
		var getChecklist = [];

		eUser.uTodo.forEach(function(element, index) {
			if (element.done) {
				getChecklist.push({
					checklist: element,
					index: index
				});
			}
		});

		return getChecklist;
	};

	$scope.deleteChecklist = function(checklist) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure to delete?',
			subTitle: 'This action cannot be undone!',
			cancelType: 'easi-back-red',
		});

		confirmPopup.then(function(res) {
			if (res) {
				eUser.uTodo.splice($scope.findIndexOf(checklist), 1);
				$scope.makeChangeTodoList();
			} else {
				// cancel
			}
		});
	};

	$scope.deleteChecklistWithoutConfirm = function(checklist) {
		eUser.uTodo.splice($scope.findIndexOf(checklist), 1);
		$scope.makeChangeTodoList();
	};

	$scope.deleteChecklistDirectly = function(index) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure to delete?',
			subTitle: 'This action cannot be undone!',
			cancelType: 'easi-back-red',
		});

		confirmPopup.then(function(res) {
			if (res) {
				eUser.uTodo.splice(index, 1);
				$scope.makeChangeTodoList();
			} else {
				// cancel
			}
		});
	};

	$scope.deleteChecklistWithoutConfirmDirectly = function(index) {
		eUser.uTodo.splice(index, 1);
		$scope.makeChangeTodoList();
	};

	$scope.editChecklistTime = function(task, checklist) {
		eToast.toastInfo('Coming soon...', 3000);
	};

	$scope.editChecklist = function(checklist) {
		$scope.data.newName = eUser.uTodo[$scope.findIndexOf(checklist)].listName;

		var editPopup = $ionicPopup.show({
			template: '<input type="text" style="padding-left: 5px" ng-model="data.newName" placeholder="Enter a new name">',
			title: 'Edit Checklist detail',
			subTitle: 'English character only!',
			scope: $scope,

			buttons: [{
				text: 'Cancel',
				type: 'easi-back-red',
				onTap: function(e) {
					$scope.data = {};
				}
			}, {
				text: 'Save',
				onTap: function(e) {
					if ($scope.data.newName == "" || $scope.data.newName == undefined) {
						e.preventDefault();
					} else {
						eUser.uTodo[$scope.findIndexOf(checklist)].listName = $scope.data.newName;
						$scope.makeChangeTodoList();
						$scope.data = {};
					}
				}
			}]
		});
	};

	$scope.editChecklistDirectly = function(index) {
		$scope.data.newName = eUser.uTodo[index].listName;

		var editPopup = $ionicPopup.show({
			template: '<input type="text" style="padding-left: 5px" ng-model="data.newName" placeholder="Enter a new name">',
			title: 'Edit Checklist detail',
			subTitle: 'English character only!',
			scope: $scope,

			buttons: [{
				text: 'Cancel',
				type: 'easi-back-red',
				onTap: function(e) {
					$scope.data = {};
				}
			}, {
				text: 'Save',
				onTap: function(e) {
					if ($scope.data.newName == "" || $scope.data.newName == undefined) {
						e.preventDefault();
					} else {
						eUser.uTodo[index].listName = $scope.data.newName;
						$scope.makeChangeTodoList();
						$scope.data = {};
					}
				}
			}]
		});
	};

	$scope.clickImportantCreate = function() {
		$scope.data.important = ($scope.data.important + 1) % 3;
	};

	$scope.initializeDataCreate = function() {
		if ($scope.semaphore == true) {
			$scope.data.newTitle = "";
			$scope.data.important = 0;
			$scope.data.newDescrip = "";
		}
		$scope.semaphore = false;
	};

	$scope.createTask = function() {
		if ($scope.data.newTitle != "" && $scope.data.newTitle != undefined && $scope.data.newTitle != null) {
			if ($scope.data.newDescrip != "" && $scope.data.newDescrip != undefined && $scope.data.newDescrip != null) {
				eUser.uTodo[$scope.viewList].list.push({
					title: $scope.data.newTitle,
					description: $scope.data.newDescrip,
					important: $scope.data.important,
					done: false,
				});
			} else {
				eUser.uTodo[$scope.viewList].list.push({
					title: $scope.data.newTitle,
					description: null,
					important: $scope.data.important,
					done: false,
				});
			}

			$scope.unreduceUndoneTask(eUser.uTodo[$scope.viewList]);

			$scope.resetCreate();
			$scope.makeChangeTodoList();
		} else {
			$scope.resetCreate();

			eToast.toastError("Title is require!", 3000);
		}
	};

	$scope.createNewChecklist = function() {
		$scope.data.important = 0;
		$scope.data.listName = "";

		var createPopup = $ionicPopup.show({
			template: '<input type="text" style="padding-left: 5px" ng-model="data.listName" placeholder="Checklist name"><br><br><p class="todo-create-popup-important">Important level:</p><div class="todo-create-popup-star" ng-click="clickImportantCreate()"><i class="icon ion-ios-star-outline easi-vip-color todo-create-star-icon"></i><i class="icon ion-ios-star-half easi-vip-color todo-create-star-icon" ng-hide="data.important==0"></i><i class="icon ion-ios-star easi-vip-color todo-create-star-icon" ng-show="data.important==2"></i></div>',
			title: 'Create new Checklist',
			subTitle: 'Fill all informations!',
			scope: $scope,

			buttons: [{
				text: 'Cancel',
				type: 'easi-back-red',
				onTap: function(e) {
					$scope.data = {};
				}
			}, {
				text: 'Save',
				onTap: function(e) {
					if ($scope.data.listName == "") {
						$scope.data.listName = "[No title]";
					}
					$scope.data.list = [{
						title: "[No title]",
						description: "",
						important: 0,
						done: false,
					}];
					$scope.data.done = false;

					eUser.uTodo.push($scope.data);
					$scope.makeChangeTodoList();
					$scope.data = {};
				}
			}]
		});
	};

	$scope.reduceUndoneTask = function(checklist) {
		checklist.undone--;
		if (checklist.undone == 0) {
			checklist.done = true;
		}
	};

	$scope.unreduceUndoneTask = function(checklist) {
		checklist.undone++;
		checklist.done = false;
	};

	$scope.deleteTaskFromChecklist = function(task, checklist) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Are you sure to delete?',
			subTitle: 'This action cannot be undone!',
			cancelType: 'easi-back-red',
		});

		confirmPopup.then(function(res) {
			if (res) {
				checklist.list.splice(checklist.list.indexOf(task), 1);

				if (task.done == false) {
					$scope.reduceUndoneTask(checklist);
				}
				//eUser.uTodo[eUser.uTodo.indexOf(checklist)].list.splice(eUser.uTodo[eUser.uTodo.indexOf(checklist)].list.indexOf(item), 1);
				$scope.makeChangeTodoList();
			} else {
				// cancel
			}
		});
	};

	$scope.deleteTaskFromChecklistWithoutConfirm = function(task, checklist) {
		checklist.list.splice(checklist.list.indexOf(task), 1);

		if (task.done == false) {
			$scope.reduceUndoneTask(checklist);
		}
		//eUser.uTodo[eUser.uTodo.indexOf(checklist)].list.splice(eUser.uTodo[eUser.uTodo.indexOf(checklist)].list.indexOf(item), 1);
		$scope.makeChangeTodoList();
	};

	$scope.checkDoneTask = function(task, checklist) {
		task.done = !task.done;
		if (task.done == true) {
			$scope.reduceUndoneTask(checklist);
		} else {
			$scope.unreduceUndoneTask(checklist);
		}
	};

	$scope.checkImportantTask = function(task, checklist) {
		task.important = (task.important + 1) % 3;
	};

	$scope.editTaskTime = function(task, checklist) {
		eToast.toastInfo('Coming soon...', 3000);
	};

	$scope.editTaskCut = function(task, checklist) {
		var editPopup = $ionicPopup.show({
			templateUrl: 'templates/todo-choose-checklist.html',
			title: 'Move task',
			subTitle: 'Select checklist to move to!',
			scope: $scope,

			buttons: [{
				text: 'Cancel',
				type: 'easi-back-red',
				onTap: function(e) {
					$scope.data = {};
				}
			}, {
				text: 'Save',
				onTap: function(e) {
					eUser.uTodo[parseInt($scope.data.moveTo)].list.push(task);
					$scope.deleteTaskFromChecklistWithoutConfirm(task, checklist);
					if (task.done == false) {
						$scope.reduceUndoneTask(checklist);
						$scope.unreduceUndoneTask(eUser.uTodo[parseInt($scope.data.moveTo)]);
					}
					$scope.makeChangeTodoList();
					eToast.toastSuccess('Move successfully!', 3000);

					$scope.data = {};
				}
			}]
		});
	};

	$scope.editTaskCopy = function(task, checklist) {
		var editPopup = $ionicPopup.show({
			templateUrl: 'templates/todo-choose-checklist.html',
			title: 'Move task',
			subTitle: 'Select checklist to move to!',
			scope: $scope,

			buttons: [{
				text: 'Cancel',
				type: 'easi-back-red',
				onTap: function(e) {
					$scope.data = {};
				}
			}, {
				text: 'Save',
				onTap: function(e) {
					eUser.uTodo[parseInt($scope.data.moveTo)].list.push(angular.copy(task));
					if (task.done == false) {
						$scope.unreduceUndoneTask(eUser.uTodo[parseInt($scope.data.moveTo)]);
					}
					$scope.makeChangeTodoList();
					eToast.toastSuccess('Copy successfully!', 3000);

					$scope.data = {};
				}
			}]
		});
	};

	$scope.editTaskDetail = function(task, checklist) {
		$scope.data.newTitle = task.title;
		$scope.data.newDes = task.description;

		var editPopup = $ionicPopup.show({
			template: '<input type="text" style="padding-left: 5px" ng-model="data.newTitle" placeholder="Enter a new title"><textarea style="padding: 5px; margin-top: 10px; height: 150px;" ng-model="data.newDes" placeholder="Enter a new description"></textarea>',
			title: 'Edit Task detail',
			subTitle: 'English character only!',
			scope: $scope,

			buttons: [{
				text: 'Cancel',
				type: 'easi-back-red',
				onTap: function(e) {
					$scope.data = {};
				}
			}, {
				text: 'Save',
				onTap: function(e) {
					if ($scope.data.newTitle == "" || $scope.data.newTitle == undefined) {
						e.preventDefault();
					} else {
						task.title = $scope.data.newTitle;
						if ($scope.data.newDes == "" || $scope.data.newDes == undefined) {
							task.description = null;
						} else {
							task.description = $scope.data.newDes;
						}
						$scope.makeChangeTodoList();
						$scope.data = {};
					}
				}
			}]
		});
	};

	$scope.moveItem = function(task, fromIndex, toIndex) {
		console.log(task, fromIndex, toIndex);
		eUser.uTodo[$scope.viewList].list.splice(fromIndex, 1);
		eUser.uTodo[$scope.viewList].list.splice(toIndex, 0, task);
	};

	$scope.isShowAttach = function(task) {
		return task.description != null;
	};

	$scope.isShowClock = function(task) {
		return task.description != null;
	};

	$scope.isShowDescription = function(index) {
		if ($scope.isShowDes[index] == true) {
			return true;
		} else {
			return false;
		}
	};

	var activeShow = function(index) {
		$scope.isShowDes = {};
		$scope.isShowDes[index] = true;
	};

	var deactiveShow = function() {
		$scope.isShowDes = {};
	};

	$scope.clickShow = function(index) {
		if ($scope.isShowDescription(index) == true) {
			deactiveShow();
		} else {
			activeShow(index);
		}
	};

	var resetTemp = function() {
		$scope.isShowDes = {};
		$scope.semaphore = true;
		$scope.isCreate = false;
		$scope.shouldShowReorder = false;
		$scope.shouldShowDelete = false;
		$scope.data = {};
	};

	$scope.deleteClick = function() {
		$scope.shouldShowReorder = false;
		$scope.isCreate = false;
		$scope.shouldShowDelete = !$scope.shouldShowDelete;
	};

	$scope.reorderClick = function() {
		$scope.shouldShowDelete = false;
		$scope.isCreate = false;
		$scope.shouldShowReorder = !$scope.shouldShowReorder;
	};

	$scope.createClick = function() {
		$scope.shouldShowDelete = false;
		$scope.shouldShowReorder = false;
		$scope.isCreate = true;
	};

	$scope.resetCreate = function() {
		$scope.isCreate = false;
		$scope.semaphore = true;
		$scope.data = {};
	};

	// main action sheet
	$scope.showMainActionSheet = function() {
		// Show the action sheet
		var mainSheet = $ionicActionSheet.show({
			buttons: [{
				text: '<span class="easi-dark-blue">Create Checklist<span>'
			}, {
				text: '<span class="easi-dark-blue">Update Data</span>'
			}, {
				text: '<span class="easi-dark-blue">Upload to Server</span>'
			}, {
				text: '<span class="easi-red">Delete Tasks</span>'
			}],
			destructiveText: '<span class="easi-red"><b>Close</b><span>',
			titleText: '<h3 class="easi-gray">Main Action</h3>',
			cancelText: '<span class="easi-gray">Cancel<span>',
			cancel: function() {
				// TODO cancel code here
			},
			destructiveButtonClicked: function() {
				$rootScope.goHome();

				return true;
			},
			buttonClicked: function(index) {
				if (index == 0) {
					$scope.createNewChecklist();
				} else if (index == 1) {
					$scope.makeChangeTodoList();
				} else if (index == 2) {
					eDatabase.updateTodo();
				} else {
					$scope.deleteClick();
				}

				return true;
			}
		});
	};

	/**
	 * Important modal
	 */
	$ionicModal.fromTemplateUrl('important-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.importantModal = modal;
	});
	$scope.showImportantModal = function() {
		$scope.importantModal.show();
		$scope.makeChangeTodoList();
		resetTemp();
	};
	$scope.hideImportantModal = function() {
		$scope.importantModal.hide();
		resetTemp();
	};
	//Cleanup the importantModal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.importantModal.remove();
	});
	// Execute action on hide importantModal
	$scope.$on('importantModal.hidden', function() {
		resetTemp();
	});
	// Execute action on remove importantModal
	$scope.$on('importantModal.removed', function() {
		// Execute action
	});

	// important action sheet
	$scope.showImportantActionSheet = function() {
		// Show the action sheet
		var importantSheet = $ionicActionSheet.show({
			buttons: [{
				text: '<span class="easi-dark-blue">Update Data</span>'
			}, {
				text: '<span class="easi-dark-blue">Upload to Server</span>'
			}, {
				text: '<span class="easi-red">Delete Tasks</span>'
			}],
			destructiveText: '<span class="easi-red"><b>Close</b><span>',
			titleText: '<h3 class="easi-gray">Important Tasks</h3>',
			cancelText: '<span class="easi-gray">Cancel<span>',
			cancel: function() {
				// TODO cancel code here
			},
			destructiveButtonClicked: function() {
				$scope.hideImportantModal();

				return true;
			},
			buttonClicked: function(index) {
				if (index == 0) {
					$scope.makeChangeTodoList();
					resetTemp();
				} else if (index == 1) {
					eDatabase.updateTodo();
				} else {
					$scope.deleteClick();
				}

				return true;
			}
		});
	};

	/**
	 * Very Important modal
	 */
	$ionicModal.fromTemplateUrl('very-important-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.veryImportantModal = modal;
	});
	$scope.showVeryImportantModal = function() {
		$scope.veryImportantModal.show();
		$scope.makeChangeTodoList();
		resetTemp();
	};
	$scope.hideVeryImportantModal = function() {
		$scope.veryImportantModal.hide();
		resetTemp();
	};
	//Cleanup the veryImportantModal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.veryImportantModal.remove();
	});
	// Execute action on hide veryImportantModal
	$scope.$on('veryImportantModal.hidden', function() {
		resetTemp();
	});
	// Execute action on remove veryImportantModal
	$scope.$on('veryImportantModal.removed', function() {
		// Execute action
	});

	// very important action sheet
	$scope.showVeryImportantActionSheet = function() {
		// Show the action sheet
		var veryImportantSheet = $ionicActionSheet.show({
			buttons: [{
				text: '<span class="easi-dark-blue">Update Data</span>'
			}, {
				text: '<span class="easi-dark-blue">Upload to Server</span>'
			}, {
				text: '<span class="easi-red">Delete Tasks</span>'
			}],
			destructiveText: '<span class="easi-red"><b>Close</b><span>',
			titleText: '<h3 class="easi-gray">Very Important Tasks</h3>',
			cancelText: '<span class="easi-gray">Cancel<span>',
			cancel: function() {
				// TODO cancel code here
			},
			destructiveButtonClicked: function() {
				$scope.hideVeryImportantModal();

				return true;
			},
			buttonClicked: function(index) {
				if (index == 0) {
					$scope.makeChangeTodoList();
					resetTemp();
				} else if (index == 1) {
					eDatabase.updateTodo();
				} else {
					$scope.deleteClick();
				}

				return true;
			}
		});
	};

	/**
	 * Recently modal
	 */
	$ionicModal.fromTemplateUrl('recently-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.recentlyModal = modal;
	});
	$scope.showRecentlyModal = function() {
		$scope.recentlyModal.show();
		$scope.makeChangeTodoList();
		resetTemp();
	};
	$scope.hideRecentlyModal = function() {
		$scope.recentlyModal.hide();
		resetTemp();
	};
	//Cleanup the recentlyModal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.recentlyModal.remove();
	});
	// Execute action on hide recentlyModal
	$scope.$on('recentlyModal.hidden', function() {
		resetTemp();
	});
	// Execute action on remove recentlyModal
	$scope.$on('recentlyModal.removed', function() {
		// Execute action
	});

	// recently action sheet
	$scope.showRecentlyActionSheet = function() {
		// Show the action sheet
		var recentlySheet = $ionicActionSheet.show({
			buttons: [{
				text: '<span class="easi-dark-blue">Update Data</span>'
			}, {
				text: '<span class="easi-dark-blue">Upload to Server</span>'
			}, {
				text: '<span class="easi-red">Delete Tasks</span>'
			}],
			destructiveText: '<span class="easi-red"><b>Close</b><span>',
			titleText: '<h3 class="easi-gray">Recently Tasks</h3>',
			cancelText: '<span class="easi-gray">Cancel<span>',
			cancel: function() {
				// TODO cancel code here
			},
			destructiveButtonClicked: function() {
				$scope.hideRecentlyModal();

				return true;
			},
			buttonClicked: function(index) {
				if (index == 0) {
					$scope.makeChangeTodoList();
					resetTemp();
				} else if (index == 1) {
					eDatabase.updateTodo();
				} else {
					$scope.deleteClick();
				}

				return true;
			}
		});
	};

	/**
	 * Done list modal
	 */
	$ionicModal.fromTemplateUrl('done-list-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.doneListModal = modal;
	});
	$scope.showDoneListModal = function() {
		$scope.doneListModal.show();
		$scope.makeChangeTodoList();
		resetTemp();
	};
	$scope.hideDoneListModal = function() {
		$scope.doneListModal.hide();
		$scope.makeChangeTodoList();
		resetTemp();
	};
	//Cleanup the doneListModal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.doneListModal.remove();
	});
	// Execute action on hide doneListModal
	$scope.$on('doneListModal.hidden', function() {
		$scope.makeChangeTodoList();
		resetTemp();
	});
	// Execute action on remove doneListModal
	$scope.$on('doneListModal.removed', function() {
		// Execute action
	});

	// done list action sheet
	$scope.showDoneListActionSheet = function() {
		// Show the action sheet
		var doneListSheet = $ionicActionSheet.show({
			buttons: [{
				text: '<span class="easi-dark-blue">Update Data</span>'
			}, {
				text: '<span class="easi-dark-blue">Upload to Server</span>'
			}, {
				text: '<span class="easi-red">Delete</span>'
			}],
			destructiveText: '<span class="easi-red"><b>Close</b><span>',
			titleText: '<h3 class="easi-gray">Done List</h3>',
			cancelText: '<span class="easi-gray">Cancel<span>',
			cancel: function() {
				// TODO cancel code here
			},
			destructiveButtonClicked: function() {
				$scope.hideDoneListModal();

				return true;
			},
			buttonClicked: function(index) {
				if (index == 0) {
					$scope.makeChangeTodoList();
					resetTemp();
				} else if (index == 1) {
					eDatabase.updateTodo();
				} else {
					$scope.deleteClick();
				}

				return true;
			}
		});
	};

	/**
	 * Checklist modal
	 */
	$ionicModal.fromTemplateUrl('checklist-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.checklistModal = modal;
	});
	$scope.showChecklistModal = function(checklist) {
		if (checklist != undefined && $scope.findIndexOf(checklist) != -1) {
			$scope.viewList = $scope.findIndexOf(checklist);
			$scope.checklistModal.show();
			$scope.makeChangeTodoList();
			resetTemp();
		} else {
			eToast.toastError("Error! Please try again later!", 3000);
		}
	};
	$scope.showChecklistModalIndex = function(index) {
		if (index != undefined) {
			$scope.viewList = index;
			$scope.checklistModal.show();
			$scope.makeChangeTodoList();
			resetTemp();
		} else {
			eToast.toastError("Error! Please try again later!", 3000);
		}
	};
	$scope.hideChecklistModal = function() {
		$scope.checklistModal.hide();
		resetTemp();
	};
	//Cleanup the checklistModal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.checklistModal.remove();
	});
	// Execute action on hide checklistModal
	$scope.$on('checklistModal.hidden', function() {
		$scope.makeChangeTodoList();
		$scope.shouldShowDelete = false;
		deactiveShow();
	});
	// Execute action on remove checklistModal
	$scope.$on('checklistModal.removed', function() {
		// Execute action
	});

	// done list action sheet
	$scope.showChecklistActionSheet = function() {
		// Show the action sheet
		var checklistSheet = $ionicActionSheet.show({
			buttons: [{
				text: '<span class="easi-dark-blue">Create Task</span>'
			}, {
				text: '<span class="easi-dark-blue">Update Data</span>'
			}, {
				text: '<span class="easi-dark-blue">Upload to Server</span>'
			}, {
				text: '<span class="easi-dark-blue">Reorder</span>'
			}, {
				text: '<span class="easi-red">Delete</span>'
			}],
			destructiveText: '<span class="easi-red"><b>Close</b><span>',
			titleText: '<h3 class="easi-gray">' + eUser.uTodo[$scope.viewList].listName + '</h3>',
			cancelText: '<span class="easi-gray">Cancel<span>',
			cancel: function() {
				// TODO cancel code here
			},
			destructiveButtonClicked: function() {
				$scope.hideChecklistModal();

				return true;
			},
			buttonClicked: function(index) {
				if (index == 0) {
					$scope.initializeDataCreate();
					$scope.createClick();
				} else if (index == 1) {
					$scope.makeChangeTodoList();
					resetTemp();
				} else if (index == 2) {
					eDatabase.updateTodo();
				} else if (index == 3) {
					$scope.reorderClick();
					$scope.resetCreate();
				} else {
					$scope.deleteClick();
					$scope.resetCreate();
				}

				return true;
			}
		});
	};
})
