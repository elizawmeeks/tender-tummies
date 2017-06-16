"use strict";

app.controller("ProfileCtrl", function($scope, ChildFactory, $routeParams, $route, $rootScope, TriggerFactory, SafeFactory){
	// Establish the 
	$scope.routeId = $routeParams.profileId;

	$scope.child = {
		name: "",
		age: "",
		wtNumber: "",
		wtUnit: "",
		gender: "",
	};

	ChildFactory.getChild($scope.routeId)
	.then( childObj => {
		$scope.child = childObj;
		$rootScope.currentChild = $scope.child.name;
		$rootScope.isChild = true;
		$rootScope.currentChildId = $scope.child.id;
		$rootScope.view = "Profile";
	});

	$scope.editChild = () => {
		ChildFactory.editChild ( $scope.routeId, $scope.child );
	};

	$scope.deleteChild = () => {
		ChildFactory.deleteChild($scope.routeId)
		.then( response => {
			$route.reload();
		});
	};

	// Get safes and saves teh number of safes forthe profiles view.
	SafeFactory.getSafes($scope.routeId)
	.then( response => {
		let safeArray = [];
		// Putting all of the nutrition arrays into one, nested array.
		for (let element in response){
			safeArray.push(response[element]);
		}
		$scope.numSafes = safeArray.length;
		});

	// Get triggers and saves the number of triggers for the profiles view.
	TriggerFactory.getTriggers($scope.routeId)
  	.then( response => {
  		let triggerArray = [];
  		for (let element in response){
				triggerArray.push(response[element]);
			}
  		$scope.numTriggers = triggerArray.length;
  	});
    
});
