import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Exponent from 'exponent';
import utils from '../Utils/utils.js';


class Photo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async getLocationAsync() {
	  const { Location, Permissions } = Exponent;
	  const { status } = await Permissions.askAsync(Permissions.LOCATION);

	  if (status === 'granted') {
	    return Location.getCurrentPositionAsync({enableHighAccuracy: true});
	  } else {
	    throw new Error('Location permission not granted');
	  }
	}

	takePhoto() {
	  Exponent.ImagePicker.launchCameraAsync({})
	  .then(image => {
	    if (!image.cancelled) {
	    	console.log('Posting', image, 'To Server');

	    	utils.postNewPhoto(image.uri, '12345');
	    }
	  });
	}

	render() {
		return (
			<TouchableHighlight onPress={() => this.getLocationAsync().then(res => console.log(res))} style={styles.TouchableHighlight}>
			    <View>
			    	<Text>Hello World!</Text>
			    </View>
			</TouchableHighlight>
		)
	}
}



const styles = {
	TouchableHighlight: {
		backgroundColor: 'red',
		flex: 1
	}
}


export default Photo;