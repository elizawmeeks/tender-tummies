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