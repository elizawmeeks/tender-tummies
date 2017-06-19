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