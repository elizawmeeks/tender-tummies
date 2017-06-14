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
        controller: "RxnDetialCtrl"
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
    .when("/trialDetail", {
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

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

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

"use strict";

app.controller("NavCtrl", function($scope, ChildFactory, NavDataFactory, $rootScope){

});

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

"use strict";

app.controller("RxnCtrl", function($scope){

    
});

"use strict";

app.controller("RxnDetailCtrl", function($scope){

    
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
			console.log("response", response);
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
    	console.log("response", response);
    	$scope.currentSafe = response;
    	console.log("$scope.currentSafe", $scope.currentSafe);
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

app.controller("TrialCtrl", function($scope){

    
});

"use strict";

app.controller("TrialDetailCtrl", function($scope){

    
});

"use strict";

app.controller("TriggerCtrl", function($scope, $rootScope, TriggerFactory){

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
  	console.log("$scope.trigger", $scope.trigger);
  	TriggerFactory.addTrigger( $scope.trigger )
  	.then ( response => {
  		$scope.getTriggers();
  	});
  };

  // Pulls all triggers and sets them as $scope.triggerList
  $scope.getTriggers = () => {
  	TriggerFactory.getTriggers(childId)
  	.then( response => {
  		console.log(response);
  		$scope.triggerList = response;
  	});
  };

  // Pulls one triggers and sets them as $scope.currentTrigger
  $scope.getTrigger = (triggerId) => {
  	TriggerFactory.getTrigger(triggerId)
  	.then( response => {
  		$scope.currentTrigger = response;
  		// console.log("$scope.currentTrigger", $scope.currentTrigger);
  	});
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
    			console.log("response", response);
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
  			console.log("response", response);
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