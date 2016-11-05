import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import HeaderAddMeal from './HeaderAddMeal';
import { Container, Content, List, ListItem, Thumbnail, Title } from 'native-base';
import utils from '../Utils/utils';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, 'props from pick MenuItem')
  }

  render() {
    console.log('Nutrition info in MenuItem:', this.props.item);
    const NutritionInfo = JSON.parse(this.props.item.nutritionalInfo);
    return (
      <View style={styles.container}>
        <HeaderAddMeal />
        <ScrollView
          contentContainerStyle={styles.conatiner}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          <List>
            <Title>{this.props.item.restaurantName}</Title>
            <Title>{this.props.item.name}</Title>
            {Object.keys(NutritionInfo).map((key) => (
              <ListItem key={key} >
                  <Text>{key}: {NutritionInfo[key]}</Text>
              </ListItem>
            ))}
          </List> 
        </ScrollView>
      </View>
    );
  }
}

export default MenuItem;

/************************ STYLES *************************/

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'stretch',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 60,
  },
  icon: {
    position: 'absolute',
    top: 100,
    right: 25
  }
});