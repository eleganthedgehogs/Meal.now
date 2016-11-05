import React, { Component } from 'react';
import Header from './Header';
import { StyleSheet, View, ScrollView, Text} from 'react-native';
import PhotoListItem from './PhotoListItem';
import utils from '../Utils/utils';
import { Container, Content } from 'native-base';

class PhotoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photos: []
		}
	}

	componentWillMount() {
		const token = this.props.getToken();
		utils.getPhotoList(token).then(photos => this.setState({ photos }));
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title={'Meal.Now'}/>

				<ScrollView
				  contentContainerStyle={styles.scroll}
				  showsVerticalScrollIndicator={false}
				  alwaysBounceVertical
				>
				  {this.state.photos.map((photo, i) => (
				  	<PhotoListItem key={i} photo={photo} />
				  ))}
				</ScrollView>
			</View>
		)
	}
}
      
export default PhotoList;

/************************ STYLES *************************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  scroll: {
    alignItems: 'stretch',
  },
});
