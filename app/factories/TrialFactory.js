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

  return {
  	addTrial,
  	getTrials,
  	getTrial,
  	editTrial,
  	deleteTrial
  };
    
});