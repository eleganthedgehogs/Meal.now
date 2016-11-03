import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Exponent from 'exponent';
import utils from '../Utils/utils.js';


class Photo extends Component {
  constructor(props) {
    super(props);
    
    this.token = this.props.getToken();
  }

  render() {
  	return (
  		<TouchableHighlight 
  			onPress={() => {
  				utils.getLocationAsync().then(loc => utils.postLocation(loc, this.token));
          utils.takePhotoAsync().then(photo => !photo.cancelled && utils.postNewPhoto(photo.uri, this.token));
  			}} 
  			style={styles.TouchableHighlight}>
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