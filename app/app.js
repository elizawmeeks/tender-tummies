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