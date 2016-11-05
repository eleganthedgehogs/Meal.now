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

const RestaurantList = [
  'Subway',
  'Burger King',
  'Jack in the Box',
  'The Old Siam Thai Restaurant'
]

const promises = RestaurantList.map((restName) => getRestaurantLogo(restName));

const TestPictureData = [
  'https://tse3.mm.bing.net/th?id=OIP.Ma29001df5949d5b9c6000c4286075b97o0&pid=Api',
  'http://logos-download.com/wp-content/uploads/2016/03/McDonalds_logo_red_America_USA.png',
  'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Burger_King_Logo.svg/1024px-Burger_King_Logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Jack_in_the_Box_2009_logo.svg/1071px-Jack_in_the_Box_2009_logo.svg.png',
  'http://logodatabases.com/wp-content/uploads/2012/01/taco-bell-logo.jpg',
  'http://cdn-3.famouslogos.us/images/subway-logo.jpg',
  'http://cdn-3.famouslogos.us/images/subway-logo.jpg',
  'http://vipsavings.com/media/merchant/logo/carls-jr-tmj7iz.png'
]

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
