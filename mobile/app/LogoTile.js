import React from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import { CardItem, Card } from 'native-base';

const LogoTile = ({ image, onRestaurantPick }) => (

    <CardItem onPress={() => onRestaurantPick()} style={styles.card}>                       
        <Image style={styles.picture} source={{ uri: image }} />
    </CardItem>

)

export default LogoTile;

/************************ STYLES *************************/
const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10
  },
  picture: {
    height: 100,
    width: 150
  }
});