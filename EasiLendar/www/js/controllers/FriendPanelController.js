/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 08/03/2015
 * type: friend panel controller
 */

angular.module('MainApp.controllers.sideMenu.friendPanel', [])

.controller('friendPanelController', function($scope, $ionicPopup) {
     $scope.searchFriend = '';
     $scope.mShow = false;	
     $scope.friends = [
                         {image:"img/boy3.png", name:'Ngo Duc Dung', status: "I'm busy now", vip: true},
                         {image:"img/girl3.png", name:'Nguyen Thi Luong', status: "I'm free now", vip: false},
                         {image:"img/boy3.png", name:'Can Duy Cat', status: "I'm busy now", vip: true},
                         {image:"img/boy3.png", name:'Nguyen Manh Duy', status: "I'm free now", vip: false},
                         {image:"img/girl3.png", name:'Nguyen Minh Trang', status: "I'm busy now", vip:true},
                         {image:"img/boy3.png", name:'Ngo Duc Dung', status: "I'm busy now", vip: true},
                         {image:"img/girl3.png", name:'Nguyen Thi Luong', status: "I'm free now", vip: false},
                         {image:"img/boy3.png", name:'Can Duy Cat', status: "I'm busy now", vip: true},
                         {image:"img/boy3.png", name:'Nguyen Manh Duy', status: "I'm free now", vip: false},
                         {image:"img/girl3.png", name:'Nguyen Minh Trang', status: "I'm busy now", vip:true},
                         {image:"img/boy3.png", name:'Ngo Duc Dung', status: "I'm busy now", vip: true},
                         {image:"img/girl3.png", name:'Nguyen Thi Luong', status: "I'm free now", vip: false},
                         {image:"img/boy3.png", name:'Can Duy Cat', status: "I'm busy now", vip: true},
                         {image:"img/boy3.png", name:'Nguyen Manh Duy', status: "I'm free now", vip: false},
                         {image:"img/girl3.png", name:'Nguyen Minh Trang', status: "I'm busy now", vip:true}
       			];

      $scope.deleteFriend = function(friend){
      		$scope.friends.splice($scope.friends.indexOf(friend),1);
      }
})

.directive('togglefriend', function($document){  
       return {
            restrict: 'E',    
            link: function(scope, element, attr, $index) {
                  scope.visible = false;
                  scope.toggleFunc = function(){
                         scope.visible = !scope.visible;
                         currentIndex = element.scope().$index;
                  };
                  $document.bind('click',function(event){
                        if(element.scope().$index !== currentIndex && element.scope().visible == true){
                               element.scope().$apply(function(){
                                    element.scope().visible = false;
                              });
                        }   
                        if(event.target.nodeName !== 'H2' && event.target.nodeName !== 'P' 
                           && event.target.nodeName !== 'IMG' && event.target.nodeName !== 'I')
                        {
                              scope.$apply(function(){
                                    scope.visible = false;
                              });
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