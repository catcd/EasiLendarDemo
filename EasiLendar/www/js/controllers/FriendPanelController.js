/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 14/03/2015
 * type: friend panel controller
 */

angular.module('MainApp.controllers.sideMenu.friendPanel', [])

.controller('friendPanelController', function($scope, $rootScope, $ionicPopup) {
     $scope.searchFriend = '';
     $scope.mShow = false;	
     $scope.friends = [
                         {image:"img/ava0.png", name:'Ngo Duc Dung', status: "I'm busy now", vip: true},
                         {image:"img/ava6.png", name:'Nguyen Thi Luong', status: "I'm free now", vip: false},
                         {image:"img/ava0.png", name:'Can Duy Cat', status: "I'm busy now", vip: true},
                         {image:"img/ava1.png", name:'Nguyen Manh Duy', status: "I'm free now", vip: false},
                         {image:"img/ava5.png", name:'Nguyen Minh Trang', status: "I'm busy now", vip:true},
                         {image:"img/ava0.png", name:'Ngo Duc Dung', status: "I'm busy now", vip: true},
                         {image:"img/ava7.png", name:'Nguyen Thi Luong', status: "I'm free now", vip: false},
                         {image:"img/ava1.png", name:'Can Duy Cat', status: "I'm busy now", vip: true},
                         {image:"img/ava2.png", name:'Nguyen Manh Duy', status: "I'm free now", vip: false},
                         {image:"img/ava6.png", name:'Nguyen Minh Trang', status: "I'm busy now", vip:true},
                         {image:"img/ava1.png", name:'Ngo Duc Dung', status: "I'm busy now", vip: true},
                         {image:"img/ava7.png", name:'Nguyen Thi Luong', status: "I'm free now", vip: false},
                         {image:"img/ava0.png", name:'Can Duy Cat', status: "I'm busy now", vip: true},
                         {image:"img/ava0.png", name:'Nguyen Manh Duy', status: "I'm free now", vip: false},
                         {image:"img/ava7.png", name:'Nguyen Minh Trang', status: "I'm busy now", vip:true}
       		];

      $scope.deleteFriend = function(friend){
      		$scope.friends.splice($scope.friends.indexOf(friend),1);
      }

      $scope.viewProfile = function(friend){
         $rootScope.eFriend.fName = $scope.friends[$scope.friends.indexOf(friend)].name;
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

