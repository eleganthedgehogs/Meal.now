import React from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { Ionicons, Foundation, Entypo } from '@exponent/vector-icons';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: width * 0.9,    
  },
  textInput: {
    height: 40, 
    width: width * 0.91,
    backgroundColor: 'rgba(192,192,192,.15)',
    borderRadius: 18,
    textAlign: 'center'
  },
  icon: {
    borderRadius: 110,
    color: "dodgerblue",
    alignSelf: 'flex-start',
    marginTop: 3,
    marginLeft: 5
  }
});

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
          // value={this.state.text}
          onSubmitEditing={() => this.props.enter(this.state.text)}
        >
        <Entypo name="magnifying-glass" size={32} style={styles.icon} />
        </TextInput>
      </View>
    );
  }
}
