"use strict";

app.factory("SafeFactory", function($q, $http, fbcreds){
    
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

    const getSafes = ( childId ) => {
    	return $q( (resolve, reject) => {
    		$http.get(`${fbcreds.databaseURL}/safe.json?orderBy="cid"&equalTo="${childId}"`)
    		.then( response => {
    			console.log("response", response);
    			let safes = response.data;
    			// let sortKeys = (item) => {
    			// 	Object.keys(item).forEach( key => {
    			// 		item[key].id = key;
    			// 	});
    			// 	return item;
    			// };
    			// let safeArray = safes.map(sortKeys);
    			// console.log("safeArray", safeArray);
    			Object.keys(safes).forEach( key => {
    				safes[key].id = key;
    			});
    			resolve(safes);
    		})
    		.catch( error => {
    			reject(error);
    		});
    	});
    };

    return {
    	addSafe,
    	getSafes
    };

});