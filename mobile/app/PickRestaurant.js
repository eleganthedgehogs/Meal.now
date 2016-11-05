import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import HeaderAddMeal from './HeaderAddMeal';
import { Container, Content, List, ListItem, Thumbnail } from 'native-base';
import utils from '../Utils/utils';
import PickMenuItem from './PickMenuItem';




const gotoNext = (navigator, menu, date, token) => {
  navigator.replace({
    component: PickMenuItem,
    passProps: { menu, date, token }
  });
}

class PickRestaurant extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, 'props from pick PickRestaurant')
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderAddMeal />
        <ScrollView
          contentContainerStyle={styles.conatiner}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          <List>
            {this.props.restaurants.map( (name, i) => (
                <ListItem key={i} onPress={() => utils.getRestaurantMenu(name, this.props.date, this.props.token)
                  .then((menu) => {
                    console.log('Menu data from PickRestaurant:', menu)
                    gotoNext(this.props.navigator, menu, this.props.date, this.props.token);
                  })}>
                    <Text style={styles.text}>{name}</Text>
                </ListItem>  
            ))}
          </List> 
        </ScrollView>
        
      </View>
    );
  }
}

export default PickRestaurant;

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
  },
  text: {
    paddingTop: 5,
    paddingBottom: 5
  }
});