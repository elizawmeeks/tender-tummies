"use strict";

app.controller("TrialCtrl", function($scope, $rootScope, TrialFactory){

	// Sets current child id into an easier to use, local, variable.
	let childId = $rootScope.currentChildId;

	$rootScope.view = "Trials";

	$scope.newTrial = {
		food: "",
		start_date: "",
		cid: childId
	};

	$scope.addTrial = () => {
		TrialFactory.addTrial($scope.newTrial)
		.then( response => {
			$scope.getTrials();
		});
	};

	// Get trials to populate the page
	$scope.getTrials = () => {
		TrialFactory.getTrials(childId)
		.then( response => {
			$scope.trials = response;
		});
	};

	// Get one trial to populate the edit and delete modals.
	$scope.getTrial = (trialId) => {
		TrialFactory.getTrial(trialId)
		.then( response => {
			$scope.currentTrial = response;
		});
	};

	// Edit trial
	$scope.editTrial = (trialId, trialObj) => {
		TrialFactory.editTrial(trialId, trialObj)
		.then( response => {
			$scope.getTrials();
		});
	};

	// Delete trial
	$scope.deleteTrial = (trialId) => {
		TrialFactory.deleteTrial(trialId)
		.then (response => {
			$scope.getTrials();
		});
	};

	$scope.getTrials();
    
});
