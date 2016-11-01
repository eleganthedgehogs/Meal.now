import React from 'react';
import { View, Image, Dimensions, Text, StyleSheet, TouchableHighlight } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  tile: {
    width: width * 0.9,
    height: 90,
    borderRadius: 5,
    marginTop: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'black',
  },
  picture: {
    width: width * 0.9,
    height: 90,
    opacity: 0.85,
    borderRadius: 5,
  },
  textwrap: {
    width: width * 0.9,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  headline: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 26,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    opacity: 1,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 2,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
});

const Tile = ({ recipe, mealId, showInfo }) => (
  <TouchableHighlight
    style={styles.tile}
    onPress={() => showInfo(recipe, mealId)}
  >
    <Image
      style={styles.picture}
      source={{ uri: recipe.image }}
    >
      <View style={styles.textwrap}>
        <Text style={styles.headline}>
          {recipe.label}
        </Text>
      </View>
    </Image>
  </TouchableHighlight>
);

export default Tile;
