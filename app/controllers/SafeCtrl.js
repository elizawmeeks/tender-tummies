"use strict";

app.controller("SafeCtrl", function($scope, SafeFactory, $rootScope){

	let childId = $rootScope.currentChildId;

	console.log("childId", childId);

	$scope.safe = {
		food: "",
		cid: childId,
		nutrients: ""
	};

	$scope.addSafe = () => {
		console.log("addSafe clicked");
		// SafeFactory.addSafe();
	};
    
});
