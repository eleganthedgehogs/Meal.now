import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from './Header';
import { Container, Content, List, ListItem, Thumbnail } from 'native-base';
import utils from '../Utils/utils';
import PickMenuItem from './PickMenuItem';
import LogoTile from './LogoTile';
import Promises from 'bluebird';


const gotoNext = (navigator, menu, date, token) => {
  navigator.replace({
    component: PickMenuItem,
    passProps: { menu, date, token },
  });
}

const onRestaurantPick = (props, restaurant) => {
    utils.getRestaurantMenu(restaurant.name, props.date, props.token)

    .then((menu) => {
      console.log('menu')
      gotoNext(props.navigator, menu, props.date, props.token)
    })
}

class PickRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    }
   
  }

  componentWillMount() {
    Promise.all(this.props.restaurants.map(restaurant => utils.getRestaurantLogo(restaurant)))
    .then(logos => {
      let restaurants = logos.map( (logo, index) => { 
        return { logo: logo.value[0].contentUrl, name: this.props.restaurants[index] } 
      });
      this.setState({ restaurants });
    })
  }



  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView
          contentContainerStyle={styles.conatiner}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >

            {this.state.restaurants.map( (restaurant, i) => (
                <LogoTile 
                  image={restaurant ? restaurant.logo : null} 
                  key={i} 
                  restaurant={restaurant} 
                  onRestaurantPick={() => onRestaurantPick(this.props, restaurant)} >
                </LogoTile>  
            ))}
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