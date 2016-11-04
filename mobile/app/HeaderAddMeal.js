import React from 'react';
import { StyleSheet } from 'react-native';
import { Title, Header, Button, Icon } from 'native-base';
import { Ionicons } from '@exponent/vector-icons';


const AddMealHeader = () => {
	return (
      <Header style={styles.header}>
        <Button transparent>
          <Ionicons name='ios-arrow-back' size={30} />
        </Button>

        <Title style={styles.headline}>
          Meal.find
        </Title>
      </Header>
 	)
}

export default AddMealHeader;

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
