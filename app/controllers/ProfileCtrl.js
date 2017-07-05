"use strict";

app.controller("ProfileCtrl", function($scope, ChildFactory, $routeParams, $route, $rootScope, TriggerFactory, SafeFactory){
	// Establish the routeId, which is the id of the child.
	$scope.routeId = $routeParams.profileId;

	// Child object, allows user to edit the profile.
	$scope.child = {
		name: "",
		age: "",
		wtNumber: "",
		wtUnit: "",
		gender: "",
	};

	// Gets the child's information to dipslay it on the page.
	ChildFactory.getChild($scope.routeId)
	.then( childObj => {
		$scope.child = childObj;
		$rootScope.currentChild = $scope.child.name;
		$rootScope.isChild = true;
		$rootScope.currentChildId = $scope.child.id;
		$rootScope.view = "Profile";
	});

	// editChild allows the user to edit the child's profile.
	$scope.editChild = () => {
		ChildFactory.editChild ( $scope.routeId, $scope.child );
	};

	// deleteChild allows the user to delete a child's profile
	$scope.deleteChild = () => {
		ChildFactory.deleteChild($scope.routeId)
		.then( response => {
			$route.reload();
		});
	};

	// Get safes and saves the number of safes forthe profiles view.
	SafeFactory.getSafes($scope.routeId)
	.then( response => {
		let safeArray = [];
		// Putting all of the nutrition arrays into one, nested array. Nutrition stuff has been shelved for the moment but there's still some parts of it in the code.
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
