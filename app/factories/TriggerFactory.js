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

  return {
  	addTrigger
  };
    
});