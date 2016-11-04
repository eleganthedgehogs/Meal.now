import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@exponent/vector-icons';
const height = Dimensions.get('window').height;
console.log(height, 'height')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 60,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

const MainActionButton = () => {
  return (
      <ActionButton buttonColor="rgba(231,76,60,1)" position="right" offsetY={390} offsetX={10}>
        <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
          <Ionicons name="ios-search" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
  );
}

export default MainActionButton;