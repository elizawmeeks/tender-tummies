"use strict";

app.controller("RxnDetailCtrl", function($scope, $rootScope, RxnFactory, $routeParams, TriggerFactory){

  // Sets current child id into an easier to use, local, variable.
	let childId = $rootScope.currentChildId;
	
  // Sets rxnId so it's easy to get locally.
  $scope.rxnId = $routeParams.rxnId;

  // Sets title in navbar to correlate to current page
  $rootScope.view = "Trial Detail";

  // Rxn Event object to create and edit rxn events.
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

  // Adds rxn event to the database, then runs getRxnEvents so that we can see the added rxnEvent as well as the other ones.
  $scope.addRxnEvent = () => {
  	RxnFactory.addRxnEvent($scope.rxn_event)
    .then( response => {
      $scope.getRxnEvents();
    });
  	
  };

  // Gets a single rxn event so that each event can be edited and deleted.
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

  // Allows the user to edit rxn events.
  $scope.editRxnEvent = ( eventId, eventObj ) => {
    RxnFactory.editRxnEvent( eventId, eventObj )
    .then( () => {
      $scope.getRxnEvents();
    });

  };

  // Deletes rxn event objects from firebase then runs getRxnEvents to re-load the page without the deleted information.
  $scope.deleteRxnEvent = (eventId) => {
    RxnFactory.deleteRxnEvent(eventId)
    .then( response => {
      $scope.getRxnEvents();
    });
  };

  // getRxnEvents grabs all the rxn events and sets them as $scope.rxnEvents to display on the page.
	$scope.getRxnEvents = () => {
  	RxnFactory.getRxnEvents($scope.rxnId)
  	.then( response => {
  		$scope.rxnEvents = response;
  	});
  };

  // Ends the rxn and updates the rxnEvent object 
  $scope.endRxn = () => {
  	RxnFactory.editRxn($scope.rxnId, $scope.currentRxn)
  	.then( response => {
  		loadPage();
  	});
  };

  // Runs all fo the functions needed to load the page
  let loadPage = () => {
	  $scope.getRxn();
	  $scope.getRxnEvents();
  };

  loadPage();

});
