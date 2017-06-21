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

	$scope.rxn = {
		start_date: "",
		ingestion: "",
		cid: childId,
		food_type: "",
		trial_id: $scope.trialId
	};

	$scope.safe = {
		food: "",
		cid: childId,
		nutrients: []
	};

	$scope.trigger = {
  	food: "",
  	cid: childId,
  	chronic: [],
  	acute: [],
  	severity: "",
  	nutrients: []
  };

	$scope.isRxn = false;
	$scope.safeAdded = false;
	$scope.triggerAdded = false;

	$scope.getTrial = () => {
		TrialFactory.getTrial($scope.trialId)
		.then( response => {
			$scope.currentTrial = response;
	    	$scope.rxn.food_type = $scope.currentTrial.food;
			$rootScope.view = response.food + " Trial";
		});
	};

	// Adds trial event to firebase
	$scope.addTrialEvent = () => {
		TrialFactory.addTrialEvent( $scope.trial_event)
		.then( response => {
			$scope.getTrialEvents();
		});
	};

	// Adds reaction to firebase
  $scope.addRxn = () => {
    RxnFactory.addRxn($scope.rxn)
    .then( response => {
      $scope.getRxnsByTrial();
    });
  };

  // Ends trial
  $scope.endTrial = () => {
  	TrialFactory.editTrial($scope.trialId, $scope.currentTrial)
  	.then( response => {
  		loadPage();
  	});
  };

  // Edit trial event
  $scope.editTrialEvent = (eventId, eventObj) => {
  	TrialFactory.editTrialEvent(eventId, eventObj)
  	.then( response => {
  		$scope.getTrialEvents();
  	});
  };

  // Gets trial events to load to the page.
	$scope.getTrialEvents = () => {
		TrialFactory.getTrialEvents($scope.trialId)
		.then( response => {
			$scope.trialEvents = response;
		});
	};

	// Gets trial event to populate edit modal
	$scope.getTrialEvent = (eventId) => {
		TrialFactory.getTrialEvent(eventId)
		.then( response => {
			$scope.currentEvent = response;
		});
	};

	// Get any logged reactions to display on the page.
	$scope.getRxnsByTrial = () => {
		RxnFactory.getRxnsByTrial($scope.trialId)
		.then( response => {
			$scope.rxnFood = response;
			if ($scope.rxnFood.length > 0){
				$scope.isRxn = true;
			}
			console.log("$scope.rxnFood", $scope.rxnFood);
		});
	};

	// Delete Trial Events
	$scope.deleteTrialEvent = (eventId) => {
		TrialFactory.deleteTrialEvent(eventId)
		.then( response => {
			$scope.getTrialEvents();
		});
	};

	// Add Trial food to safe list
	$scope.addSafe = () => {
		SafeFactory.addSafe($scope.safe)
		.then( response => {
			$scope.safeAdded = true;
		});
	};

	// Add trial food to trigger list
	$scope.addTrigger = () => {
		let p1 = TriggerFactory.addTrigger($scope.trigger),
				p2 = RxnFactory.getRxnsByTrial($scope.trialId);

		Promise.all([p1, p2])
		.then( values => {
			$scope.triggerAdded = true;
			console.log("values[0]", values[0]);
			let id = values[0].data.name;
			console.log("id", id);
			values[1][0].trigger_id = id;
			console.log("values[1][0]", values[1][0]);
			RxnFactory.editRxn(values[1][0].id, values[1][0]);
		});
	};

	let loadPage = () => {
		$scope.getTrialEvents();
		$scope.getTrial();
		$scope.getRxnsByTrial();
	};
   
	loadPage();

});
