"use strict";

app.factory("RxnFactory", function($q, $http, fbcreds){
    
    // Adds rxn to database
  const addRxn = ( object ) => {
  	return $q( (resolve, reject) => {
  		let rxnObj = JSON.stringify(object);
  		$http.post(`${fbcreds.databaseURL}/rxn.json`, rxnObj)
  		.then( response => {
  			resolve(response);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Gets all rxns associated with the child
  const getRxns = ( childId ) => {
  	return $q( (resolve, reject) => {
  		$http.get(`${fbcreds.databaseURL}/rxn.json?orderBy="cid"&equalTo="${childId}"`)
  		.then( response => {
  			console.log("response", response);
  			let rxns = response.data;
  			Object.keys(rxns).forEach( key => {
  				rxns[key].id = key;
  			});
  			resolve(rxns);
  		})
  		.catch( error => {
  			reject(error);
  		});
  	});
  };

  // Get one rxn to populate edit modal and delete modal
  const getRxn = ( rxnId ) => {
  	return $q((resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/rxn/${rxnId}.json`)
          .then((response) => {
          	let rxn = response.data;
          	rxn.id = rxnId;
              resolve(rxn);
          })
          .catch((error) => {
              reject(error);
          });
    });
  };

  // Edit rxn object
  const editRxn = ( rxnID, rxnObj ) => {
  	let changedObj = JSON.stringify(rxnObj);
  	return $q( (resolve, reject) => {
  		$http.patch(`${fbcreds.databaseURL}/rxn/${rxnID}.json`, changedObj)
    	.then( response => {
    		resolve(response);
    	})
    	.catch( error => {
    		reject(error);
    	});
  	});
  };

  // Delete rxn from database. Maybe they passed a failed food! Hooray! Grow out of that FPIES, baby!
  const deleteRxn = ( rxnId ) => {
		return $q( (resolve, reject) => {
			$http.delete(`${fbcreds.databaseURL}/rxn/${rxnId}.json`)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

  return {
  	addRxn,
  	getRxns,
  	getRxn,
  	editRxn,
  	deleteRxn
  };

});