"use strict";

app.controller("SafeCtrl", function($scope, SafeFactory, $rootScope){
	// Sets current child id into an easier to use, local, variable.
	let childId = $rootScope.currentChildId;

	// Sets nav title
	$rootScope.view = "Safes";

	// Structure of the safe food object, used in both adding and editing safes.
	$scope.safe = {
		food: "",
		cid: childId,
		nutrients: ""
	};

	// Get safes, loads page.
	$scope.getSafes = () => {
		SafeFactory.getSafes(childId)
		.then( response => {
			$scope.safeList = response;
			let nutritionArray = [];
			// Putting all of the nutrition arrays into one, nested array.
			for (let element in response){
				nutritionArray.push(response[element].nutrients);
			}
			// Making the nested nutrition array flat.
			let flattened = nutritionArray.reduce( (a, b) => {
				return a.concat(b);
			});
			// Getting rid of duplicate nutrients in nutrition array. I can now use $scope.reduced to populate my select menu.
			$scope.reduced = Array.from(new Set (flattened));
			
		});
	};

	// Adds a safe to the child's profile.
	$scope.addSafe = () => {
		SafeFactory.addSafe($scope.safe)
		.then( response => {
			$scope.getSafes();
		});
	};

	// Edits safe
	$scope.editSafe = (editId, editObj) => {
		SafeFactory.editSafe(editId, editObj)
		.then( response => {
			$scope.getSafes();
		});
	};

	// Gets one safe to populate the edit safe modal.
	$scope.getSafe = (safeId, safeObj) => {
    SafeFactory.getSafe(safeId)
    .then( response => {
    	$scope.currentSafe = response;
    });
	};

	// Deletes safe. Hopefully it's because the user made a mistake, not because the kid lost a safe food. :(
	$scope.deleteSafe = (safeId) => {
		SafeFactory.deleteSafe(safeId)
		.then( () => {
			$scope.getSafes();
		});
	};

	// Run get safes initially to load the page.
	$scope.getSafes();
});
