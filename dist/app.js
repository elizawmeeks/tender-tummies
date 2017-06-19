"use strict";

const app = angular.module("TenderTummies", ["ngRoute", 'ui.materialize']);

app.config( $routeProvider => {
	$routeProvider
	.when("/", {
		templateUrl: "partials/chooseChild.html",
		controller: "ChooseCtrl"
	})
	.when("/splash", {
        templateUrl: "partials/splash.html",
        controller: "SplashCtrl"
    })
    .when("/profile/:profileId", {
        templateUrl: "partials/profile.html",
        controller: "ProfileCtrl"
    })
    .when("/rxn", {
        templateUrl: "partials/rxn.html",
        controller: "RxnCtrl"
    })
    .when("/rxnDetail/:rxnId", {
        templateUrl: "partials/rxnDetail.html",
        controller: "RxnDetailCtrl"
    })
    .when("/safe", {
        templateUrl: "partials/safe.html",
        controller: "SafeCtrl"
    })
    .when("/trigger", {
        templateUrl: "partials/trigger.html",
        controller: "TriggerCtrl"
    })
    .when("/trial", {
        templateUrl: "partials/trial.html",
        controller: "TrialCtrl"
    })
    .when("/trialDetail/:trialId", {
        templateUrl: "partials/trialDetail.html",
        controller: "TrialDetailCtrl"
    });
});

app.run((fbcreds)=>{
   let cred = fbcreds;
   let authConfig = {
    apiKey: cred.apiKey,
    authDomain: cred.authDomain,
    databaseURL: cred.databaseUrl
   };

   firebase.initializeApp(authConfig);
});

app.run( $rootScope => {
    $rootScope.currentChild = null;
    $rootScope.isChild = false;
    $rootScope.currentChildId = "";
    $rootScope.view = "Tender Tummies";
});
// Initilization for modals
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
// Initialization for selects
$(document).ready(function() {
    $('select').material_select();
  });

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

	$scope.addChild = () => {
		ChildFactory.addChild( $scope.newChild )
		.then( stuff => {
			$scope.getChildren();
		});
	};

	$scope.getChildren = () => {
		ChildFactory.getChildren()
		.then( childrenObj => {
			$scope.children = childrenObj;
		});
	};

	$scope.getChildren();
    
});

"use strict";

app.controller("NavCtrl", function($scope, ChildFactory, NavDataFactory, $rootScope){

});

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

"use strict";

app.controller("RxnCtrl", function($scope, $rootScope, TriggerFactory, RxnFactory){

	// Sets current child id into an easier to use, local, variable.
	let childId = $rootScope.currentChildId;

	$rootScope.view = "Reactions";

	$scope.rxn = {
		start_date: "",
		ingestion: "",
		cid: childId,
		food_type: ""
	};

	// Pulls all Rxns and sets them as $scope.RxnFoods, an array for dispaly in the reaction view.
  $scope.getRxns = () => {
  	RxnFactory.getRxns(childId)
  	.then( response => {
  		$scope.RxnFoods = [];
  		let getTrigger = (triggerId, rxnObj) => {
  			TriggerFactory.getTrigger(triggerId)
  			.then( trigger => {
  				rxnObj.food = trigger.food;
  				$scope.RxnFoods.push(rxnObj);
  			});
  		};
  		for (let value in response){
  			getTrigger(response[value].trigger_id, response[value]);
  		}
  	});
  };

  // Pulls one rxn and sets it as $scope.currentRxn for editing and deleting.
  $scope.getRxn = (rxnId) => {
  	RxnFactory.getRxn(rxnId)
  	.then( response => {
  		$scope.currentRxn = response;
  	});
  };

  // Adds reaction to firebase
  $scope.addRxn = () => {
    RxnFactory.addRxn($scope.rxn)
  	.then( response => {
  		$scope.getRxns();
  	});
  };

  // Pulls all Triggers and sets them as $scope.triggerList to populate the dropdown in the modals. You need this here. Don't change it.
  $scope.getTriggers = () => {
  	TriggerFactory.getTriggers(childId)
  	.then( response => {
  		$scope.triggerList = response;
  	});
  };

  // Edits rxn object from the modal window
  $scope.editRxn = (rxnId, rxnObj) => {
  	RxnFactory.editRxn(rxnId, rxnObj)
  	.then( response => {
  		$scope.getRxns();
  	});
  };

  // Deletes rxn objects from firebase
  $scope.deleteRxn = (rxnId) => {
  	RxnFactory.deleteRxn(rxnId)
  	.then( response => {
  		$scope.getRxns();
  	});
  };

  $scope.getRxns();
  $scope.getTriggers();

	// Initialization for the date picker
	var currentTime = new Date();
	$scope.currentTime = currentTime;
	$scope.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.disable = [false, 1, 7];
	$scope.today = 'Today';
	$scope.clear = 'Clear';
	$scope.close = 'Close';
	var days = 15;
	$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
	$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
    
});

"use strict";

app.controller("RxnDetailCtrl", function($scope, $rootScope, RxnFactory, $routeParams, TriggerFactory){

	let childId = $rootScope.currentChildId;
	$scope.rxnId = $routeParams.rxnId;
  $rootScope.view = "Trial Detail";

  $scope.rxn_event = {
  	rxn_id: $scope.rxnId,
  	symptom: [],
  	type: "",
  	description: "",
  	severity: "",
  	date: "",
  	time: ""
  };

  // Gets the current reaction to set the view, and put reaction details at the top.
  $scope.getRxn = () => {
  	RxnFactory.getRxn($scope.rxnId)
  	.then( response => {
  		$scope.currentRxn = response;
  		if (response.end_date){
  			$scope.rxnOver = true;
  		} else {
  			$scope.rxnOver = false;
  		}
	  	TriggerFactory.getTrigger(response.trigger_id)
	  	.then( response => {
	  		$scope.food = response.food;
	  		$rootScope.view = response.food + " Reaction";
  		});
  	});
  };

  $scope.addRxnEvent = () => {
  	RxnFactory.addRxnEvent($scope.rxn_event)
    .then( response => {
      $scope.getRxnEvents();
    });
  	
  };

  $scope.getRxnEvent = (eventId) => {
    RxnFactory.getRxnEvent(eventId)
    .then( response => {
      $scope.currentEvent = response;
    });
  };

  	// Initialization for the date picker
	var currentTime = new Date();
	$scope.currentTime = currentTime;
	$scope.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.disable = [false, 1, 7];
	$scope.today = 'Today';
	$scope.clear = 'Clear';
	$scope.close = 'Close';
	var days = 15;
	$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
	$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();

  $scope.editRxnEvent = ( eventId, eventObj ) => {
    RxnFactory.editRxnEvent( eventId, eventObj )
    .then( () => {
      $scope.getRxnEvents();
    });

  };

  // Deletes rxn objects from firebase
  $scope.deleteRxnEvent = (eventId) => {
    RxnFactory.deleteRxnEvent(eventId)
    .then( response => {
      $scope.getRxnEvents();
    });
  };

	$scope.getRxnEvents = () => {
  	RxnFactory.getRxnEvents($scope.rxnId)
  	.then( response => {
  		$scope.rxnEvents = response;
  	});
  };

  $scope.endRxn = () => {
  	RxnFactory.editRxn($scope.rxnId, $scope.currentRxn)
  	.then( response => {
  		loadPage();
  	});
  };

  let loadPage = () => {
	  $scope.getRxn();
	  $scope.getRxnEvents();
  };

  loadPage();

});

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

"use strict";

app.controller("SplashCtrl", function($scope){

    
});

"use strict";

app.controller("TrialCtrl", function($scope, $rootScope, TrialFactory){

	// Sets current child id into an easier to use, local, variable.
	let childId = $rootScope.currentChildId;

	$rootScope.view = "Trials";

	$scope.newTrial = {
		food: "",
		start_date: "",
		cid: childId
	};

	$scope.addTrial = () => {
		TrialFactory.addTrial($scope.newTrial)
		.then( response => {
			$scope.getTrials();
		});
	};

	// Get trials to populate the page
	$scope.getTrials = () => {
		TrialFactory.getTrials(childId)
		.then( response => {
			$scope.trials = response;
		});
	};

	// Get one trial to populate the edit and delete modals.
	$scope.getTrial = (trialId) => {
		TrialFactory.getTrial(trialId)
		.then( response => {
			$scope.currentTrial = response;
		});
	};

	// Edit trial
	$scope.editTrial = (trialId, trialObj) => {
		TrialFactory.editTrial(trialId, trialObj)
		.then( response => {
			$scope.getTrials();
		});
	};

	// Delete trial
	$scope.deleteTrial = (trialId) => {
		TrialFactory.deleteTrial(trialId)
		.then (response => {
			$scope.getTrials();
		});
	};

	$scope.getTrials();
    
});

"use strict";

app.controller("TrialDetailCtrl", function($scope, $rootScope, RxnFactory, TrialFactory, TriggerFactory, SafeFactory, $routeParams){

	let childId = $rootScope.currentChildId;
	$scope.trialId = $routeParams.trialId;

	$scope.trial_event = {
		trial_id: $scope.trialId,
		quantity: "",
		food_type: "",
		description: "",
		time: "",
		date: ""
	};

	$scope.rxn = {
		start_date: "",
		ingestion: "",
		cid: childId,
		food_type: "",
		trial_id: $scope.trialId
	};

	$scope.safe = {
		food: "",
		cid: childId,
		nutrients: []
	};

	$scope.trigger = {
  	food: "",
  	cid: childId,
  	chronic: [],
  	acute: [],
  	severity: "",
  	nutrients: []
  };

	$scope.isRxn = false;
	$scope.safeAdded = false;
	$scope.triggerAdded = false;

	$scope.getTrial = () => {
		TrialFactory.getTrial($scope.trialId)
		.then( response => {
			$scope.currentTrial = response;
	    $scope.rxn.food_type = $scope.currentTrial.food;
			$rootScope.view = response.food + " Trial";
		});
	};

	// Adds trial event to firebase
	$scope.addTrialEvent = () => {
		TrialFactory.addTrialEvent( $scope.trial_event)
		.then( response => {
			$scope.getTrialEvents();
		});
	};

	// Adds reaction to firebase
  $scope.addRxn = () => {
    RxnFactory.addRxn($scope.rxn)
    .then( response => {
      $scope.getRxnsByTrial();
    });
  };

  // Ends trial
  $scope.endTrial = () => {
  	TrialFactory.editTrial($scope.trialId, $scope.currentTrial)
  	.then( response => {
  		loadPage();
  	});
  };

  // Edit trial event
  $scope.editTrialEvent = (eventId, eventObj) => {
  	TrialFactory.editTrialEvent(eventId, eventObj)
  	.then( response => {
  		$scope.getTrialEvents();
  	});
  };

  // Gets trial events to load to the page.
	$scope.getTrialEvents = () => {
		TrialFactory.getTrialEvents($scope.trialId)
		.then( response => {
			$scope.trialEvents = response;
		});
	};

	// Gets trial event to populate edit modal
	$scope.getTrialEvent = (eventId) => {
		TrialFactory.getTrialEvent(eventId)
		.then( response => {
			$scope.currentEvent = response;
		});
	};

	// Get any logged reactions to display on the page.
	$scope.getRxnsByTrial = () => {
		RxnFactory.getRxnsByTrial($scope.trialId)
		.then( response => {
			$scope.rxnFood = response;
			if ($scope.rxnFood.length > 0){
				$scope.isRxn = true;
			}
			console.log("$scope.rxnFood", $scope.rxnFood);
		});
	};

	// Delete Trial Events
	$scope.deleteTrialEvent = (eventId) => {
		TrialFactory.deleteTrialEvent(eventId)
		.then( response => {
			$scope.getTrialEvents();
		});
	};

	// Add Trial food to safe list
	$scope.addSafe = () => {
		SafeFactory.addSafe($scope.safe)
		.then( response => {
			$scope.safeAdded = true;
		});
	};

	// Add trial food to trigger list
	$scope.addTrigger = () => {
		let p1 = TriggerFactory.addTrigger($scope.trigger),
				p2 = RxnFactory.getRxnsByTrial($scope.trialId);

		Promise.all([p1, p2])
		.then( values => {
			$scope.triggerAdded = true;
			console.log("values[0]", values[0]);
			let id = values[0].data.name;
			console.log("id", id);
			values[1][0].trigger_id = id;
			console.log("values[1][0]", values[1][0]);
			RxnFactory.editRxn(values[1][0].id, values[1][0]);
		});
	};

	let loadPage = () => {
		$scope.getTrialEvents();
		$scope.getTrial();
		$scope.getRxnsByTrial();
	};
   
	loadPage();

});

"use strict";

app.controller("TriggerCtrl", function($scope, $rootScope, TriggerFactory, RxnFactory){

	// Sets current child id into an easier to use, local, variable.
	let childId = $rootScope.currentChildId;

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
    Promise.all([p1,p2])
    .then( values => {
  		$scope.currentTrigger = values[0];
      $scope.rxnArray = [];
      for (let thing in values[1]){
        $scope.rxnArray.push(values[1][thing]);
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

  $scope.getTriggers();

});

"use strict";

app.factory("ChildFactory", function($q, $http, fbcreds, $route){

	const addChild = ( childObj ) => {
		return $q( (resolve, reject) => {
			let object = JSON.stringify(childObj);
			$http.post(`${fbcreds.databaseURL}/child.json`, object)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

	const getChildren = () => {
		return $q( (resolve, reject) => {
			$http.get(`${fbcreds.databaseURL}/child.json`)
			.then( childObj => {
				let child = childObj.data;
				Object.keys(child).forEach( key => {
					child[key].id = key;
				});
				resolve(child);
			})
			.catch( error => {
				reject (error);
			});
		});
	};

	const getChild = ( childId ) => {
		return $q( (resolve, reject) => {
			$http.get(`${fbcreds.databaseURL}/child/${childId}.json`)
			.then( childObj => {
				let child = childObj.data;
				child.id = childId;
				resolve(child);
			})
			.catch( error => {
				reject (error);
			});
		});
	};

	const editChild = ( childId, childObj ) => {
		return $q((resolve, reject) => {
			let changedChild = JSON.stringify(childObj);
			$http.patch(`${fbcreds.databaseURL}/child/${childId}.json`, changedChild)
			.then( child => {
				resolve(child);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

	const deleteChild = ( childId ) => {
		return $q( (resolve, reject) => {
			$http.delete(`${fbcreds.databaseURL}/child/${childId}.json`)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

	return {
		addChild,
		getChild,
		getChildren,
		editChild,
		deleteChild
	};
    
});
"use strict";

app.factory("NavDataFactory", function($q, $http, fbcreds){
    
    return {
    	view: "",
    	child: ""
    };
    
});
"use strict";

app.factory("RxnFactory", function($q, $http, fbcreds){
    
    // Adds rxn to database
  const addRxn = ( object ) => {
  	return $q( (resolve, reject) => {
  		let rxnObj = JSON.stringify(object);
  		$http.post(`${fbcreds.databaseURL}/rxn.json`, rxnObj)
  		.then( response => {
  			resolve(response);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

    // Adds rxn event to database
  const addRxnEvent = ( object ) => {
  	return $q( (resolve, reject) => {
  		let rxnObj = JSON.stringify(object);
  		$http.post(`${fbcreds.databaseURL}/rxn_event.json`, rxnObj)
  		.then( response => {
  			resolve(response);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Gets all rxns associated with the child
  const getRxns = ( childId ) => {
  	return $q( (resolve, reject) => {
  		$http.get(`${fbcreds.databaseURL}/rxn.json?orderBy="cid"&equalTo="${childId}"`)
  		.then( response => {
  			console.log("response", response);
  			let rxns = response.data;
  			Object.keys(rxns).forEach( key => {
  				rxns[key].id = key;
  			});
  			resolve(rxns);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Gets all rxns associated with the child
  const getRxnsByTrigger = ( triggerId ) => {
    return $q( (resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/rxn.json?orderBy="trigger_id"&equalTo="${triggerId}"`)
      .then( response => {
        let rxns = response.data;
        console.log("getRxnsByTrigger response", rxns);
        Object.keys(rxns).forEach( key => {
          rxns[key].id = key;
        });
        resolve(rxns);
      })
      .catch( error => {
        reject(error);
      });
    });
  };

  // Gets all rxns associated with the child
  const getRxnsByTrial = ( trialId ) => {
    return $q( (resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/rxn.json?orderBy="trial_id"&equalTo="${trialId}"`)
      .then( response => {
        let rxns = response.data;
        let rxnArray = [];
        console.log("getRxnsByTrial response", rxns);
        Object.keys(rxns).forEach( key => {
          rxns[key].id = key;
          rxnArray.push(rxns[key]);
        });
        resolve(rxnArray);
      })
      .catch( error => {
        reject(error);
      });
    });
  };

  // Gets all rxn events associated with the rxn
  const getRxnEvents = ( rxnId ) => {
  	return $q( (resolve, reject) => {
  		$http.get(`${fbcreds.databaseURL}/rxn_event.json?orderBy="rxn_id"&equalTo="${rxnId}"`)
  		.then( response => {
  			console.log("response", response);
  			let rxns = response.data;
  			Object.keys(rxns).forEach( key => {
  				rxns[key].id = key;
  			});
  			resolve(rxns);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Get one rxn to populate edit modal and delete modal
  const getRxn = ( rxnId ) => {
  	return $q((resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/rxn/${rxnId}.json`)
          .then((response) => {
          	let rxn = response.data;
          	rxn.id = rxnId;
              resolve(rxn);
          })
          .catch((error) => {
              reject(error);
          });
    });
  };

  // Get one rxn to populate edit modal and delete modal
  const getRxnEvent = ( eventId ) => {
    return $q((resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/rxn_event/${eventId}.json`)
          .then((response) => {
            let rxn = response.data;
            rxn.id = eventId;
              resolve(rxn);
          })
          .catch((error) => {
              reject(error);
          });
    });
  };

  // Edit rxn object
  const editRxn = ( rxnID, rxnObj ) => {
  	let changedObj = JSON.stringify(rxnObj);
  	return $q( (resolve, reject) => {
  		$http.patch(`${fbcreds.databaseURL}/rxn/${rxnID}.json`, changedObj)
    	.then( response => {
    		resolve(response);
    	})
    	.catch( error => {
    		reject(error);
    	});
  	});
  };

  // Edit rxn event object
  const editRxnEvent = ( eventID, eventObj ) => {
    let changedObj = JSON.stringify(eventObj);
    return $q( (resolve, reject) => {
      $http.patch(`${fbcreds.databaseURL}/rxn_event/${eventID}.json`, changedObj)
      .then( response => {
        resolve(response);
      })
      .catch( error => {
        reject(error);
      });
    });
  };

  // Delete rxn from database. Maybe they passed a failed food! Hooray! Grow out of that FPIES, baby!
  const deleteRxn = ( rxnId ) => {
		return $q( (resolve, reject) => {
			$http.delete(`${fbcreds.databaseURL}/rxn/${rxnId}.json`)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

  // Deletes Rxn Event
  const deleteRxnEvent = ( eventId ) => {
    return $q( (resolve, reject) => {
      $http.delete(`${fbcreds.databaseURL}/rxn_event/${eventId}.json`)
      .then( response => {
        resolve(response);
      })
      .catch( error => {
        reject(error);
      });
    });
  };

  return {
  	addRxn,
  	getRxns,
  	getRxn,
  	editRxn,
  	deleteRxn,
  	addRxnEvent,
  	getRxnEvents,
    getRxnsByTrigger,
    getRxnEvent,
    editRxnEvent,
    deleteRxnEvent,
    getRxnsByTrial
  };

});
"use strict";

app.factory("SafeFactory", function($q, $http, fbcreds){
    // Adds safe to database
    const addSafe = ( object ) => {
    	return $q( (resolve, reject) => {
    		let safeObj = JSON.stringify(object);
    		$http.post(`${fbcreds.databaseURL}/safe.json`, safeObj)
    		.then( response => {
    			resolve(response);
    		})
    		.catch( error => {
    			reject(error);
    		});
    	});
    };

    // Gets all safes associated with the child
    const getSafes = ( childId ) => {
    	return $q( (resolve, reject) => {
    		$http.get(`${fbcreds.databaseURL}/safe.json?orderBy="cid"&equalTo="${childId}"`)
    		.then( response => {
    			let safes = response.data;
    			Object.keys(safes).forEach( key => {
    				safes[key].id = key;
    			});
    			resolve(safes);
    		})
    		.catch( error => {
    			reject(error);
    		});
    	});
    };

    // Returns one safe
    const getSafe = (safeId) => {
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/safe/${safeId}.json`)
                .then((response) => {
                	let safe = response.data;
                	safe.id = safeId;
                    resolve(safe);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    // Edits a safe food object
    const editSafe = ( safeID, safeObj ) => {
    	let changedObj = JSON.stringify(safeObj);
    	return $q( (resolve, reject) => {
    		$http.patch(`${fbcreds.databaseURL}/safe/${safeID}.json`, changedObj)
	    	.then( response => {
	    		resolve(response);
	    	})
	    	.catch( error => {
	    		reject(error);
	    	});
    	});
    };

    // Deletes a safe food object from the database
    const deleteSafe = ( safeId ) => {
		return $q( (resolve, reject) => {
			$http.delete(`${fbcreds.databaseURL}/safe/${safeId}.json`)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

    return {
    	addSafe,
    	getSafes,
    	editSafe,
    	getSafe,
    	deleteSafe
    };

});
"use strict";

app.factory("TrialFactory", function($q, $http, fbcreds){

  // Adds rxn to database
  const addTrial = ( object ) => {
  	return $q( (resolve, reject) => {
  		let trialObj = JSON.stringify(object);
  		$http.post(`${fbcreds.databaseURL}/trial.json`, trialObj)
  		.then( response => {
  			resolve(response);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Add Trial event to firebase.
  const addTrialEvent = (object) => {
  	return $q( (resolve, reject) => {
  		let eventObj = JSON.stringify(object);
  		$http.post(`${fbcreds.databaseURL}/trial_event.json`, eventObj)
  		.then( response => {
  			resolve(response);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Get trials from fb
  const getTrials = ( childId ) => {
  	return $q( (resolve, reject) => {
  		$http.get(`${fbcreds.databaseURL}/trial.json?orderBy="cid"&equalTo="${childId}"`)
  		.then( response => {
  			let trials = response.data;
  			Object.keys(trials).forEach( key => {
  				trials[key].id = key;
  			});
  			resolve(trials);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Get Trial Events from fb
  const getTrialEvents = ( trialId ) => {
  	return $q( (resolve, reject) => {
  		$http.get(`${fbcreds.databaseURL}/trial_event.json?orderBy="trial_id"&equalTo="${trialId}"`)
  		.then( response => {
  			let events = response.data;
  			Object.keys(events).forEach( key => {
  				events[key].id = key;
  			});
  			resolve(events);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Get Trial Event from fb to populate the edit modal
  const getTrialEvent = ( eventId ) => {
  	return $q( (resolve, reject) => {
  		$http.get(`${fbcreds.databaseURL}/trial_event/${eventId}.json`)
  		.then( response => {
  			let event = response.data;
  			event.id = eventId;
  			resolve(event);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Get trials from fb
  const getTrial = ( trialId ) => {
  	return $q( (resolve, reject) => {
  		$http.get(`${fbcreds.databaseURL}/trial/${trialId}.json`)
  		.then( response => {
  			let trial = response.data;
  			trial.id = trialId;
  			resolve(trial);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Edit trial object
  const editTrial = ( trialID, trialObj ) => {
  	let changedObj = JSON.stringify(trialObj);
  	return $q( (resolve, reject) => {
  		$http.patch(`${fbcreds.databaseURL}/trial/${trialID}.json`, changedObj)
    	.then( response => {
    		resolve(response);
    	})
    	.catch( error => {
    		reject(error);
    	});
  	});
  };

  // Edit trial object
  const editTrialEvent = ( eventID, eventObj ) => {
  	let changedObj = JSON.stringify(eventObj);
  	return $q( (resolve, reject) => {
  		$http.patch(`${fbcreds.databaseURL}/trial_event/${eventID}.json`, changedObj)
    	.then( response => {
    		resolve(response);
    	})
    	.catch( error => {
    		reject(error);
    	});
  	});
  };

  // Delete trial from database.
  const deleteTrial = ( trialId ) => {
		return $q( (resolve, reject) => {
			$http.delete(`${fbcreds.databaseURL}/trial/${trialId}.json`)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

	// Delete trial from database.
  const deleteTrialEvent = ( eventId ) => {
		return $q( (resolve, reject) => {
			$http.delete(`${fbcreds.databaseURL}/trial_event/${eventId}.json`)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

  return {
  	addTrial,
  	getTrials,
  	getTrial,
  	editTrial,
  	deleteTrial,
  	addTrialEvent,
  	getTrialEvent,
  	editTrialEvent,
  	getTrialEvents,
  	deleteTrialEvent
  };
    
});
"use strict";

app.factory("TriggerFactory", function($q, $http, fbcreds){

	// Adds trigger to database
  const addTrigger = ( object ) => {
  	return $q( (resolve, reject) => {
  		let triggerObj = JSON.stringify(object);
  		$http.post(`${fbcreds.databaseURL}/trigger.json`, triggerObj)
  		.then( response => {
  			resolve(response);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Gets all triggers associated with the child
  const getTriggers = ( childId ) => {
  	return $q( (resolve, reject) => {
  		$http.get(`${fbcreds.databaseURL}/trigger.json?orderBy="cid"&equalTo="${childId}"`)
  		.then( response => {
  			let triggers = response.data;
  			Object.keys(triggers).forEach( key => {
  				triggers[key].id = key;
  			});
  			resolve(triggers);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Get one trigger to populate edit modal and delete modal
  const getTrigger = ( triggerId ) => {
  	return $q((resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/trigger/${triggerId}.json`)
          .then((response) => {
          	let trigger = response.data;
          	trigger.id = triggerId;
              resolve(trigger);
          })
          .catch((error) => {
              reject(error);
          });
    });
  };

  // Edit trigger object
  const editTrigger = ( triggerID, triggerObj ) => {
  	let changedObj = JSON.stringify(triggerObj);
  	return $q( (resolve, reject) => {
  		$http.patch(`${fbcreds.databaseURL}/trigger/${triggerID}.json`, changedObj)
    	.then( response => {
    		resolve(response);
    	})
    	.catch( error => {
    		reject(error);
    	});
  	});
  };

  // Delete trigger from database. Maybe they passed a failed food! Hooray! Grow out of that FPIES, baby!
  const deleteTrigger = ( triggerId ) => {
		return $q( (resolve, reject) => {
			$http.delete(`${fbcreds.databaseURL}/trigger/${triggerId}.json`)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

  return {
  	addTrigger,
  	getTriggers,
  	getTrigger,
  	editTrigger,
  	deleteTrigger
  };
    
});
"use strict";

app.factory("UserFactory", function($q, $http, fbcreds){
    
});
"use strict";

app.constant("fbcreds", {
	apiKey: "AIzaSyDLTvSvPHCZq9IsaCf8yKsg0G7BynjxpAs",
    authDomain: "tender-tummies.firebaseapp.com",
    databaseURL: "https://tender-tummies.firebaseio.com"    
});