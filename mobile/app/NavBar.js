// https://github.com/facebook/react-native/blob/b998e5a7b74905b30b1137a02e14cd5e6f97fccc/Libraries/CustomComponents/Navigator/Navigator.js
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Block } from 'native-base';
import Button from './Button';
import PhotoButton from './PhotoButton';
import MealList from './MealList';
import AddMeal from './AddMeal';
import Photo from './Photo';
import utils from '../Utils/utils';
import PickRestaurant from './PickRestaurant';
import PhotoList from './PhotoList'


const moveTo = (navigator, component, ...props) => {
  navigator.replace({ component, props });
};

const gotoNext = (navigator, restaurants, date, token) => {
  navigator.replace({
    component: PickRestaurant,
    passProps: { restaurants, date, token }
  });
}

const NavBar = (props) => {
  const token = props.getToken();

  if (props.navigator.getCurrentRoutes().length > 1) {
    return (
      <View style={styles.container}>
          <Button icon="ios-list-box" onclick={() => moveTo(props.navigator, MealList)} />
          <PhotoButton icon="md-camera" onclick={() => {
            utils.getLocationAsync().then(loc => {
              utils.takePhotoAsync().then(photo => {
                if (!photo.cancelled) {
                   const date = Date.now();
                   utils.postPhotoAndLocation(photo.uri, token, date, loc); 
                   utils.getRestaurants(loc.coords.latitude, loc.coords.longitude, token).then( restaurants => {
                      gotoNext(props.navigator, restaurants, date, token)
                   })

                }
              })
            })
          }} />
        <Button icon="ios-images" onclick={() => moveTo(props.navigator, PhotoList, token)} />
      </View>      
    )    
  } else {
    return null;
  }
};

export default NavBar;

/************************ STYLES *************************/

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width,
    height: 125,
    backgroundColor: 'white',
    borderColor: 'gray',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
});
