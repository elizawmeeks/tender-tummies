"use strict";

app.controller("TriggerCtrl", function($scope, $rootScope, TriggerFactory, RxnFactory){

	// Sets current child id into an easier to use, local, variable.
	let childId = $rootScope.currentChildId,
      rxnArray = [],
      isArray = false;

	$rootScope.view = "Triggers";

  $scope.trigger = {
  	food: "",
  	cid: childId,
  	chronic: [],
  	acute: [],
  	severity: "",
  	nutrition: ""
  };

  // Add trigger from the trigger modal
  $scope.addTrigger = () => {
  	TriggerFactory.addTrigger( $scope.trigger )
  	.then ( response => {
  		$scope.getTriggers();
  	});
  };

  // Pulls all triggers and sets them as $scope.triggerList
  $scope.getTriggers = () => {
  	TriggerFactory.getTriggers(childId)
  	.then( response => {
  		$scope.triggerList = response;
  	});
  };

  // Pulls one trigger and sets them as $scope.currentTrigger to display trigger details in a modal.
  $scope.getTrigger = (triggerId) => {
  	let p1 = TriggerFactory.getTrigger(triggerId),
        p2 = RxnFactory.getRxnsByTrigger(triggerId);
    isArray = false;
    Promise.all([p1,p2])
    .then( values => {
      $scope.currentTrigger = values[0];
      rxnArray = [];
      for (let thing in values[1]){
        rxnArray.push(values[1][thing]);
      }     
      if (rxnArray.length > 0) {
        isArray = true;
        $scope.rxnArray = rxnArray;
        console.log("$scope.rxnArray", $scope.rxnArray);
      } else {
        $scope.rxnArray = [];
      }
      console.log("rxn Array, triggersCtrl", $scope.rxnArray);
    });
  };

  $scope.removeOverlay = () => {
    $(".modal-overlay").remove();
  };

  // Edits trigger object from the modal window
  $scope.editTrigger = (triggerId, triggerObj) => {
  	TriggerFactory.editTrigger(triggerId, triggerObj)
  	.then( response => {
  		$scope.getTriggers();
  	});
  };

  // Deletes trigger. GROW OUT OF THAT FPIES, BABY!
	$scope.deleteTrigger = (triggerId) => {
		TriggerFactory.deleteTrigger(triggerId)
		.then( () => {
			$scope.getTriggers();
		});
	};

  $scope.downloadPDF = () => {
    // console.log("$scope.safeList", $scope.safeList);
    let pdf = { 
      content: [
        { text: `${$rootScope.currentChild}'s Trigger Foods`, style: "header"}
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        trigger: {
          fontSize: 16,
          bold: true
        },
        type: {
          bold: true
        }
      } 
    };
    for (let thing in $scope.triggerList){
      let triggerObj = 
        {
          ol: [
            {text: "Acute Reactions", style: "type"},
              {
                ul: []
              },
            {text: "Chronic Reactions", style: "type"},
            {
              ul: []
            }
          ]
        };
      let acuteRxn = {text: "Acute Reactions", style: "type"},
          chronicRxn = {text: "Chronic Reactions", style: "type"},
          ul = {ul: []};
      // triggerObj.ol[1].ul.push($scope.triggerList[thing].acute);
      // triggerObj.ol[3].ul.push($scope.triggerList[thing].chronic);
      pdf.content.push({text: $scope.triggerList[thing].food, style: 'trigger'});
      pdf.content.push(acuteRxn);
      ul = {ul: $scope.triggerList[thing].acute};
      pdf.content.push(ul);
      pdf.content.push(chronicRxn);
      ul = {ul: $scope.triggerList[thing].chronic};
      pdf.content.push(ul);
    }
    console.log("pdf", pdf);
    pdfMake.createPdf(pdf).download(`${$rootScope.currentChild}Triggerlist.pdf`);
    };

  $scope.getTriggers();

});
