"use strict";

app.controller("TriggerCtrl", function($scope, $rootScope, TriggerFactory, RxnFactory){

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
  	TriggerFactory.addTrigger( $scope.trigger )
  	.then ( response => {
  		$scope.getTriggers();
  	});
  };

  // Pulls all triggers and sets them as $scope.triggerList
  $scope.getTriggers = () => {
  	TriggerFactory.getTriggers(childId)
  	.then( response => {
  		$scope.triggerList = response;
      console.log("$scope.triggerList",$scope.triggerList);
  	});
  };

  // Pulls one trigger and sets them as $scope.currentTrigger to display trigger details in a modal.
  $scope.getTrigger = (triggerId) => {
  	let p1 = TriggerFactory.getTrigger(triggerId),
        p2 = RxnFactory.getRxnsByTrigger(triggerId);
    Promise.all([p1,p2])
    .then( values => {
  		$scope.currentTrigger = values[0];
      $scope.rxnArray = [];
      for (let thing in values[1]){
        $scope.rxnArray.push(values[1][thing]);
      }     
      console.log("rxn Array, triggersCtrl", $scope.rxnArray);
    });
  };

  $scope.removeOverlay = () => {
    $(".modal-overlay").remove();
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
