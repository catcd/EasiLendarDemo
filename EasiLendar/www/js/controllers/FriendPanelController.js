/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 4/4/2015
 * type: friend panel controller
 */

angular.module('MainApp.controllers.sideMenu.friendPanel', [])

.controller('friendPanelController', function($scope, $rootScope, $location, $ionicScrollDelegate) {
     $scope.searchFriend = '';
     $scope.mShow = false;  
     $scope.fStatus = ["I'm free now", "I'm busy now"];

     $scope.arrID = Object.keys($rootScope.eUser.uFriend);
     console.log($rootScope.eUser.uFriend);
     console.log($scope.arrID);

      var cacheFriend = angular.copy($rootScope.eUser.uFriend);
      var cacheID = angular.copy($scope.arrID);
    
      $scope.deleteFriend = function(id){
          $scope.arrID.splice($scope.arrID.indexOf(id),1);
          //cacheID = angular.copy($scope.arrID);
          cacheFriend = angular.copy($rootScope.eUser.uFriend);
      }

      $scope.appointMeeting = function(id){
          $rootScope.eFriend.fName = $rootScope.eUser.uFriend[id].name;
          //$rootScope.eFriend.fVip = $rootScope.eUser.uFriend[id].vip;
          //$rootScope.goToState('searchFilter');
      }

      $scope.viewProfile = function(id){
          $rootScope.eFriend.fName = $rootScope.eUser.uFriend[id].name;
          $rootScope.eFriend.fAvatar = $rootScope.eUser.uFriend[id].ava;
          //$rootScope.eFriend.fVIP = $rootScope.eUser.uFriend[id].vip;
          $rootScope.getCalendar(id);
          $rootScope.goToState('profile');
      }

      //auto scroll to top of panel
      $scope.gotoTop = function(){
          // set the location.hash to the id of
          // the element you wish to scroll to.
          $location.hash('top');
          $ionicScrollDelegate.anchorScroll(true);
      };

      //check: Did we sort friend list?
      var checkSortAZ = false; 
      var checkSortFB = false;
      //sorting is based on status: free and busy
      var sortFB = function(){
          $rootScope.eUser.uFriend.sort(function(obj1, obj2){
              return (obj1.status - obj2.status);
          });
          //array is sorted by status
          checkSortFB = true;
      }

      //sorting is based on name
      var sortAZ = function(array){
          array.sort(function(obj1, obj2){
                  return $rootScope.eUser.uFriend[obj1].name.localeCompare($rootScope.eUser.uFriend[obj2].name);
          });
          //array is sorted by name
          checkSortAZ = true;
      }
      /*
      //sorting is based on name and status
      var multiSort = function(){
          var k=-1;
          for(var i=0; i<$rootScope.eUser.uFriend.length; i++){
              if($rootScope.eUser.uFriend[i].status == 0){ k++;}
          }
          var freeFriend = $rootScope.eUser.uFriend.slice(0,k+1);
          var busyFriend = $rootScope.eUser.uFriend.slice(k+1,$rootScope.eUser.uFriend.length);
          sortAZ(freeFriend);
          sortAZ(busyFriend);
          $rootScope.eUser.uFriend = freeFriend.concat(busyFriend);
          //array is sorted by name
          checkSortAZ = true;
      }*/
	 
      $scope.sort = function(typeSort){
        if(typeSort == 'AZ') { 
          //only sort by name
          sortAZ($scope.arrID);
          checkSortFB = false;
          /*if(checkSortFB == false){ 
            if(checkSortAZ == false) { sortAZ($rootScope.eUser.uFriend); } 
          }
          //continue sort by name if sorted by status
          else { 
            if(checSortAZ == false) { multiSort(); } 
          }*/
        }
        /*
        if(typeSort == 'FB') { 
          if(checkSortAZ == false) { 
            if(checkSortFB == false) { sortFB(); } 
          }
          //continue sort by status if sorted by name
          else{
            if(checkSortFB == false){ 
                  sortFB(); 
                  multiSort(); 
            }
          }
        }*/
      }

      //refresh list as before sorting
      $scope.refreshList = function(){
          checkSortFB = false;
          checkSortAZ = false;
          $scope.arrID = angular.copy(cacheID);
          $rootScope.eUser.uFriend = angular.copy(cacheFriend);
      }
})
.directive('togglefriend', function($document) {
    return {
        restrict: 'E',
        link: function(scope, element, attr, $index) {
            scope.visible = false;
            scope.toggleFunc = function() {
                scope.visible = !scope.visible;
            };
            $document.bind('click', function(event) {
                var isClickedElement = element.find(event.target).length > 0;
                if (isClickedElement) return;
                scope.visible = false;
                scope.$apply();
            });
        }
    };
})

.directive('slideToggleFriend', function() {
    return {
        restrict: 'A',
        scope: {
            isOpen: "=slideToggleFriend"
        },
        link: function(scope, element, attr) {
            element.hide();
            scope.$watch('isOpen', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    element.stop().slideToggle(200);
                }
            });
        }
    };
})

.directive('opacitySearchInput', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.parent().parent().addClass('search-friend-input-blur');
            element.bind('focus', function() {
                element.parent().parent().removeClass('search-friend-input-blur');
                element.parent().parent().addClass('search-friend-input-focus');
            });
            element.bind('blur', function() {
                element.parent().parent().addClass('search-friend-input-blur');
            });
        }
    };
})

.directive('sortOption', function() {
    return {
        restrict: 'A',
        scope: {
            isVisible: '='
        },
        link: function(scope, element, attr) {
            scope.$watch('isVisible', function() {
                var listFriend = element.parent().parent().next().next().children().children().next().next();
                if (scope.isVisible == true) {
                    listFriend.addClass('blur-list-friend');
                } else {
                    listFriend.removeClass('blur-list-friend');
                }
            });
        }
    };
})

