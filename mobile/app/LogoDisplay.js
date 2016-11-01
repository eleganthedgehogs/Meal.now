import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logo: {
    width,
    height: 44,
    backgroundColor: 'green',
    borderBottomWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  headline: {
    fontSize: 30,
    fontFamily: 'Futura',
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },
});

const LogoDisplay = () => (
  <View style={styles.logo}>
    <Text style={styles.headline}>Meal.next</Text>
  </View>
);

export default LogoDisplay;
