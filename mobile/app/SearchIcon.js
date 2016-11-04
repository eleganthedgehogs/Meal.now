import React from 'react';
import { View, Dimensions, StyleSheet, AsyncStorage, Button, TouchableHighlight } from 'react-native';
import {Text, Header} from 'native-base';
import { Ionicons } from '@exponent/vector-icons';

const styles = StyleSheet.create({
  icon: {
    fontSize: 10,
    color: 'dodgerblue',
    marginTop: 25
  },
  container: {
    backgroundColor: 'orange',
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
  }
})

const SearchIcon = () => {
	return (
    <TouchableHighlight style={styles.container}>
      <Ionicons name="ios-search" style={styles.icon}/>
    </TouchableHighlight>
 	)
}

export default SearchIcon;