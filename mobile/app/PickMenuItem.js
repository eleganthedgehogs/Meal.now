import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import HeaderAddMeal from './HeaderAddMeal';
import { Container, Content, List, ListItem, Thumbnail } from 'native-base';
import utils from '../Utils/utils';
import MenuItem from './MenuItem';


const gotoNext = (navigator, item) => {
  navigator.replace({
    component: MenuItem,
    passProps: { item }
  });
}

class PickMenuItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, 'props from pick PickMenuItem')
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
            {this.props.menu.map( (menuItem, i) => (
                <ListItem key={i} onPress={() => utils.getMenuItem(menuItem, this.props.date, this.props.token)
                  .then((menuItem) => gotoNext(this.props.navigator, menuItem))
                }>
                    <Text>{menuItem.name}</Text>
                </ListItem>  
            ))}
          </List> 
        </ScrollView>
        
      </View>
    );
  }
}

export default PickMenuItem;

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
