import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import LogoTile from './LogoTile';
import Header from './Header';
import ActionButton from './ActionButton'
import IP from '../Utils/IP';
import InfoDisplay from './InfoDisplay';
import TempActionButton from './TempActionButton';
import Promises from 'bluebird';

const getRestaurantLogo = (restaurantName) => {
  var queryName = restaurantName.replace(/ /g,'+');

  return new Promise((resolve, reject) => {
    return fetch(`https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${queryName}+logo&count=1`,
      {
        method: 'GET',
        json: true,
        data: '{body}',
        headers: {
          "Ocp-Apim-Subscription-Key": 'b7823ac99e4c445ba331990a74e5af81'
        },
    })
  .then((response) => response.json())
  .then(responseJSON => {
      console.log('responseJSON:', responseJSON);
      resolve(responseJSON);
    })
    .catch(err => console.log('Error from Bing API', err));
  })
}

const promises = RestaurantList.map((restName) => getRestaurantLogo(restName));


class PostPictureView extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      logoURLs: []
    }
  }

  componentWillMount() {
    Promise.all(promises).then((data) => {
      console.log('Promised data:', data)
      this.setState({logoURLs: data})
    })
  }

  render() {
    return (
      <View>
        <Header />
        <ScrollView
          contentContainerStyle={styles.conatiner}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >          
        {this.state.logoURLs.map((object, idx) => {
          console.log('Mapped obj:', object.value[0].contentUrl)
            return <LogoTile
              key={idx}
              image={object.value[0].contentUrl}
            />
          })}
        </ScrollView>
      </View>
    );
  }
};

export default PostPictureView

/************************ STYLES *************************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white'
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});
