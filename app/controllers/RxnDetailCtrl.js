"use strict";

app.controller("RxnDetailCtrl", function($scope, $rootScope, RxnFactory, $routeParams, TriggerFactory){

	let childId = $rootScope.currentChildId;
	$scope.rxnId = $routeParams.rxnId;

  $scope.rxn_event = {
  	rxn_id: $scope.rxnId,
  	symptom: [],
  	type: "",
  	description: "",
  	severity: "",
  	date: "",
  	time: ""
  };

  $scope.getRxn = () => {
  	RxnFactory.getRxn($scope.rxnId)
  	.then( response => {
  		$scope.currentRxn = response;
  		if (response.end_date){
  			$scope.rxnOver = true;
  		} else {
  			$scope.rxnOver = false;
  		}
	  	TriggerFactory.getTrigger(response.trigger_id)
	  	.then( response => {
	  		// $scope.trigger = response;
	  		$rootScope.view = response.food + " Reaction";
  		});
  	});
  };

  $scope.addRxnEvent = () => {
  	console.log("$scope.rxn_event", $scope.rxn_event);
  	RxnFactory.addRxnEvent($scope.rxn_event);
  	$scope.getRxnEvents();
  };

  	// Initialization for the date picker
	var currentTime = new Date();
	$scope.currentTime = currentTime;
	$scope.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.disable = [false, 1, 7];
	$scope.today = 'Today';
	$scope.clear = 'Clear';
	$scope.close = 'Close';
	var days = 15;
	$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
	$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
	// $scope.onStart = function () {
	//     console.log('onStart');
	// };
	// $scope.onRender = function () {
	//     console.log('onRender');
	// };
	// $scope.onOpen = function () {
	//     console.log('onOpen');
	// };
	// $scope.onClose = function () {
	//     console.log('onClose');
	// };
	// $scope.onSet = function () {
	//     console.log('onSet');
	// };
	// $scope.onStop = function () {
	//     console.log('onStop');
	// };

	$scope.getRxnEvents = () => {
  	RxnFactory.getRxnEvents($scope.rxnId)
  	.then( response => {
  		// console.log("response", response);
  		$scope.rxnEvents = [];
  		for (let value in response){
  			let dateArray = response[value].date.split("/");
  			console.log("dateArray", dateArray);
  			let mon = dateArray[1];
  			let month = $scope.monthShort[mon-1];
  			let newDate = `${month} ${dateArray[0]}, ${dateArray[2]}`;
  			response[value].date = newDate;
  			$scope.rxnEvents.push(response[value]);
  		}
  		console.log("$scope.rxnEvents", $scope.rxnEvents);
  	});
  };

  $scope.endRxn = () => {
  	RxnFactory.editRxn($scope.rxnId, $scope.currentRxn)
  	.then( response => {
  		console.log("end rxn response", response);
  		loadPage();
  	});
  };

  let loadPage = () => {
	  $scope.getRxn();
	  $scope.getRxnEvents();
  };

  loadPage();

});
