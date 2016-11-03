import React from 'react';
import { View, Dimensions, StyleSheet, AsyncStorage  } from 'react-native';
import {Text, Header} from 'native-base';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  headline: {
    fontFamily: 'Verdana',
    fontSize: 30,
    lineHeight: 30,
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black'
  },
});

const AddMealHeader = () => {
	return (
      <Header>
        <Text style={styles.headline}>
          Meal.find
        </Text>
      </Header>
 	)
}

export default AddMealHeader;