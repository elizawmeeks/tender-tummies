"use strict";

const app = angular.module("TenderTummies", ["ngRoute", 'ui.materialize']);

app.config( $routeProvider => {
	$routeProvider
	.when("/", {
		templateUrl: "partials/splash.html",
		controller: "SplashCtrl"
	})
	.when("/splash", {
        templateUrl: "partials/splash.html",
        controller: "SplashCtrl"
    })
    .when("/profile", {
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

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

$(document).ready(function() {
    $('select').material_select();
  });
"use strict";

app.controller("NavCtrl", function($scope){

    
});

"use strict";

app.controller("ProfileCtrl", function($scope){

    
});

"use strict";

app.controller("RxnCtrl", function($scope){

    
});

"use strict";

app.controller("RxnDetailCtrl", function($scope){

    
});

"use strict";

app.controller("SafeCtrl", function($scope){

    
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

app.factory("ChildFactory", function($q, $http, fbcreds){

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
    
});
"use strict";

app.factory("RxnFactory", function($q, $http, fbcreds){
    
});
"use strict";

app.factory("SafeFactory", function($q, $http, fbcreds){
    
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