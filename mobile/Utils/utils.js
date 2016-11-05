import React, { Component } from 'react';
import Exponent from 'exponent';
import IP from './IP.js';

/*********************************   PHOTO  ***********************************/

const takePhotoAsync = async () => await Exponent.ImagePicker.launchCameraAsync({});
const postPhotoAndLocationURL = IP.postPhotoAndLocationURL;

const postPhotoAndLocation = (uri, token, date, location) => {
	const photo = {
	  uri: uri,
	  type: 'image/jpeg',
	  name: 'image'
	};

	const form = new FormData();
	form.append('image', photo);

	console.log('location', location)
	fetch(postPhotoAndLocationURL,
	  {
	    body: form,
	    method: 'POST',
	    headers: {
	      'Content-Type': 'multipart/form-data',
	      'x-access-token': token,
	      'date': date,
	      'latitude': location.coords.latitude,
	      'longitude': location.coords.longitude
	    },
	})
	.then(res => console.log('Response from postPhotoAndLocation:', res))
	.catch(err => console.log('Error postPhotoAndLocation (utils.js):', err));
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

/*********************************   RESTAURANTS  ***********************************/

const getRestaurantsURL = IP.getRestaurantsURL;
const getRestaurantMenuURL = IP.getRestaurantMenuURL;
const getMenuItemURL = IP.getMenuItemURL;

const getRestaurants = (lat, long, token) => {
	return fetch(`${getRestaurantsURL}?latitude=${lat}&longitude=${long}`,
	{
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json',
	    'x-access-token': token
	  },
	})
	.then((response) => response.json())
	.then(responseJSON => responseJSON)
	.catch((error) => console.error('Error from get restaurants', error));
}

const getRestaurantMenu = (name, date, token) => {
	console.log(name, date, token, 'from getRestaurantMenu')
	return fetch(`${getRestaurantMenuURL}?name=${name}&date=${date}`,
	{
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json',
	    'x-access-token': token
	  },
	})
	.then((response) => response.json())
	.then(responseJSON => responseJSON)
	.catch((error) => console.error('Error from get getRestaurantMenu', error));
}

const getMenuItem = (item, date, token) => {
	return fetch(`${getMenuItemURL}?id=${item.id}&name=${item.name}&date=${date}`,
	{
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json',
	    'x-access-token': token
	  },
	})
	.then((response) => response.json())
	.then(responseJSON => {
		console.log('Response JSON in getMenuItem in utils:', responseJSON);
		return responseJSON;
	})
	.catch((error) => console.error('Error from get getMenuItem', error));

}


export default { takePhotoAsync, postPhotoAndLocation, getMenuItem, getLocationAsync, getRestaurants, getRestaurantMenu }