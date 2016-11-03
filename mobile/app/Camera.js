import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  Alert,
  Dimensions
} from 'react-native';
import { Button } from 'native-base';
import Exponent, {Font} from 'exponent';
import MealList from './MealList';

class Camera extends React.Component {
  constructor(props) {
    super(props);
  }

  takeImage() {
    var newImage = async function() {
      return Exponent.ImagePicker.launchCameraAsync({});
    };
    newImage().then((image) => {
      if (!image.cancelled) {
        console.log('Image captured!', image);
      }
    });
  }

  render() {
    return (
      <View>
        <Button style={{height: 100}} onPress = {this.takeImage.bind(this)}>
          <View>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>Press Me</Text>
          </View>
        </Button>
      </View>
    );
  }

}

export default Camera;
