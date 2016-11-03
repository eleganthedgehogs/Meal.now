// https://github.com/facebook/react-native/blob/b998e5a7b74905b30b1137a02e14cd5e6f97fccc/Libraries/CustomComponents/Navigator/Navigator.js
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Block } from 'native-base';
import Button from './Button';
import PhotoButton from './PhotoButton';
import MealList from './MealList';
import ShoppingList from './ShoppingList';
import AddMeal from './AddMeal';
import Photo from './Photo';

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

const moveTo = (navigator, component) => {
  navigator.replace({ component });
};

const NavBar = (props) => {
  // if (props.navigator.getCurrentRoutes().length > 1) {
          // <Button icon="ios-list-box" onclick={() => moveTo(props.navigator, MealList)} />
          // <PhotoButton icon="md-camera" onclick={() => moveTo(props.navigator, ShoppingList)} />
          // <Button icon="ios-images" onclick={() => moveTo(props.navigator, AddMeal)} />
    return (
      <View style={styles.container}>
        <Button icon="md-list-box" onclick={() => moveTo(props.navigator, Photo)} />
        <Button icon="md-basket" onclick={() => moveTo(props.navigator, ShoppingList)} />
        <Button icon="md-add-circle" onclick={() => moveTo(props.navigator, AddMeal)} />
      </View>
    );
  // }
  return null;
};

export default NavBar;
