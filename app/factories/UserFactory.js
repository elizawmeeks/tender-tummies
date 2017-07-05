"use strict";

app.factory("UserFactory", function($window){
  
  let currentUser = null;

  let logoutUser = function(){
  		$window.location.href = '#!/splash';
      return firebase.auth().signOut();
  };

  let isAuthenticated = function (){
      return new Promise ( (resolve, reject) => {
          firebase.auth().onAuthStateChanged( (user) => {
              if (user){
                  currentUser = user.uid;
                  resolve(true);
              }else {
                  resolve(false);
              }
          });
      });
  };

  let getUser = function(){
      return currentUser;
  };

  let provider = new firebase.auth.GoogleAuthProvider();

  let authWithProvider= function(){
      return firebase.auth().signInWithPopup(provider);
  };

  return {logoutUser, isAuthenticated, getUser, authWithProvider};
    
});