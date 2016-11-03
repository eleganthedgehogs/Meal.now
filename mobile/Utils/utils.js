import React, { Component } from 'react';

export default {

	postNewPhoto(uri, token) {
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
		.catch(err => console.log('error', err));
	}
}