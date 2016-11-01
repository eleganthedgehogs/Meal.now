import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  columnLeft: {

  },
  columnRight: {
    alignItems: 'flex-end',
  },
  head: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const Column = ({ data, name, index, alignRight }) => (
  <View style={alignRight ? styles.columnRight : styles.columnLeft}>
    <Text style={styles.head}>
      {name}
    </Text>
    {data.map((item, i) => (
      <Text
        key={i}
      >
        {
          !Number(item[index]) ? item[index] :
          Number(item[index]) % 1 === 0 ? item[index] :
          Number(Number(item[index]).toFixed(2)).toString()
        }
      </Text>
    ))}
  </View>
);

export default Column;
