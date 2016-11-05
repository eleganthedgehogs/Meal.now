import React from 'react';
import { View, Dimensions, StyleSheet, AsyncStorage  } from 'react-native';
import {Text, Header} from 'native-base';
import { Font } from 'exponent';

const width = Dimensions.get('window').width;

const MainHeader = (props) => {
	return (
    <View style = {styles.view}>
      <Header style={styles.header}>
        <Text style={styles.headline}>
          {props.title}
          Meal.now
        </Text>
      </Header>
    </View>
  );
}

export default MainHeader;

/************************ STYLES *************************/

const styles = StyleSheet.create({
  headline: {
    ...Font.style('Lobster'),
    fontSize: 40,
    lineHeight: 40,
    backgroundColor: 'white',
    color: 'black',
  },
  header: {
    backgroundColor: 'white',
    shadowOpacity: 0,
  },
  view: {
    flex: .12,
    borderBottomWidth: 1,
  }
});
