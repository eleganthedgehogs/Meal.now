import React, { Component } from 'react';
import Exponent from 'exponent';
import IP from './IP.js';

/*********************************   PHOTO  ***********************************/

const takePhotoAsync = async () => await Exponent.ImagePicker.launchCameraAsync({});
const postNewPhotoURL = IP.postNewPhotoURL;

const postNewPhoto = (uri, token, date) => {
	const photo = {
	  uri: uri,
	  type: 'image/jpeg',
	  name: 'image'
	};

	const form = new FormData();
	form.append('image', photo);

	fetch(postNewPhotoURL,
	  {
	    body: form,
	    method: 'POST',
	    headers: {
	      'Content-Type': 'multipart/form-data',
	      'x-access-token': token,
	      'date': date,
	    },
	})
	.then(res => console.log('Response from postNewPhoto:', res))
	.catch(err => console.log('Error postNewPhoto (utils.js):', err));
}

/*********************************   LOCATION  ***********************************/

const postLocationURL = IP.postLocationURL;

const getLocationAsync = async () => {
  const { Location, Permissions } = Exponent;
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    return Location.getCurrentPositionAsync({enableHighAccuracy: true});
  } else {
    throw new Error('Location permission not granted');
  }
}

const postLocation = (loc, token, date) => {
	console.log('sending location', loc)
	fetch(postLocationURL,
	  {
	    body: JSON.stringify(loc),
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
	      'x-access-token': token,
	      'date': date,
	    },
	})
	.then(res => console.log('Response from postNewPhoto:', res))
	.catch(err => console.log('Erros postLocation (utils.js):', err));
} 


export default { takePhotoAsync, postNewPhoto, getLocationAsync, postLocation }