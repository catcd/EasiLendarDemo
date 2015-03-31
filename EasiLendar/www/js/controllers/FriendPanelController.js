/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 28/03/2015
 * type: friend panel controller
 */

angular.module('MainApp.controllers.sideMenu.friendPanel', [])

.controller('friendPanelController', function($scope, $rootScope, $location, $ionicScrollDelegate) {
     $scope.searchFriend = '';
     $scope.mShow = false;  
     $scope.fStatus = ["I'm free now", "I'm busy now"];
     $scope.friends = [
                     {image: 1, name:'Ngo Duc Dung', status: 1, vip: 0},
                     {image: 8, name:'Nguyen Thi Luong', status: 0, vip: 0},
                     {image: 1, name:'Can Duy Cat', status: 1, vip: 1},
                     {image: 5, name:'Nguyen Minh Trang', status: 1, vip: 1},
                     {image: 1, name:'Nguyen Manh Duy', status: 0, vip: 0},
                     {image: 6, name:'Taylor Swiff', status: 1, vip: 1},
                     {image: 2, name:'Johnny Depp', status: 1, vip: 1},
                     {image: 7, name:'Katty Perry',status: 1, vip: 1},
                     {image: 0, name:'Barack Obama', status: 1, vip: 1},
                     {image: 2, name:'Justin Timberlake', status: 1, vip: 1},
                     {image: 2, name:'Justin Bieber', status: 0, vip: 0},
                     {image: 6, name:'Emma Stone', status: 0, vip: 1},
                     {image: 8, name:'Meryl Streep',status: 1, vip: 1},
                     {image: 7, name:'Kim Kardashian', status: 0, vip: 1},
                     {image: 1, name:'Cristiano Ronaldo', status: 1, vip: 1},
                     {image: 2, name:'Tom Cruise', status: 1, vip: 1},
                     {image: 2, name:'Brad Pitt', status: 1, vip: 1},
                     {image: 5, name:'Nguyen Ngoc Mai Anh', status: 0, vip: 0},
                     {image: 3, name:'Luu Hieu Minh', status: 0, vip: 0}
                     ];
      var cacheFriend = angular.copy($scope.friends);
    
      $scope.deleteFriend = function(friend){
          $scope.friends.splice($scope.friends.indexOf(friend),1);
          cacheFriend = angular.copy($scope.friends);
      }

      $scope.appointMeeting = function(friend){
          $rootScope.eFriend.fName = $scope.friends[$scope.friends.indexOf(friend)].name;
          //$rootScope.goToState('searchFilter');
      }

      $scope.viewProfile = function(friend){
          $rootScope.eFriend.fName = $scope.friends[$scope.friends.indexOf(friend)].name;
          $rootScope.eFriend.fAvatar = $scope.friends[$scope.friends.indexOf(friend)].image;
          $rootScope.eFriend.fVip = $scope.friends[$scope.friends.indexOf(friend)].vip;
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
          $scope.friends.sort(function(obj1, obj2){
              return (obj1.status - obj2.status);
          });
          //array is sorted by status
          checkSortFB = true;
      }

      var getFirstName = function(name){
          var i = name.length-1;
          while(name.charAt(i) !== ' '){ i--; }
          var pos = i;
          var firstName = name.substring(pos,name.length);
          return firstName;
      }

      //sorting is based on name: first name then last name
      var sortAZ = function(array){
          array.sort(function(obj1, obj2){
              var firstName1 = getFirstName(obj1.name);
              var firstName2 = getFirstName(obj2.name);
              if(firstName1.localeCompare(firstName2) == 0){
                  return obj1.name.localeCompare(obj2.name);
              }
              else { return firstName1.localeCompare(firstName2); }
          });
          //array is sorted by name
          checkSortAZ = true;
      }

      //sorting is based on name and status
      var multiSort = function(){
          var k=-1;
          for(var i=0; i<$scope.friends.length; i++){
              if($scope.friends[i].status == 0){ k++;}
          }
          var freeFriends = $scope.friends.slice(0,k+1);
          var busyFriends = $scope.friends.slice(k+1,$scope.friends.length);
          sortAZ(freeFriends);
          sortAZ(busyFriends);
          $scope.friends = freeFriends.concat(busyFriends);
          //array is sorted by name
          checkSortAZ = true;
      }

      $scope.sort = function(typeSort){
        if(typeSort == 'AZ') { 
          //only sort by name
          sortAZ($scope.friends);
          checkSortFB = false;
          /*if(checkSortFB == false){ 
            if(checkSortAZ == false) { sortAZ($scope.friends); } 
          }
          //continue sort by name if sorted by status
          else { 
            if(checSortAZ == false) { multiSort(); } 
          }*/
        }
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
        }
      }

      //refresh list as before sorting
      $scope.refreshList = function(){
          checkSortFB = false;
          checkSortAZ = false;
          $scope.friends = angular.copy(cacheFriend);
      }
})

.directive('togglefriend', function($document){  
       return {
            restrict: 'E',    
            link: function(scope, element, attr, $index) {
                  scope.visible = false;
                  scope.toggleFunc = function(){
                        scope.visible = !scope.visible;
                  };
                  $document.bind('click',function(event){
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
            scope:{
            isOpen: "=slideToggleFriend"
            },  
            link: function(scope, element, attr) {
                  element.hide();
                  scope.$watch('isOpen', function(newVal,oldVal){
                    if(newVal !== oldVal){ 
                      element.stop().slideToggle(200);
                    }
                });
          }
      };  
})

.directive('opacitySearchInput',function(){
  return{
    restrict: 'A',
    link: function(scope,element,attrs){
      element.parent().parent().addClass('search-friend-input-blur');
      element.bind('focus',function(){
        element.parent().parent().removeClass('search-friend-input-blur');
        element.parent().parent().addClass('search-friend-input-focus');
      });
      element.bind('blur',function(){
        element.parent().parent().addClass('search-friend-input-blur');
      });
    }
  };
})

.directive('sortOption',function(){
  return{
    restrict: 'A',
    scope: {
      isVisible: '='
    },
    link: function(scope,element,attr){
      scope.$watch('isVisible',function(){
          var listFriend = element.parent().parent().next().next().children().children().next().next();
          if(scope.isVisible == true){
            listFriend.addClass('blur-list-friend');
          }
          else { 
            listFriend.removeClass('blur-list-friend');
          }
      });
    }
  };
})

