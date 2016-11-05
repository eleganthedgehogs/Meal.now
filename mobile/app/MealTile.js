import React from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import { CardItem } from 'native-base';

const Tile = ({ recipe, mealId, showInfo }) => (
  <CardItem style={styles.card} onPress={() => showInfo(recipe, mealId)} >                       
      <Text style={styles.text} >{recipe.label}</Text>
      <Image source={{ uri: recipe.image }} />
  </CardItem>
)

export default Tile;

/************************ STYLES *************************/
const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 23,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
