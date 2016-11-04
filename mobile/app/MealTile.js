import React from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import { CardItem } from 'native-base';

const Tile = ({ recipe, mealId, showInfo }) => (
  <CardItem style={styles.card} onPress={() => showInfo(recipe, mealId)} >                       
      <Image source={{ uri: recipe.image }} />
      <Text style={styles.text} >{recipe.label}</Text>
  </CardItem>
)

export default Tile;

/************************ STYLES *************************/
const styles = StyleSheet.create({
  card: {
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10
  }
});