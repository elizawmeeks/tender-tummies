"use strict";

const app = angular.module("TenderTummies", ["ngRoute", 'ui.materialize']);

let isAuth = (UserFactory) => {new Promise ( (resolve,reject) =>{
    UserFactory.isAuthenticated()
    .then((userExists)=>{
        if(userExists){
            console.log("Authenticated, go ahead");
            resolve();
        } else{
            console.log("Authentication rejected");
            reject();
            }
        });
    });
};

app.config( $routeProvider => {
	$routeProvider
	.when("/", {
        templateUrl: "partials/splash.html",
        controller: "SplashCtrl",
        resolve: {isAuth}
    })
    .when("/choose", {
		templateUrl: "partials/chooseChild.html",
		controller: "ChooseCtrl",
        resolve: {isAuth}
	})
	.when("/splash", {
        templateUrl: "partials/splash.html",
        controller: "SplashCtrl",
        resolve: {isAuth}
    })
    .when("/profile/:profileId", {
        templateUrl: "partials/profile.html",
        controller: "ProfileCtrl",
        resolve: {isAuth}
    })
    .when("/rxn", {
        templateUrl: "partials/rxn.html",
        controller: "RxnCtrl",
        resolve: {isAuth}
    })
    .when("/rxnDetail/:rxnId", {
        templateUrl: "partials/rxnDetail.html",
        controller: "RxnDetailCtrl",
        resolve: {isAuth}
    })
    .when("/safe", {
        templateUrl: "partials/safe.html",
        controller: "SafeCtrl",
        resolve: {isAuth}
    })
    .when("/trigger", {
        templateUrl: "partials/trigger.html",
        controller: "TriggerCtrl",
        resolve: {isAuth}
    })
    .when("/trial", {
        templateUrl: "partials/trial.html",
        controller: "TrialCtrl",
        resolve: {isAuth}
    })
    .when("/trialDetail/:trialId", {
        templateUrl: "partials/trialDetail.html",
        controller: "TrialDetailCtrl",
        resolve: {isAuth}
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

// Sets variables to control the navbar displays on each page.
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
