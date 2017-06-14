"use strict";

app.factory("ChildFactory", function($q, $http, fbcreds, $route){

	let currentChild = null;

	let getChildId = () => {
		return currentChild;
	};

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

	const getChildren = () => {
		return $q( (resolve, reject) => {
			$http.get(`${fbcreds.databaseURL}/child.json`)
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
				currentChild = childId;
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
		getChildId,
		deleteChild
	};
    
});