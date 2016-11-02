import React, { Component } from 'react';

export default {

	postNewPhoto(uri, token) {
		const photo = {
		  uri: uri,
		  type: 'image/jpeg',
		  name: 'newPhoto.jpg'
		};

		const form = new FormData()
		form.append('memoryImage', photo);

		fetch('/api/user/upload', 
		  {
		    body: form,
		    method: 'POST',
		    headers: {
		      'Content-Type': 'multipart/form-data',
		      'Authorization': token
		    }
		})
		.then(res => console.log('Response from postNewPhoto:', res))
		.catch(err => console.log('error', err));
	}

}