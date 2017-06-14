"use strict";

app.controller("ChooseCtrl", function($scope, ChildFactory, $rootScope){

	$scope.newChild = {
		name: "",
		age: "",
		wtNumber: "",
		wtUnit: "",
		gender: "",
	};

	$rootScope.currentChild = null;
	$rootScope.isChild = false;
	$rootScope.currentChildId = "";
	$rootScope.view = "Tender Tummies";

	$scope.openModal = () => {
		console.log("modal opened");
		$("input.data-list-input").focus();
	};

	$("#addChildModal").on(".open", function(){
		$("input.data-list-input").focus();
	});

	// $('select.data-list-input').focus(function() {
	// 	$('input.data-list-input').focus();
	// });
 //  //when selecting from the select box, put the value in the input box
	// $('select.data-list-input').change(function() {
	// 	$('input.data-list-input').val($(this).val());
	// });
 //  //When editing the input box, reset the select box setting to "free
 //  //form input". This is important to do so that you can reselect the
 //  //option you had selected if you want to.
	// $('input.data-list-input').change(function() {
	// 	$('select.data-list-input').val('');
	// });

	$scope.addChild = () => {
		ChildFactory.addChild( $scope.newChild )
		.then( stuff => {
			$scope.getChildren();
		});
		console.log("ChildObj $scope.child", $scope.newChild);
	};

	$scope.getChildren = () => {
		ChildFactory.getChildren()
		.then( childrenObj => {
			console.log("childrenObj", childrenObj);
			$scope.children = childrenObj;
		});
	};

	$scope.getChildren();
    
});
