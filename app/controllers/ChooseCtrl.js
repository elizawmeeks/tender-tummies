"use strict";

app.controller("ChooseCtrl", function($scope, ChildFactory, $rootScope, UserFactory){
	// Sets user
	let user = UserFactory.getUser();

	// Object to create a new child's profile
	$scope.newChild = {
		name: "",
		age: "",
		wtNumber: "",
		wtUnit: "",
		gender: "",
		uid: user
	};

	// $rootScope is used to affect the display in the navbar throughout the app.
		// currentChild will allow us to track and display the data for the selected child throughout the app.
	$rootScope.currentChild = null;
		// isChild true/false changes the display of the navbar. If a child is selected Triggers, Safes, Rxns, and Trials will display in the nav.
	$rootScope.isChild = false;
		// currentChildId is the firebase ID assigned to each child object, allows us to track data in firebase.
	$rootScope.currentChildId = "";
		// view is the title displayed in the navbar on each page 
	$rootScope.view = "Tender Tummies";

	// Add child allows you to add a new child's profile
	$scope.addChild = () => {
		ChildFactory.addChild( $scope.newChild )
		.then( stuff => {
			$scope.getChildren();
		});
	};

	// getChildren pulls all of the children associated with this user and displays each child's name.
	$scope.getChildren = () => {
		ChildFactory.getChildren(user)
		.then( childrenObj => {
			$scope.children = childrenObj;
		});
	};

	// We must run getChildren in order to see the children dispalyed on the page.
	$scope.getChildren();

	// Stuff for Input area for genders, get back to later
	// $("#addChildModal").on("click.open", function(){
	// 	console.log('modal opened');
	// 	// console.log($("input.data-list-input"));
	// 	$("input.data-list-input").focus();
	// });

	// // $('select.data-list-input').focus(function() {
	// // 	$('input.data-list-input').focus();
	// // });
 // //  //when selecting from the select box, put the value in the input box
	// $('select.data-list-input').change(function() {
	// 	// $('input.data-list-input').val("");
	// 	console.log("select changed");
	// });
 //  //When editing the input box, reset the select box setting to "free
 //  //form input". This is important to do so that you can reselect the
 //  //option you had selected if you want to.
	// $('input.data-list-input').change(function() {
	// 	$('select.data-list-input').val('');
	// });


    
});
