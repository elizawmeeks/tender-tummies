"use strict";

app.controller("ProfileCtrl", function($scope, ChildFactory, $routeParams, $route, $rootScope){
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
    
});
