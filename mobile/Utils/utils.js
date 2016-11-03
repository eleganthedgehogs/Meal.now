import React, { Component } from 'react';
import Exponent from 'exponent';

/*********************************   PHOTO  ***********************************/

const takePhotoAsync = async () => await Exponent.ImagePicker.launchCameraAsync({});


const postNewPhoto = (uri, token) => {
	const photo = {
	  uri: uri,
	  type: 'image/jpeg',
	  name: 'image'
	};

	const form = new FormData();
	form.append('image', photo);

	fetch('http://10.6.19.49:8000/api/feature/upload',
	  {
	    body: form,
	    method: 'POST',
	    headers: {
	      'Content-Type': 'multipart/form-data',
	      'x-access-token': token,
	      'date': Date.now(),
	    },
	})
	.then(res => console.log('Response from postNewPhoto:', res))
	.catch(err => console.log('Error postNewPhoto (utils.js):', err));
}

/*********************************   LOCATION  ***********************************/

const getLocationAsync = async () => {
  const { Location, Permissions } = Exponent;
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    return Location.getCurrentPositionAsync({enableHighAccuracy: true});
  } else {
    throw new Error('Location permission not granted');
  }
}

const postLocation = (loc, token) => {
	console.log('sending location', loc)
	fetch('http://10.6.19.49:8000/api/feature/location',
	  {
	    body: JSON.stringify(loc),
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
	      'x-access-token': token,
	    },
	})
	.then(res => console.log('Response from postNewPhoto:', res))
	.catch(err => console.log('Erros postLocation (utils.js):', err));
} 


export default { takePhotoAsync, postNewPhoto, getLocationAsync, postLocation }