import React from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import { CardItem } from 'native-base';
import moment from 'moment';


const PhotoListItem = (props) => (
  <CardItem style={styles.card} >
      <Text style={styles.name} >{ props.photo.name}</Text>
      <Text style={styles.date} >{ moment(props.photo.date).calendar()}</Text>                       
      <Image source={{ uri: props.photo.uri }} />
  </CardItem>
);

export default PhotoListItem;


/************************ STYLES *************************/
const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingBottom: 15,
  },
  name: {
    fontSize: 23,
    paddingTop: 5,
    paddingBottom: 0,
  },
  date: {
    fontSize: 12,
    paddingBottom: 10,
  },
});
