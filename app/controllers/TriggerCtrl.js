"use strict";

app.controller("TriggerCtrl", function($scope, TriggerFactory){

  $scope.trigger = {
  	food: "",
  	chronic: [],
  	acute: [],
  	severity: "",
  	nutrition: ""
  };

  $scope.addTrigger = () => {
  	console.log("$scope.trigger", $scope.trigger);
  	// TriggerFactory.addTrigger( $scope.trigger );
  	// .then $scope.getTriggers
  };

});
