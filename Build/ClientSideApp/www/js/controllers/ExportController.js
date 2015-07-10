/**
 * starter: Can Duy Cat
 * owner: Nguyen Thi Luong
 * last update: 12/05/2015
 * type: export controller
 */

angular.module('MainApp.controllers.export', [])

.controller("ExportController", function($rootScope, $scope, eEasiLendar, eUser, eSettings,$cordovaFile) {
	$scope.file = {name:'',type:'.txt'};
	// create current week
	$scope.weekCalendar = eEasiLendar.newWeekCalendar();
	$scope.weekCalendar.setNavDays();
	console.log($scope.weekCalendar.navDays[3]);
	// watch for changes in eUser.uGmailCalendar 
	$scope.$watch('eUser.uGmailCalendar', function() {
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
	});
	// watch for changes in eSettings.sFirstDay
	$scope.$watch('eSettings.sFirstDay', function() {
		$scope.weekCalendar = eEasiLendar.newWeekCalendar();
		$scope.weekCalendar.setNavDays();
	});
	
	var getCalendar = function(){
		var myCalendar = '';
		//move 2 weeks ago
			$scope.weekCalendar.prevWeek();
			$scope.weekCalendar.prevWeek();
		//check and get calendar for 8 week recently 
			for(var i=0;i<8;i++){
				for(var j=0;j<6;j++){
					var day = $scope.weekCalendar.navDays[j];
					if(day.norEvent!=null|| day.events!=null){
						myCalendar += day.origin.day +'day' + day.origin.date+'th'+'\n';
						if(day.events!= null){
							myCalendar+='\t all day :\t ';
							var events = day.events;
							for(var k=0;k<events.length;k++){
								myCalendar+= events[k].event.origin.summary + '\n';						
							}
						}
						if(day.norEvent!=null){
							myCalendar += '\t normal event: \t';
							var norEvent = day.norEvent;
							for(var k =0; k<norEvent.length;k++){
								myCalendar +=(norEvent[k].event.origin.start.dateTime.getMinutes()<10)?'0':''+ norEvent[k].event.origin.start.dateTime.getMinutes()+( norEvent[k].event.origin.start.dateTime.getHours()>=12)? ' PM':'AM'+'-' + (norEvent[k].event.origin.end.dateTime.getMinutes()<10)?'0':'' + norEvent[k].event.origin.end.dateTime.getMinutes()+( norEvent[k].event.origin.end.dateTime.getHours()>=12)? ' PM':'AM' +norEvent[k].event.origin.summary+'\n';
							}
						}
					}
					
				}
				$scope.weekCalendar.nextWeek();
				}	
	return myCalendar;
	}
	
	$scope.Export = function(){
		var filename = $scope.file.name + $scope.file.type;
		console.log(filename);
		var myCalendar = getCalendar();
		document.addEventListener('deviceready', function () {
			$cordovaFile.createFile(cordova.file.dataDirectory, filename, true)
			.then(function (success) {
				// success
			}, function (error) {
				// error
			});
			 $cordovaFile.writeFile(cordova.file.dataDirectory, filename,myCalendar, true)
			.then(function (success) {
				// success
			}, function (error) {
				// error
			});
		});
	}
});
