"use strict";

app.controller("SafeCtrl", function($scope, SafeFactory, $rootScope){

	let childId = $rootScope.currentChildId;

	console.log("childId", childId);

	$scope.safe = {
		food: "",
		cid: childId,
		nutrients: ""
	};

	SafeFactory.getSafes(childId)
	.then( response => {
		console.log("response", response);
		$scope.safeList = response;
		let nutrition = [];
		response.forEach( key => {

		});
	});

	$scope.addSafe = () => {
		SafeFactory.addSafe($scope.safe)
		.then( response => {
			console.log("response", response);
		});
	};
    
});
