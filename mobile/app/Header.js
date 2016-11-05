import React from 'react';
import { View, Dimensions, StyleSheet, AsyncStorage  } from 'react-native';
import {Text, Header} from 'native-base';

const width = Dimensions.get('window').width;

const MainHeader = () => {
	return (
      <Header style={styles.header}>
        <Text style={styles.headline}>
          Meal.next
        </Text>
      </Header>
 	)
}

export default MainHeader;

/************************ STYLES *************************/

const styles = StyleSheet.create({
  headline: {
    fontFamily: 'Verdana',
    fontSize: 24,
    lineHeight: 24,
    backgroundColor: 'white',
    color: 'black'
  },
  header: {
    backgroundColor: 'white',
    shadowOpacity: 0
  }
});