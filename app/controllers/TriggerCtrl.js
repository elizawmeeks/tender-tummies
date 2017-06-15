"use strict";

app.controller("TriggerCtrl", function($scope, $rootScope, TriggerFactory){

	// Sets current child id into an easier to use, local, variable.
	let childId = $rootScope.currentChildId;

	$rootScope.view = "Triggers";

  $scope.trigger = {
  	food: "",
  	cid: childId,
  	chronic: [],
  	acute: [],
  	severity: "",
  	nutrition: ""
  };

  // Add trigger from the trigger modal
  $scope.addTrigger = () => {
  	console.log("$scope.trigger", $scope.trigger);
  	TriggerFactory.addTrigger( $scope.trigger )
  	.then ( response => {
  		$scope.getTriggers();
  	});
  };

  // Pulls all triggers and sets them as $scope.triggerList
  $scope.getTriggers = () => {
  	TriggerFactory.getTriggers(childId)
  	.then( response => {
  		console.log(response);
  		$scope.triggerList = response;
  	});
  };

  // Pulls one triggers and sets them as $scope.currentTrigger
  $scope.getTrigger = (triggerId) => {
  	TriggerFactory.getTrigger(triggerId)
  	.then( response => {
  		$scope.currentTrigger = response;
  	});
  };

  // Edits trigger object from the modal window
  $scope.editTrigger = (triggerId, triggerObj) => {
  	TriggerFactory.editTrigger(triggerId, triggerObj)
  	.then( response => {
  		$scope.getTriggers();
  	});
  };

  // Deletes trigger. GROW OUT OF THAT FPIES, BABY!
	$scope.deleteTrigger = (triggerId) => {
		TriggerFactory.deleteTrigger(triggerId)
		.then( () => {
			$scope.getTriggers();
		});
	};

  $scope.getTriggers();

});
