"use strict";

app.controller("RxnCtrl", function($scope, $rootScope, TriggerFactory, RxnFactory){

	// Sets current child id into an easier to use, local, variable.
	let childId = $rootScope.currentChildId;

	$rootScope.view = "Reactions";

	$scope.rxn = {
		start_date: "",
		ingestion: "",
		cid: childId,
		food_type: ""
	};

	// Pulls all Rxns and sets them as $scope.RxnFoods, an array for dispaly in the reaction view.
  $scope.getRxns = () => {
  	RxnFactory.getRxns(childId)
  	.then( response => {
  		$scope.RxnFoods = [];
  		let getTrigger = (triggerId, rxnObj) => {
  			TriggerFactory.getTrigger(triggerId)
  			.then( trigger => {
  				rxnObj.food = trigger.food;
  				$scope.RxnFoods.push(rxnObj);
  			});
  		};
  		for (let value in response){
  			getTrigger(response[value].trigger_id, response[value]);
  		}
  	});
  };

  // Pulls one rxn and sets it as $scope.currentRxn for editing and deleting.
  $scope.getRxn = (rxnId) => {
  	RxnFactory.getRxn(rxnId)
  	.then( response => {
  		$scope.currentRxn = response;
  	});
  };

  // Adds reaction to firebase
  $scope.addRxn = () => {
  	RxnFactory.addRxn($scope.rxn)
  	.then( response => {
  		$scope.getRxns();
  	});
  };

  // Pulls all Triggers and sets them as $scope.triggerList to populate the dropdown in the modals. You need this here. Don't change it.
  $scope.getTriggers = () => {
  	TriggerFactory.getTriggers(childId)
  	.then( response => {
  		$scope.triggerList = response;
  	});
  };

  // Edits rxn object from the modal window
  $scope.editRxn = (rxnId, rxnObj) => {
  	RxnFactory.editRxn(rxnId, rxnObj)
  	.then( response => {
  		$scope.getRxns();
  	});
  };

  // Deletes rxn objects from firebase
  $scope.deleteRxn = (rxnId) => {
  	RxnFactory.deleteRxn(rxnId)
  	.then( response => {
  		$scope.getRxns();
  	});
  };

  $scope.getRxns();
  $scope.getTriggers();

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
    
});
