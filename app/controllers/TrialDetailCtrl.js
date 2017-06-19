"use strict";

app.controller("TrialDetailCtrl", function($scope, $rootScope, RxnFactory, TrialFactory, TriggerFactory, SafeFactory, $routeParams){

	let childId = $rootScope.currentChildId;
	$scope.trialId = $routeParams.trialId;

	$scope.trial_event = {
		trial_id: $scope.trialId,
		quantity: "",
		food_type: "",
		description: "",
		time: "",
		date: ""
	};

	$scope.getTrial = () => {
		TrialFactory.getTrial($scope.trialId)
		.then( response => {
			$scope.currentTrial = response;
			$rootScope.view = response.food + " Trial";
			console.log("$scope.currentTrial", $scope.currentTrial);
		});
	};

	$scope.addTrialEvent = () => {
		console.log("$scope.trial_event", $scope.trial_event);
	};

	$scope.getTrial();
    
});
