import React from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import { CardItem } from 'native-base';
import moment from 'moment';


const PhotoListItem = (props) => (
  <CardItem style={styles.card} >
      <Text style={styles.text} >{ moment(props.photo.date).calendar()}</Text>                       
      <Image source={{ uri: props.photo.uri }} />
      <Text style={styles.text} >{ props.photo.name}</Text>
  </CardItem>
)

export default PhotoListItem;



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