"use strict";

app.controller("SplashCtrl", function($scope, $timeout, UserFactory, $location, $window){

	$scope.noUser = true;

  let logout = () => {
  	$scope.noUser = false;
    UserFactory.logoutUser()
      .then(function (data) {
        //location is a service within angular
		    console.log("logged out");
        // $window.location.url = ("#!/");
      }, function (error) {
      });
  };

	if (UserFactory.isAuthenticated()) {
    logout();
    $scope.noUser = true;
  }

//When you choose to login with google
	$scope.loginGoogle = () => {				
		UserFactory.authWithProvider()
			.then(
				(userInfo) => {		  			
					$scope.noUser = false;		
  				$location.path('/choose');  					    				  						    			   
  				$timeout(() => $location.path('/choose') );
			}).catch(
				(error) => {
		    	// Handle the Errors.
		    	console.log("error with google login", error);		    	
		    	var errorCode = error.code;
		    	var errorMessage = error.message;
		    	// The email of the user's account used.
		    	var email = error.email;
		    	// The firebase.auth.AuthCredential type that was used.
		    	var credential = error.credential;
		  		// ...
				});
		};
});
