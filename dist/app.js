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

app.controller("TriggerCtrl", function($scope){

    
});

"use strict";

app.factory("ChildFactory", function($q, $http, fbcreds, $route){

	let currentChild = null;

	let getChildId = () => {
		return currentChild;
	};

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
				currentChild = childId;
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
		getChildId,
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

});
"use strict";

app.factory("TrialFactory", function($q, $http, fbcreds){
    
});
"use strict";

app.factory("TriggerFactory", function($q, $http, fbcreds){
    
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