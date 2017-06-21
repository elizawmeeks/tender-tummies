"use strict";

app.factory("ChildFactory", function($q, $http, fbcreds, $route){

	const addChild = ( childObj ) => {
		return $q( (resolve, reject) => {
			let object = JSON.stringify(childObj);
			$http.post(`${fbcreds.databaseURL}/child.json`, object)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

	const getChildren = (userId) => {
		return $q( (resolve, reject) => {
			$http.get(`${fbcreds.databaseURL}/child.json?orderBy="uid"&equalTo="${userId}"`)
			.then( childObj => {
				let child = childObj.data;
				Object.keys(child).forEach( key => {
					child[key].id = key;
				});
				resolve(child);
			})
			.catch( error => {
				reject (error);
			});
		});
	};

	const getChild = ( childId ) => {
		return $q( (resolve, reject) => {
			$http.get(`${fbcreds.databaseURL}/child/${childId}.json`)
			.then( childObj => {
				let child = childObj.data;
				child.id = childId;
				resolve(child);
			})
			.catch( error => {
				reject (error);
			});
		});
	};

	const editChild = ( childId, childObj ) => {
		return $q((resolve, reject) => {
			let changedChild = JSON.stringify(childObj);
			$http.patch(`${fbcreds.databaseURL}/child/${childId}.json`, changedChild)
			.then( child => {
				resolve(child);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

	const deleteChild = ( childId ) => {
		return $q( (resolve, reject) => {
			$http.delete(`${fbcreds.databaseURL}/child/${childId}.json`)
			.then( response => {
				resolve(response);
			})
			.catch( error => {
				reject(error);
			});
		});
	};

	return {
		addChild,
		getChild,
		getChildren,
		editChild,
		deleteChild
	};
    
});