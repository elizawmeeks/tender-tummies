"use strict";

app.factory("SafeFactory", function($q, $http, fbcreds){
    // Adds safe to database
    const addSafe = ( object ) => {
    	return $q( (resolve, reject) => {
    		let safeObj = JSON.stringify(object);
    		$http.post(`${fbcreds.databaseURL}/safe.json`, safeObj)
    		.then( response => {
    			resolve(response);
    		})
    		.catch( error => {
    			reject(error);
    		});
    	});
    };

    // Gets all safes associated with the child
    const getSafes = ( childId ) => {
    	return $q( (resolve, reject) => {
    		$http.get(`${fbcreds.databaseURL}/safe.json?orderBy="cid"&equalTo="${childId}"`)
    		.then( response => {
    			let safes = response.data,
              safeArray = [];
    			Object.keys(safes).forEach( key => {
    				safes[key].id = key;
            safeArray.push(safes[key]);
    			});
    			resolve(safeArray);
    		})
    		.catch( error => {
    			reject(error);
    		});
    	});
    };

    // Returns one safe
    const getSafe = (safeId) => {
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/safe/${safeId}.json`)
                .then((response) => {
                	let safe = response.data;
                	safe.id = safeId;
                    resolve(safe);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    // Edits a safe food object
    const editSafe = ( safeID, safeObj ) => {
    	let changedObj = JSON.stringify(safeObj);
    	return $q( (resolve, reject) => {
    		$http.patch(`${fbcreds.databaseURL}/safe/${safeID}.json`, changedObj)
	    	.then( response => {
	    		resolve(response);
	    	})
	    	.catch( error => {
	    		reject(error);
	    	});
    	});
    };

    // Deletes a safe food object from the database
    const deleteSafe = ( safeId ) => {
		return $q( (resolve, reject) => {
			$http.delete(`${fbcreds.databaseURL}/safe/${safeId}.json`)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

    return {
    	addSafe,
    	getSafes,
    	editSafe,
    	getSafe,
    	deleteSafe
    };

});