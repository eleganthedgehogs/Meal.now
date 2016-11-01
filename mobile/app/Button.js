import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Ionicons } from '@exponent/vector-icons';

const styles = StyleSheet.create({
  container: {
    width: 105,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    justifyContent: 'center',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.85,
  },
  container2: {
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
  },
  text: {
    justifyContent: 'center',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    borderRadius: 5,
  },
});

const Button = ({ text, icon, onclick }) => { 
  if(text !== undefined) {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={onclick}
      >
        <View
          style={styles.container2}
          elevation={3}
        >
          <Text style={styles.text}> {text} </Text>
        </View>
      </TouchableHighlight>
    )
  }
  return (
      <TouchableHighlight
        onPress={onclick}
      >
       <Ionicons name={icon} size={39} color="white" onPress={onclick} /> 
      </TouchableHighlight>
  ) 
};

export default Button;
