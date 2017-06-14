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

});