import React from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { Ionicons, Foundation, Entypo } from '@exponent/vector-icons';
import SearchIcon from './SearchIcon';



export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ text })}
          placeholder="Find your next meal"
          onSubmitEditing={() => this.props.enter(this.state.text)}
        >
        </TextInput>
      </View>
    );
  }
}

/************************ STYLES *************************/

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,    
  },
  textInput: {
    height: 40, 
    width: width * 0.91,
    backgroundColor: 'rgba(192,192,192,.15)',
    borderRadius: 18,
  },
  icon: {
    position: 'absolute',
    top: 100,
    right: 25
  }
});