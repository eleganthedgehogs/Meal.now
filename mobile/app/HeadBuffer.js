import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  buffer: {
    width,
    height: 22,
    backgroundColor: 'black',
  },
});

const HeadBuffer = () => (
  <View style={styles.buffer} />
);

export default HeadBuffer;
