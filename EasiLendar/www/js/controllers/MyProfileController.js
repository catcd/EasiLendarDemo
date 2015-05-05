/**
 * starter: Can Duy Cat
 * owner: Can Duy Cat
 * last update: 05/05/2015
 * type: my profile controller
 */

angular.module('MainApp.controllers.myProfile', [])

.controller("MyProfileController", function($scope, $rootScope, $ionicSlideBoxDelegate, $ionicPopup, eUser, eDatabase, eToast) {
    // inject service
    $scope.eUser = eUser;
    $scope.eToast = eToast;
    $scope.eDatabase = eDatabase;

    $scope.data = {};
    $scope.active = 0;

    $scope.rightButton = {};
    $scope.rightButton[false] = {
        icon: "ion-ios-gear-outline"
    };
    $scope.rightButton[true] = {
        icon: "ion-android-done"
    };

    $scope.leftButton = {};
    $scope.leftButton[false] = {
        icon: "ion-ios-arrow-left"
    };
    $scope.leftButton[true] = {
        icon: "ion-android-close"
    };

    $scope.tempUserData = angular.copy(eUser);

    // initialize var
    $scope.isEditing = false;

    // function
    $rootScope.$on('$stateChangeStart', function(event, toState, fromState) {
        if (toState.name == 'myProfile') {
            resetData();
        }
    });

    var resetData = function() {
        $scope.data = {};
        $scope.active = 0;
        $scope.tempUserData = angular.copy(eUser);
        $scope.isEditing = false;
    };

    $scope.rightFunction = function() {
        if ($scope.isEditing) {
            $scope.done();
        } else {
            $scope.setting();
        }
    };

    $scope.leftFunction = function() {
        if ($scope.isEditing) {
            $scope.cancel();
        } else {
            $rootScope.goHome();
        }
    };

    $scope.setting = function() {
        eToast.toastInfoOne("Coming soon...", 3000);
    };

    $scope.capture = function() {
        eToast.toastInfoOne("Coming soon...", 3000);
    };

    $scope.edit = function() {
        $scope.tempUserData = angular.copy(eUser);
        $scope.isEditing = true;
    };

    $scope.done = function() {
        $scope.isEditing = false;
        eDatabase.updateProfile();
    };

    $scope.cancel = function() {
        eUser.uName = $scope.tempUserData.uName;
        eUser.uAvatar = $scope.tempUserData.uAvatar;
        eUser.uEmail = $scope.tempUserData.uEmail;
        eUser.uGender = $scope.tempUserData.uGender;
        eUser.uBirthday = $scope.tempUserData.uBirthday;
        eUser.uPhone = $scope.tempUserData.uPhone;
        eUser.uAddress = $scope.tempUserData.uAddress;

        $scope.isEditing = false;
    };

    $scope.nextLeftAva = function() {
        if ($scope.isEditing) {
            eUser.uAvatar = ((parseInt(eUser.uAvatar) + 8) % 9).toString();
        }
    };

    $scope.nextRightAva = function() {
        if ($scope.isEditing) {
            eUser.uAvatar = ((parseInt(eUser.uAvatar) + 1) % 9).toString();
        }
    };

    $scope.accountType = function() {
        if (eUser.uVIP) {
            return {
                type: "VIP",
                show: true,
            };
        } else {
            return {
                type: "Normal",
                show: false,
            };
        }
    };

    $scope.delFriend = function(id, name) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Are you sure?',
            subTitle: 'Are you sure to unfriend ' + name + '?'
        });
        confirmPopup.then(function(res) {
            if (res) {
                eDatabase.deleteF(id);
            } else {
                console.log('You are not sure');
            }
        });
    };

    $scope.activeTab = function(index) {
        $ionicSlideBoxDelegate.slide(index, 500);
    };

    $scope.slideHasChanged = function(index) {
        $scope.active = index;
        var elem = document.getElementById("tab-" + index);
        var element = angular.element(elem);
        element.prop('checked', true);
    };
})
