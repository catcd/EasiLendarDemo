/**
 * starter: Can Duy Cat
 * owner: Ngo Duc Dung
 * last update: 11/03/2015
 * type: home controller
 */

angular.module('MainApp.controllers.home', [])

.controller("HomeController", function($scope) {

})

.directive('radioCalendar', function(){
	return{
		restrict: 'A',
		link: function(scope,element,attr){
			//if(element.attr('name') !== 'month') { element.parent().addClass('different-month-color'); }

			var labelRadio = element.next();
			labelRadio.bind('mousedown',function(){
				if(element.prop("checked") == true){
		 			labelRadio.bind('mouseup',function(){
		 				setTimeout(function(){
		 					element.prop('checked',false);
		 					element.parent().removeClass('radio-month-selected');
		 				},5);
		 				
		 			});
		 			var modelName = element.attr("data-ng-model");
		 		}
		 		else{
		 			labelRadio.bind('mouseup',function(){
		 				setTimeout(function(){
		 					element.prop('checked',true);
		 					element.parent().addClass('radio-month-selected');
		 				},5);
		 			});
		 		}	   
			});
			
			element.bind('focus',function(){
					element.parent().addClass('radio-month-selected');
			});
			element.bind('blur',function(){
				element.parent().removeClass('radio-month-selected');
			});
		}
	};
})
