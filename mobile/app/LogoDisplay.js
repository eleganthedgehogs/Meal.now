import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Font } from 'exponent';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logo: {
    width,
    height: 44,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  headline: {
    ...Font.style('ralewayFont'),
    fontSize: 30,
    marginTop: 2,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black'
  },
});

class LogoDisplay extends Component {
  constructor() {
    super()
    this.state = {
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'ralewayFont': require('../assets/fonts/Raleway-Regular.ttf'),
    });
      this.setState({ fontLoaded: true });
  }

  // async componentWillUnmount() {
  // }

  render() {
    console.log('Rendering inside LogoDisplay')
    return (
      <View style={styles.logo}>
        {this.state.fontLoaded ? (
            <Text style={styles.headline}>
              Meal.next
            </Text>) : null
        }
      </View>
    )
  }
}

export default LogoDisplay;
