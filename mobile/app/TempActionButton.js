import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@exponent/vector-icons';
import AddMeal from './AddMeal';
import PostPictureView from './PostPictureView';

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

const moveTo = (navigator, component) => {
  navigator.replace({ component });
};

const MainActionButton = (props) => {
  return (
      <ActionButton 
        onPress={() => moveTo(props.navigator, PostPictureView)}
        buttonColor="purple" 
        position="right" 
        offsetY={190} 
        offsetX={10}>
      </ActionButton>
  );
}

export default MainActionButton;