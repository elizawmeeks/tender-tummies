"use strict";

app.controller("RxnDetailCtrl", function($scope, $rootScope, RxnFactory, $routeParams, TriggerFactory){

	let childId = $rootScope.currentChildId;
	$scope.rxnId = $routeParams.rxnId;
  $rootScope.view = "Trial Detail";

  $scope.rxn_event = {
  	rxn_id: $scope.rxnId,
  	symptom: [],
  	type: "",
  	description: "",
  	severity: "",
  	date: "",
  	time: ""
  };

  // Gets the current reaction to set the view, and put reaction details at the top.
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
	  		$scope.food = response.food;
	  		$rootScope.view = response.food + " Reaction";
  		});
  	});
  };

  $scope.addRxnEvent = () => {
  	RxnFactory.addRxnEvent($scope.rxn_event)
    .then( response => {
      $scope.getRxnEvents();
    });
  	
  };

  $scope.getRxnEvent = (eventId) => {
    RxnFactory.getRxnEvent(eventId)
    .then( response => {
      $scope.currentEvent = response;
    });
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

  $scope.editRxnEvent = ( eventId, eventObj ) => {
    RxnFactory.editRxnEvent( eventId, eventObj )
    .then( () => {
      $scope.getRxnEvents();
    });

  };

  // Deletes rxn objects from firebase
  $scope.deleteRxnEvent = (eventId) => {
    RxnFactory.deleteRxnEvent(eventId)
    .then( response => {
      $scope.getRxnEvents();
    });
  };

	$scope.getRxnEvents = () => {
  	RxnFactory.getRxnEvents($scope.rxnId)
  	.then( response => {
  		$scope.rxnEvents = response;
  	});
  };

  $scope.endRxn = () => {
  	RxnFactory.editRxn($scope.rxnId, $scope.currentRxn)
  	.then( response => {
  		loadPage();
  	});
  };

  let loadPage = () => {
	  $scope.getRxn();
	  $scope.getRxnEvents();
  };

  loadPage();

});
